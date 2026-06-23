# Despliegue de PetRadar

Esta API NestJS usa PostgreSQL con PostGIS. Para el entregable, la base debe estar en un servicio en linea y la API debe usar una URL publica.

## Variables de entorno

Configura estas variables en el servicio donde despliegues la API:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://usuario:password@host:5432/petradar
DB_SSL=true
DB_SYNCHRONIZE=false
DB_MIGRATIONS_RUN=true
CACHE_TTL=600
```

Notas:

- Usa `DB_SSL=true` si el proveedor de PostgreSQL lo requiere.
- No configures `REDIS_HOST` si no tienes Redis en linea; la API usara cache en memoria.
- Si usas Redis administrado, agrega `REDIS_HOST` y `REDIS_PORT`.

## Base de datos

La migracion inicial crea:

- Extension `postgis`.
- Tabla `lost_pets`.
- Tabla `found_pets`.
- Indices espaciales GiST.

Si el proveedor no permite crear extensiones desde la API, habilita PostGIS manualmente antes del primer despliegue:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

## Opcion A: Render

1. Sube este repositorio a GitHub.
2. Crea una base PostgreSQL en Render.
3. En la consola SQL o con el comando `psql` de Render, ejecuta:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

4. Crea un Web Service desde el repositorio.
5. Usa Docker como runtime.
6. Agrega las variables de entorno de esta guia.
7. Despliega.

## Opcion B: Railway

1. Sube este repositorio a GitHub.
2. En Railway, crea un proyecto nuevo.
3. Agrega una base con la plantilla PostGIS de Railway.
4. Agrega un servicio nuevo desde GitHub y selecciona este repositorio.
5. Railway detectara `railway.json` y usara el `Dockerfile`.
6. En las variables del servicio de la API, configura:

```env
NODE_ENV=production
DATABASE_URL=${{PostGIS.DATABASE_URL}}
DB_SSL=false
DB_SYNCHRONIZE=false
DB_MIGRATIONS_RUN=true
CACHE_TTL=600
```

7. En el servicio de la API, ve a `Settings` -> `Networking` -> `Public Networking` y usa `Generate Domain`.
8. Despliega o redepliega el servicio.

Si el servicio de base de datos no se llama `PostGIS`, ajusta la referencia `DATABASE_URL` con el nombre real que aparece en Railway, por ejemplo:

```env
DATABASE_URL=${{NombreDelServicio.DATABASE_URL}}
```

## Cargar datos de demostracion

Despues de que la API haya arrancado una vez y las migraciones hayan creado las tablas, ejecuta localmente:

```bash
DATABASE_URL="postgresql://usuario:password@host:5432/petradar" DB_SSL=true npm run seed:demo
```

En PowerShell:

```powershell
$env:DATABASE_URL="postgresql://usuario:password@host:5432/petradar"
$env:DB_SSL="true"
npm run seed:demo
```

## Endpoints para probar

Reemplaza `https://TU-API` por la URL real del despliegue:

```text
GET https://TU-API/health
GET https://TU-API/lost-pets
GET https://TU-API/found-pets
```

El endpoint recomendado para el entregable es:

```text
GET https://TU-API/lost-pets
```

Debe devolver registros como `Luna` y `Rocky`, cargados desde la base PostgreSQL/PostGIS en linea.

## Video de entrega

El video de 3 a 5 minutos puede seguir este orden:

1. Mostrar el repositorio en GitHub.
2. Mostrar el servicio de API desplegado y su URL publica.
3. Mostrar la base de datos en linea.
4. Probar `GET /health`.
5. Probar `GET /lost-pets` en navegador o Postman.
6. Explicar brevemente que la API usa `DATABASE_URL`, migraciones y PostgreSQL/PostGIS remoto.
