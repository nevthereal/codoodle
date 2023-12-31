import { sqliteTable, integer, text, blob } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// users and auth
export const usersTable = sqliteTable('users', {
	id: text('id').primaryKey().notNull(),
	username: text('username', { length: 255 }).notNull(),
	email: text('email', { length: 255 }).notNull().unique()
});

export const sessionsTable = sqliteTable('sessions', {
	id: text('id').primaryKey().notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	activeExpires: blob('active_expires', { mode: 'bigint' }).notNull(),
	idleExpires: blob('idle_expires', { mode: 'bigint' }).notNull()
});

export const keysTable = sqliteTable('keys', {
	id: text('id').primaryKey().notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	hashedPassword: text('hashed_password')
});

export const userRelation = relations(usersTable, ({ many }) => ({
	posts: many(postsTable)
}));

// posts
export const postsTable = sqliteTable('posts', {
	id: text('id').primaryKey(),
	authorId: text('author_id'),
	title: text('title', { length: 255 }),
	body: text('body', { length: 255 }),
	likes: integer('likes'),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
});

export const postRelation = relations(postsTable, ({ one }) => ({
	post: one(usersTable, {
		fields: [postsTable.authorId],
		references: [usersTable.id]
	})
}));
