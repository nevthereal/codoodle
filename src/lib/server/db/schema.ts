import { sqliteTable, integer, text, blob } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// users and auth
export const usersTable = sqliteTable('users', {
	id: text('id', { length: 15 }).primaryKey().notNull(),
	username: text('username', { length: 255 }).notNull().unique(),
	email: text('email', { length: 255 }).notNull().unique(),
	admin: integer('admin', { mode: 'boolean' }).default(false)
});

export const sessionsTable = sqliteTable('sessions', {
	id: text('id', { length: 127 }).primaryKey().notNull(),
	userId: text('user_id', { length: 15 })
		.notNull()
		.references(() => usersTable.id),
	activeExpires: blob('active_expires', { mode: 'bigint' }).notNull(),
	idleExpires: blob('idle_expires', { mode: 'bigint' }).notNull()
});

export const keysTable = sqliteTable('keys', {
	id: text('id', { length: 255 }).primaryKey().notNull(),
	userId: text('user_id', { length: 15 })
		.notNull()
		.references(() => usersTable.id),
	hashedPassword: text('hashed_password', { length: 255 }).notNull()
});

export const userRelation = relations(usersTable, ({ many, one }) => ({
	posts: many(postsTable),
	sessions: many(sessionsTable),
	keys: one(keysTable, {
		fields: [usersTable.id],
		references: [keysTable.userId]
	})
}));

export const sessionRelation = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.userId],
		references: [usersTable.id]
	})
}));

export const keyRelation = relations(keysTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [keysTable.userId],
		references: [usersTable.id]
	})
}));

// posts
export const postsTable = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	authorId: text('author_id').notNull(),
	title: text('title', { length: 255 }).notNull(),
	body: text('body', { length: 255 }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull()
});

export const postRelation = relations(postsTable, ({ one }) => ({
	author: one(usersTable, {
		fields: [postsTable.authorId],
		references: [usersTable.id]
	})
}));
