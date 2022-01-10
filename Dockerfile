FROM node:lts-alpine AS build

WORKDIR /app

FROM build AS development

FROM build AS production

COPY dist /app

CMD ["yarn", "start"]
