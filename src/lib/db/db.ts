import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { DB_URL, DB_TOKEN } from '$env/static/private';

export const client = createClient({ url: DB_URL, authToken: DB_TOKEN });

export const db = drizzle(client);
