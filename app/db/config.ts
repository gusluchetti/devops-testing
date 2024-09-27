import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (!process.env.DB_URL)
  throw Error("Could not load BD_URL env var")

// for query purposes
const queryClient = postgres(process.env.DB_URL);
export const db = drizzle(queryClient);

// for migrations
const migrationClient = postgres(process.env.DB_URL, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "../../app/db/migrations" })
