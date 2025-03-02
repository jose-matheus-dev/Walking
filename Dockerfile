FROM node:23.9.0-alpine AS deps

ARG UID
ARG GID

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN if [ "$(id -u node)" != "$UID" ] || [ "$(id -g node)" != "$GID" ]; then \
  deluser node && addgroup -g $GID node && adduser -D -u $UID -G node node; \
  fi && mkdir -p $PNPM_HOME && chown node $PNPM_HOME && corepack enable

USER node

WORKDIR /walking

COPY --chown=node package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY --chown=node app/package.json app/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=$UID,gid=$GID pnpm --filter app fetch 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=$UID,gid=$GID pnpm --filter app i --offline --frozen-lockfile

FROM deps AS dev

COPY --chown=node app app

EXPOSE 5173
