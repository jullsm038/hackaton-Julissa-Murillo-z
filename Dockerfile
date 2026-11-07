# Imagen de la API de notas (arquitectura hexagonal)
FROM docker.io/library/node:22-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Solo copiamos lo necesario para correr la API (no hay dependencias que instalar)
COPY package.json ./
COPY src ./src

# Carpeta para los datos cuando ALMACEN=archivo (se puede montar como volumen)
RUN mkdir /datos && chown node /datos
USER node

ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/main.mjs"]
