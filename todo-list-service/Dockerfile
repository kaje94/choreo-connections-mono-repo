FROM node:22-alpine
RUN npm i pnpm@9.9.0 -g
WORKDIR /app
COPY package.json package-lock.json* ./
COPY . .
RUN pnpm install
RUN npm run build
USER 10014
EXPOSE 8080
CMD ["npm", "start"]