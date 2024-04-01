CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`author_id` text NOT NULL,
	`body` text(255) NOT NULL,
	`created_at` integer NOT NULL,
	`postId` integer,
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`author_id` text NOT NULL,
	`title` text(255) NOT NULL,
	`body` text(255) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(15) PRIMARY KEY NOT NULL,
	`github_id` integer NOT NULL,
	`username` text(255) NOT NULL,
	`admin` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);