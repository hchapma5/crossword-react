import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

// let db: PostgresJsDatabase<typeof schema>;
// let client: ReturnType<typeof postgres>;

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString!, {
  prepare: false,
});
const db = drizzle(client, { schema, logger: true });

export { db, client };
