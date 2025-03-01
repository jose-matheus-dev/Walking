FROM node:23.9.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN mkdir -p "$PNPM_HOME/store" && chown -R node:node $PNPM_HOME

RUN corepack enable

USER node

WORKDIR /walking

FROM base AS deps

COPY --chown=node package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY --chown=node app app

RUN pnpm --filter app fetch
RUN pnpm --filter app i -r --offline --frozen-lockfile

EXPOSE 5173

CMD ["pnpm", "--filter", "app", "dev"]
