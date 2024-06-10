# codoodle

A SvelteKit social texting using Drizzle + Turso

## About this repository

This is actually one of my most exciting projects lately. I really want to put my newly gained db and ORM knowledge to the test. This is why I am currently working on this (highly) sophisticated social media kinda app using the most bleeding edge technology known to me.

## Tech used:

- SvelteKit
- Tailwind
- Skeleton UI
- Drizzle ORM
- Turso
- dayjs
- SvelteKit-Superforms
- Lucia Auth
- zod

## Features

- Auth:
  - Sign in/out with GitHub
  - Delete Account
  - Edit username
- Posts:
  - Create posts
  - Markdown support
  - Post deletion
- Admin Page:
  - Inspect users and posts. delete both of them
  - User page

## Test this out

1. Clone this repository: `git clone https://github.com/nevthereal/codoodle.git`
2. Install the deps: `bun i`
3. Create a databse with the [Turso CLI](https://docs.turso.tech/reference/turso-cli)
4. Create a `.env` file with the `.env.example` variables
5. Pusg the db schema: `bun run migrate`
6. Run `bun run dev`
