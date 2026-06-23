

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
  '{"type":"Point","coordinates":[-99.133200,19.432600]}'::jsonb,
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
  '{"type":"Point","coordinates":[-99.150000,19.420000]}'::jsonb,
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
  '{"type":"Point","coordinates":[-99.133000,19.432700]}'::jsonb,
  'Centro Historico, CDMX',
  NOW() - INTERVAL '4 days',
  false,
  NOW(),
  NOW()
);

SELECT id, name, owner_email, location
FROM lost_pets
WHERE is_active = true
ORDER BY lost_date DESC;
