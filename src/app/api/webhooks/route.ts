import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

function getCurrentPeriodEnd(subscription: Stripe.Subscription): Date | null {
  return subscription.items.data[0].current_period_end
    ? new Date(subscription.items.data[0].current_period_end * 1000)
    : null;
}

function getExpiresAt(subscription: Stripe.Subscription): Date | null {
  return subscription.cancel_at
    ? new Date(subscription.cancel_at * 1000)
    : null;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const subscriptionId = session.subscription as string;

      if (!userId || !subscriptionId) {
        console.error('Webhook Error: Missing userId or subscriptionId in checkout session.');
        break;
      }

      const response = await stripe.subscriptions.retrieve(subscriptionId);
      const subscription = response as Stripe.Subscription;

      await prisma.user.update({
        where: { id: userId },
        data: {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: getCurrentPeriodEnd(subscription),
        },
      });
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId = subscription.customer as string;

      let pendingCancellation = false;

      if (subscription.status === 'active' && subscription.cancel_at_period_end === true) {
        pendingCancellation = true;
      }

      await prisma.user.update({
        where: { stripeCustomerId },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: getCurrentPeriodEnd(subscription),
          stripePendingCancellation: pendingCancellation,
          stripeExpiresAt: getExpiresAt(subscription),
        },
      });
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId = subscription.customer as string;

      // When a subscription is deleted, we nullify the fields to indicate it's no longer active.
      await prisma.user.update({
        where: { stripeCustomerId },
        data: {
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
          stripePendingCancellation: false,
          stripeExpiresAt: null,
        },
      });
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
