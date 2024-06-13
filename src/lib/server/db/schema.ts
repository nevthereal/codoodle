import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// users and auth
export const usersTable = pgTable('users', {
	id: varchar('id', { length: 15 }).primaryKey().notNull(),
	gitHubId: integer('github_id').notNull().unique(),
	username: varchar('username', { length: 255 }).notNull().unique(),
	admin: boolean('admin').default(false),
	joined: timestamp('joined_at')
});

export const sessionsTable = pgTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	expiresAt: timestamp('expires_at').notNull()
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
export const postsTable = pgTable('posts', {
	id: serial('id').primaryKey(),
	authorId: text('author_id')
		.notNull()
		.references(() => usersTable.id),
	title: varchar('title', { length: 255 }).notNull(),
	body: varchar('body', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull()
});

export const postRelation = relations(postsTable, ({ one }) => ({
	author: one(usersTable, {
		fields: [postsTable.authorId],
		references: [usersTable.id]
	})
}));
