# codoodle

A SvelteKit blog using Drizzle + Turso

## About this repository

This is actually one of my most exciting projects lately. I really want to put my newly gained db and ORM knowledge to the test. This is why I am currently working on this (highly) sophisticated blog using the most bleeding edge technology known to me.

## Tech used:

- SvelteKit
- Tailwind
- Drizzle ORM
- Turso
- Lucia Auth
- zod

## Features

- Auth:
  - Sign in/up/out
  - Delete Account
  - Edit username
- Posts:
  - Markdown support
  - Post deletion
- Admin Page:

## Test this out

1. Clone this repository: `git clone https://github.com/nevthereal/codoodle.git`
2. Install the deps: `npm i`
3. Create a databse with the [Turso CLI](https://docs.turso.tech/reference/turso-cli)
4. Create a `.env` file with the `.env.example` variables
5. Migrate: `npm run migrate`
6. Run `npm run dev`
