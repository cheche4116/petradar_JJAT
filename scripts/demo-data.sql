

CREATE EXTENSION IF NOT EXISTS postgis;

TRUNCATE TABLE found_pets RESTART IDENTITY CASCADE;
TRUNCATE TABLE lost_pets RESTART IDENTITY CASCADE;


INSERT INTO lost_pets (
  name,
  species,
  breed,
  color,
  size,
  description,
  photo_url,
  owner_name,
  owner_email,
  owner_phone,
  location,
  address,
  lost_date,
  is_active,
  created_at,
  updated_at
)
VALUES (
  'Luna',
  'gato',
  'mestizo',
  'negro',
  'pequeno',
  'Collar rojo y mancha blanca en el pecho',
  'https://example.com/luna.jpg',
  'Ana Lopez',
  'ana@example.com',
  '555-123-4567',
  ST_SetSRID(ST_MakePoint(-99.133200, 19.432600), 4326),
  'Centro, CDMX',
  NOW() - INTERVAL '2 days',
  true,
  NOW(),
  NOW()
);


INSERT INTO lost_pets (
  name,
  species,
  breed,
  color,
  size,
  description,
  photo_url,
  owner_name,
  owner_email,
  owner_phone,
  location,
  address,
  lost_date,
  is_active,
  created_at,
  updated_at
)
VALUES (
  'Rocky',
  'perro',
  'labrador',
  'cafe',
  'grande',
  'Responde a silbidos',
  'https://example.com/rocky.jpg',
  'Luis Perez',
  'luis@example.com',
  '555-222-3344',
  ST_SetSRID(ST_MakePoint(-99.150000, 19.420000), 4326),
  'Roma Sur, CDMX',
  NOW() - INTERVAL '1 day',
  true,
  NOW(),
  NOW()
);

INSERT INTO lost_pets (
  name,
  species,
  breed,
  color,
  size,
  description,
  photo_url,
  owner_name,
  owner_email,
  owner_phone,
  location,
  address,
  lost_date,
  is_active,
  created_at,
  updated_at
)
VALUES (
  'Nina',
  'gato',
  'siames',
  'beige',
  'pequeno',
  'Ya fue recuperada',
  'https://example.com/nina.jpg',
  'Maria Diaz',
  'maria@example.com',
  '555-998-7766',
  ST_SetSRID(ST_MakePoint(-99.133000, 19.432700), 4326),
  'Centro Historico, CDMX',
  NOW() - INTERVAL '4 days',
  false,
  NOW(),
  NOW()
);

SELECT
  lp.id,
  lp.name,
  lp.owner_email,
  ST_Distance(
    lp.location::geography,
    ST_SetSRID(ST_MakePoint(-99.132900, 19.433100), 4326)::geography
  ) AS distance_meters
FROM lost_pets lp
WHERE lp.is_active = true
  AND ST_DWithin(
    lp.location::geography,
    ST_SetSRID(ST_MakePoint(-99.132900, 19.433100), 4326)::geography,
    500
  )
ORDER BY distance_meters ASC;
