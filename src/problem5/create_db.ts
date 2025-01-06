import "dotenv/config";

import { Client } from "pg";

export const dbName = process.env.DB_NAME;

export const client = new Client({
  database: "postgres",
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
});

client.connect();

(async function () {
  const table_query = await client.query(
    `SELECT 1 FROM pg_database WHERE datname='${dbName}'`
  );
  if (!table_query.rowCount) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    console.info(`CREATED DB ${dbName}`);
  }
})()
  .then(() => {
    console.log("ok");
    client.end();
    process.exit(0);
  })
  .catch((ex) => {
    console.log(ex);
    client.end();
    process.exit(0);
  });
