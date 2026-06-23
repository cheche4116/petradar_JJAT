const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is required to seed the remote database.');
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function main() {
  const sqlPath = path.join(__dirname, 'demo-data.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  await client.connect();
  await client.query(sql);
  await client.end();

  console.log('Demo data loaded successfully.');
}

main().catch(async (error) => {
  console.error(error.message);
  await client.end().catch(() => undefined);
  process.exit(1);
});
