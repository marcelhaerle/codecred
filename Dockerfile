# This Dockerfile is optimized for production and uses a multi-stage build
# to create a small and secure final image for your Next.js application.
# It leverages Next.js's standalone output feature.

# ---------------------------------
# Stage 1: Base Image
# ---------------------------------
# Use the official Node.js 18 Alpine image as a lean base.
# 'AS base' names this stage so we can refer to it later.
FROM node:18-alpine AS base

# ---------------------------------
# Stage 2: Dependency Installation
# ---------------------------------
# This stage is dedicated to installing dependencies. It's a separate stage
# to leverage Docker's layer caching. This layer will only be rebuilt when
# your package.json or lock file changes.
FROM base AS deps
WORKDIR /app

# Copy package.json and the lock file.
COPY package.json package-lock.json* ./

# Install dependencies. Using --frozen-lockfile ensures that the exact
# versions from your lock file are installed, which is crucial for
# reproducible builds.
RUN npm install --frozen-lockfile

# ---------------------------------
# Stage 3: Builder
# ---------------------------------
# This stage builds the application. It copies the dependencies from the 'deps'
# stage and the source code, then runs the production build.
FROM base AS builder
WORKDIR /app

# Copy dependencies from the 'deps' stage.
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application source code.
COPY . .

# Run the Next.js build command. This will generate the optimized
# production build in the .next directory.
RUN npm run build

# ---------------------------------
# Stage 4: Runner (Final Production Image)
# ---------------------------------
# This is the final stage that will be used to run the application.
# It starts from the lean 'base' image again to keep the size down.
FROM base AS runner
WORKDIR /app

# Set the environment to production.
ENV NODE_ENV=production

# Create a non-root user for security best practices.
# This user will own the application files and run the process.
RUN addgroup -S -g 1001 nodejs
RUN adduser -S -u 1001 nextjs

# Copy the standalone output from the 'builder' stage.
# The 'standalone' output includes only the necessary files to run the app,
# including a minimal server.js and a pruned node_modules directory.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to the non-root user we created.
USER nextjs

# Expose the port the app will run on.
EXPOSE 3000

# Set the port environment variable.
ENV PORT 3000

# The command to start the application.
# This runs the minimal server included in the standalone output.
CMD ["node", "server.js"]

