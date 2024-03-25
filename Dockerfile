# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.0.30
ARG NODE_VERSION=20.11.1
FROM mcr.microsoft.com/playwright:v1.42.1-jammy as base

# Nuxt app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

RUN apt-get install nodejs
RUN npm i -g n
RUN n 20
RUN npm i -g node-gyp


# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3 unzip

RUN curl https://bun.sh/install | bash -s -- bun-v1.0.30

ENV PATH="${PATH}:/root/.bun/bin"

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install

# Copy application code
COPY --link . .

# Build application
RUN bun --bun run build

# Remove development dependencies
RUN rm -rf node_modules && \
    bun install --ci

# Final stage for app image
FROM base

ENV PATH="${PATH}:/root/.bun/bin"
# Copy built application
COPY --from=build /app /app
COPY --from=build /root/.bun /root/.bun

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
# ENV HOST=0
CMD [ "bun", ".output/server/index.mjs" ]
