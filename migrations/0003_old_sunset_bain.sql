DROP TABLE `keys`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_email_unique`;--> statement-breakpoint
ALTER TABLE sessions ADD `expires_at` blob NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `active_expires`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `idle_expires`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `email`;