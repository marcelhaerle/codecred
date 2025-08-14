import { PrismaClient } from '@/generated/prisma';
import { env } from '@/lib/env';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
