import "dotenv/config";

import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

let db: PostgresJsDatabase<typeof schema>;
let client: ReturnType<typeof postgres>;

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
client = postgres(connectionString, {
  prepare: false,
  max: 4,
  idle_timeout: 20,
  connect_timeout: 10,
});
db = drizzle(client, { schema, logger: true });

export { db, client };
