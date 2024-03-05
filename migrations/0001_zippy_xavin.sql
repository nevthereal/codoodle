CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`author_id` text NOT NULL,
	`body` text(255) NOT NULL,
	`createed_at` integer NOT NULL,
	`postId` integer,
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
