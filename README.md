# PetRadar API - Entrega de Despliegue

## 1. Proyecto Desplegado en Internet

<u>La API de PetRadar fue desplegada en Railway y esta disponible publicamente en internet.</u>

URL publica de la API:

```text
https://petradarjjat-production.up.railway.app
```

Endpoint de prueba:

```text
https://petradarjjat-production.up.railway.app/health
```

Resultado esperado:

```json
{
  "status": "ok",
  "timestamp": "fecha-generada-por-el-servidor"
}
```

---

## 2. Base de Datos en Linea

<u>La base de datos no esta en mi computadora.</u>

<u>La base de datos esta alojada en Railway usando PostgreSQL.</u>

Servicio usado:

```text
Postgres en Railway
```

La API se conecta a PostgreSQL mediante la variable de entorno:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

Esto permite que la API funcione aunque mi equipo este apagado.

---

## 3. Endpoint de Lectura con Datos Reales

<u>Este endpoint consulta datos reales guardados en la base de datos en linea.</u>

Endpoint:

```text
GET https://petradarjjat-production.up.railway.app/lost-pets
```

Datos que devuelve:

```text
Rocky
Luna
```

Ejemplo de respuesta:

```json
[
  {
    "id": 2,
    "name": "Rocky",
    "species": "perro",
    "breed": "labrador",
    "address": "Roma Sur, CDMX",
    "is_active": true
  },
  {
    "id": 1,
    "name": "Luna",
    "species": "gato",
    "breed": "mestizo",
    "address": "Centro, CDMX",
    "is_active": true
  }
]
```

---

## 4. Servicios en Railway

En Railway se configuraron dos servicios:

```text
petradar_JJAT  -> API NestJS
Postgres       -> Base de datos PostgreSQL
```

<u>La API y la base de datos estan alojadas en linea.</u>

<u>No se usa localhost para el despliegue.</u>

---

## 5. Variables de Entorno del Despliegue

Variables principales configuradas en Railway:

```env
NODE_ENV=production
PORT=8080
DATABASE_URL=${{Postgres.DATABASE_URL}}
DB_SSL=false
DB_SYNCHRONIZE=false
DB_MIGRATIONS_RUN=true
CACHE_TTL=600
```

Estas variables permiten:

- Ejecutar la API en modo produccion.
- Usar el puerto requerido por Railway.
- Conectar la API con PostgreSQL en linea.
- Ejecutar migraciones para crear las tablas.

---

## 6. Tecnologias Utilizadas

```text
NestJS
TypeScript
TypeORM
PostgreSQL
Docker
Railway
GitHub
```

---

## 7. Proceso de Despliegue

1. El proyecto se subio a GitHub.
2. Railway se conecto al repositorio.
3. Railway construyo la API usando Docker.
4. Se creo una base de datos PostgreSQL en Railway.
5. Se configuraron las variables de entorno.
6. Se genero un dominio publico para la API.
7. Se cargaron datos de demostracion en la base de datos.
8. Se probo el endpoint publico `/lost-pets`.

---

## 8. Repositorio de GitHub

Repositorio:

```text
https://github.com/cheche4116/petradar_JJAT
```

---

## 9. Evidencia Para Mostrar en Video

### Mostrar Railway

Se deben ver dos servicios:

```text
petradar_JJAT
Postgres
```

### Mostrar Health Check

Abrir:

```text
https://petradarjjat-production.up.railway.app/health
```

Debe responder:

```text
status: ok
```

### Mostrar Datos Reales

Abrir:

```text
https://petradarjjat-production.up.railway.app/lost-pets
```

Debe mostrar registros como:

```text
Rocky
Luna
```

---

## 10. Conclusiones

<u>La API esta publicada en internet.</u>

<u>La base de datos esta publicada en internet.</u>

<u>El endpoint `/lost-pets` devuelve datos reales desde PostgreSQL en Railway.</u>

<u>El proyecto cumple con el requisito de no depender del equipo local del alumno.</u>

