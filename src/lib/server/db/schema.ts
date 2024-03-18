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
	expiresAt: blob('expires_at', { mode: 'bigint' }).notNull()
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
	authorId: text('author_id').notNull(),
	title: text('title', { length: 255 }).notNull(),
	body: text('body', { length: 255 }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull()
});

export const postRelation = relations(postsTable, ({ one, many }) => ({
	author: one(usersTable, {
		fields: [postsTable.authorId],
		references: [usersTable.id]
	}),
	comments: many(commentsTable)
}));

export const commentsTable = sqliteTable('comments', {
	id: integer('id').primaryKey(),
	authorId: text('author_id').notNull(),
	content: text('body', { length: 255 }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	postId: integer('postId').references(() => postsTable.id)
});

export const commentRelation = relations(commentsTable, ({ one }) => ({
	post: one(postsTable, {
		fields: [commentsTable.postId],
		references: [postsTable.id]
	}),
	author: one(usersTable, {
		fields: [commentsTable.authorId],
		references: [usersTable.id]
	})
}));
