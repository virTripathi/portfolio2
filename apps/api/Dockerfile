# Simple monorepo-aware build for the NestJS API.
FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -w @portfolio/api

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/package-lock.json* ./
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/apps/api/dist ./apps/api/dist
RUN npm install --omit=dev -w @portfolio/api
EXPOSE 4000
CMD ["node", "apps/api/dist/main.js"]
