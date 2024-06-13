import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './migrations',
	dbCredentials: {
		url: process.env.DB_URL!
	},
	dialect: 'postgresql'
} satisfies Config;
