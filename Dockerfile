# ========================================
# 📝 Dockerfile para ToDo List Knockout.js
# Servidor web simples para arquivos estáticos
# ========================================

# Usar imagem base do Node.js Alpine (leve e segura)
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Instalar servidor HTTP simples
RUN npm install -g http-server

# Copiar arquivos da aplicação
COPY index.html .
COPY app.js .
COPY style.css .

# Expor porta 8080
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["http-server", "-p", "8080", "-a", "0.0.0.0", "--cors", "-c-1"]

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