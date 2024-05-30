import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// users and auth
export const usersTable = sqliteTable('users', {
	id: text('id', { length: 15 }).primaryKey().notNull(),
	gitHubId: integer('github_id').notNull().unique(),
	username: text('username', { length: 255 }).notNull().unique(),
	admin: integer('admin', { mode: 'boolean' }).default(false),
	joined: integer('joined_at', { mode: 'timestamp' })
});

export const sessionsTable = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const userRelation = relations(usersTable, ({ many }) => ({
	posts: many(postsTable),
	sessions: many(sessionsTable)
}));

export const sessionRelation = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.userId],
		references: [usersTable.id]
	})
}));

// posts
export const postsTable = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	authorId: text('author_id')
		.notNull()
		.references(() => usersTable.id),
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
