# [---- Base image ----]
# Set the version of node used as a base template
FROM node:18-alpine AS base
LABEL maintainer="Ignacio Gómez <jgnaciogomez@gmail.com>"
LABEL build_date="25-05-2023"
LABEL description="\
Dockerfile to containerize nextjs applications \
in production environments."
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
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules/
COPY --chown=node:node . .

# Install pm2 globaly (production process manager for node.js)
RUN npm install pm2@latest -g

# Migrate from database to prisma
RUN npx prisma generate \
    npx prisma migrate deploy

# Sets the user to "node", which is a non-root user for better security.
USER node
EXPOSE 3005

CMD ["node", "server.js"]
