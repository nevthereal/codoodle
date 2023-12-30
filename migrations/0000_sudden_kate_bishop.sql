CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`authrId` integer,
	`title` text(255),
	`body` text(255),
	`likes` integer,
	`createdAt` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`password` text(255) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);