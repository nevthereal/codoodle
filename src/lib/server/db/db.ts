import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '$lib/server/db/schema';
import { DB_TOKEN, DB_URL } from '$env/static/private';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

export const client = createClient({ url: DB_URL, authToken: DB_TOKEN });

export const db = drizzle(client, { schema });

export const adapter = new DrizzleSQLiteAdapter(db, schema.sessionsTable, schema.usersTable);
