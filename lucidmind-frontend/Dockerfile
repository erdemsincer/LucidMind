# 1. Base image
FROM node:18-alpine AS build

# 2. Çalışma dizini
WORKDIR /app

# 3. Bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# 4. Projeyi kopyala ve build et
COPY . .
RUN npm run build

# 5. Static server (vite preview yerine nginx)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# 6. Port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
