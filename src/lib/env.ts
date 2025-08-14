import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.url(),
  GITHUB_ID: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  GITHUB_PAT: z.string(),
  CRON_SECRET: z.string().min(1),
  SUBCRIPTION_SERVICE_URL: z.url(),
  SUBSCRIPTION_SERVICE_API_KEY: z.string().min(1),
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
