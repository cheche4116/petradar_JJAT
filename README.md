# PetRadar API

API desarrollada con NestJS para registrar mascotas perdidas y encontradas. El proyecto fue desplegado en Railway junto con una base de datos PostgreSQL en linea, por lo que no depende de una base local ni de una API ejecutandose en el equipo del alumno.

## URL publica

API desplegada:

```text
https://petradarjjat-production.up.railway.app
```

Endpoint de verificacion:

```text
https://petradarjjat-production.up.railway.app/health
```

Endpoint de lectura con datos reales:

```text
https://petradarjjat-production.up.railway.app/lost-pets
```

Este endpoint devuelve registros almacenados en la base de datos PostgreSQL alojada en Railway, por ejemplo mascotas como `Luna` y `Rocky`.

## Repositorio

```text
https://github.com/cheche4116/petradar_JJAT
```

## Tecnologias utilizadas

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker
- Railway

## Base de datos en linea

La base de datos esta alojada en Railway usando el servicio PostgreSQL del mismo proyecto.

La API se conecta a la base mediante la variable de entorno:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

Las tablas principales son:

- `lost_pets`: mascotas reportadas como perdidas.
- `found_pets`: mascotas reportadas como encontradas.

La ubicacion de cada mascota se guarda en la columna `location` como JSON con este formato:

```json
{
  "type": "Point",
  "coordinates": [-99.1332, 19.4326]
}
```

## Variables de entorno usadas en Railway

```env
NODE_ENV=production
PORT=8080
DATABASE_URL=${{Postgres.DATABASE_URL}}
DB_SSL=false
DB_SYNCHRONIZE=false
DB_MIGRATIONS_RUN=true
CACHE_TTL=600
```

## Proceso de despliegue

1. Se subio el proyecto al repositorio de GitHub.
2. En Railway se creo un nuevo proyecto.
3. Se agrego un servicio PostgreSQL para alojar la base de datos en linea.
4. Se agrego un servicio para la API conectandolo con el repositorio de GitHub.
5. Railway construyo la API usando el `Dockerfile` del proyecto.
6. Se configuraron las variables de entorno necesarias para conectar la API con PostgreSQL.
7. Se genero un dominio publico para acceder a la API desde internet.
8. Se cargaron datos de demostracion en la base de datos usando el script:

```bash
npm run seed:demo
```

## Endpoints principales

### Health check

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "timestamp": "2026-06-23T03:00:00.000Z"
}
```

### Mascotas perdidas

```http
GET /lost-pets
```

Devuelve mascotas activas registradas en la base de datos en linea.

Ejemplo de respuesta:

```json
[
  {
    "id": 2,
    "name": "Rocky",
    "species": "perro",
    "breed": "labrador",
    "color": "cafe",
    "size": "grande",
    "description": "Responde a silbidos",
    "address": "Roma Sur, CDMX",
    "is_active": true
  },
  {
    "id": 1,
    "name": "Luna",
    "species": "gato",
    "breed": "mestizo",
    "color": "negro",
    "size": "pequeno",
    "description": "Collar rojo y mancha blanca en el pecho",
    "address": "Centro, CDMX",
    "is_active": true
  }
]
```

### Mascotas encontradas

```http
GET /found-pets
```

Devuelve los reportes de mascotas encontradas almacenados en la base de datos.

## Guion sugerido para el video

1. Mostrar el repositorio de GitHub:

```text
https://github.com/cheche4116/petradar_JJAT
```

2. Mostrar Railway con dos servicios:

- `petradar_JJAT`: API desplegada.
- `Postgres`: base de datos en linea.

3. Explicar que la API usa `DATABASE_URL` para conectarse a la base de datos alojada en Railway.

4. Abrir el endpoint de salud:

```text
https://petradarjjat-production.up.railway.app/health
```

5. Abrir el endpoint de lectura:

```text
https://petradarjjat-production.up.railway.app/lost-pets
```

6. Mencionar que los datos mostrados vienen de PostgreSQL en Railway y no de una base local.

## Estado del despliegue

La API esta disponible publicamente y el endpoint `/lost-pets` devuelve datos reales desde la base de datos en linea.

