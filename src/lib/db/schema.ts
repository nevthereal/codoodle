import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const usersTable = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text('username', { length: 255 }).notNull(),
	email: text('email', { length: 255 }).notNull().unique(),
	password: text('password', { length: 255 }).notNull()
});

export const userRelation = relations(usersTable, ({ many }) => ({
	posts: many(postsTable)
}));

export const postsTable = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	authrId: integer('authrId'),
	title: text('title', { length: 255 }),
	body: text('body', { length: 255 }),
	likes: integer('likes'),
	createdAt: integer('createdAt', { mode: 'timestamp' })
});

export const postRelation = relations(postsTable, ({ one }) => ({
	post: one(usersTable, {
		fields: [postsTable.authrId],
		references: [usersTable.id]
	})
}));
