import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.url(),
  GITHUB_ID: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  GITHUB_PAT: z.string(),
  CRON_SECRET: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PRICE_ID_STARTER: z.string().min(1),
  STRIPE_PRICE_ID_PRO: z.string().min(1),
  STRIPE_CANCEL_URL: z.url(),
  STRIPE_SUCCESS_URL: z.url(),
});

// Validate the environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors,
  );
  throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;
