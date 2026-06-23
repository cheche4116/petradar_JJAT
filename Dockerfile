# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar la aplicación compilada desde el stage builder
COPY --from=builder /app/dist ./dist

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

# Exponer el puerto 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "const port=process.env.PORT||3000; require('http').get(`http://localhost:${port}/health`, (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Usar dumb-init para ejecutar el proceso
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]
