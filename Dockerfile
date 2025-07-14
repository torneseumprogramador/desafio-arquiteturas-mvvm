# ========================================
# 📝 Dockerfile para ToDo List Knockout.js
# Servidor web simples para arquivos estáticos
# ========================================

# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json vite.config.js ./
COPY src ./src
COPY app.js ./
COPY index.html ./

RUN npm install
RUN npm run build

# Etapa 2: Servir arquivos estáticos
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ========================================
# INSTRUÇÕES DE USO:
# 
# 1. Construir a imagem:
#    docker build -t knockout-mvvm-todo .
#
# 2. Executar o container:
#    docker run -p 8080:8080 knockout-mvvm-todo
#
# 3. Acessar a aplicação:
#    http://localhost:8080
# ======================================== 