import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { env } from '@/lib/env';
import { SUBSCRIPTION_PLAN, SubscriptionStatus } from '../types';

const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

export const subscriptionService = {
  getPriceIdForPlan: (plan: SUBSCRIPTION_PLAN): string => {
    if (plan === SUBSCRIPTION_PLAN.STARTER) {
      return env.STRIPE_PRICE_ID_STARTER;
    } else if (plan === SUBSCRIPTION_PLAN.PRO) {
      return env.STRIPE_PRICE_ID_PRO;
    } else {
      throw new Error("Invalid plan specified");
    }
  },

  getPlanForPriceId: (priceId: string): SUBSCRIPTION_PLAN => {
    if (priceId === env.STRIPE_PRICE_ID_STARTER) {
      return SUBSCRIPTION_PLAN.STARTER;
    } else if (priceId === env.STRIPE_PRICE_ID_PRO) {
      return SUBSCRIPTION_PLAN.PRO;
    } else {
      throw new Error("Invalid price ID specified");
    }
  },

  createCheckoutSession: async (userId: string, plan: SUBSCRIPTION_PLAN): Promise<string> => {
    try {
      let user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email!,
          metadata: { userId }
        });

        user = await prisma.user.update({
          where: { id: userId },
          data: {
            id: userId,
            stripeCustomerId: customer.id,
          },
        });
      }

      const priceId = subscriptionService.getPriceIdForPlan(plan);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: 'subscription',
        customer: user.stripeCustomerId!,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: env.STRIPE_SUCCESS_URL,
        cancel_url: env.STRIPE_CANCEL_URL,
        metadata: {
          userId,
        },
      });

      if (!session.url) {
        throw new Error("Failed to create checkout session");
      }

      return session.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Internal Server Error');
    }
  },

  createCustomerPortalSession: async (userId: string): Promise<string> => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || !user.stripeCustomerId) {
        throw new Error('User has no subscription');
      }

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: process.env.STRIPE_SUCCESS_URL!,
      });

      return portalSession.url;

    } catch (error) {
      console.error('Stripe Portal Error:', error);
      throw new Error('Internal Server Error');
    }
  },

  cancelSubscription: async (userId: string): Promise<void> => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || !user.stripeSubscriptionId) {
        throw new Error("No active subscription found for this user");
      }

      const canceledSubscription = await stripe.subscriptions.update(
        user.stripeSubscriptionId,
        {
          cancel_at_period_end: true,
        }
      );

      const expirationDate = new Date(canceledSubscription.cancel_at! * 1000);

      await prisma.user.update({
        where: { id: userId },
        data: {
          stripePendingCancellation: true,
          stripeExpiresAt: expirationDate,
        },
      });
    } catch (error) {
      console.error('[SUBSCRIPTION_CANCEL_ERROR]', error);
      throw new Error('Internal Server Error');
    }
  },

  getStatus: async (userId: string): Promise<SubscriptionStatus> => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.stripeSubscriptionId) {
      return {
        plan: SUBSCRIPTION_PLAN.NONE,
      };
    }

    const plan = subscriptionService.getPlanForPriceId(user.stripePriceId!);

    return {
      plan,
      currentPeriodEnd: user.stripeCurrentPeriodEnd || undefined,
      pendingCancellation: user.stripePendingCancellation || undefined,
      expiresAt: user.stripeExpiresAt || undefined,
    };
  }
};
