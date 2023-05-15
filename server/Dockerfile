# Author: jgnacio
# This dockerfile is for test a production
# enviroment to containerize nodejs web aplications.
# created: 06-05-2023
# last update: 12-05-2023

# [---- Base image ----]
# Set the version of node used as a base template
FROM node:18-alpine AS base
# --------------------------------------------------

# [---- Dependencies image ----]
FROM base AS deps
WORKDIR /usr/src/app
# Install dependencies if a package-lock.json found
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci --only=production; \
  else echo "Lockfile not found." && exit 1; \
  fi
# --------------------------------------------------

# [---- The production image ----]
FROM base AS runner
# Optimize for production.
ENV NODE_ENV production
WORKDIR /usr/src/app
# Copy from build image the node_modules folder with all dependencies.
COPY --chown=node:node --from=deps /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
# Setup prisma schema
RUN npx prisma generate
# Sets the user to "node", which is a non-root user for better security.
USER node

EXPOSE 3005
CMD ["node", "server.js"]
