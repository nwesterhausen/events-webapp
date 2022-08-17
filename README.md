# Events Webapp

An app to help keep track of upcoming events (and band practice sessions).

## Running Production

### Env File Requirements

This app uses a database to keep track of users and event details. You need to provide database details into a `.env` file.

| .env key | description                         |
| -------- | ----------------------------------- |
| DB_CONN  | PSQL connection string for database |

If DB_CONN isn't filled with a pg connection string, the app will use sqlite instead.

### Building

The app needs to be built. Run these commands:

```sh
pnpm install
pnpm build
```

### Running

To run production:

```sh
pnpm start:prod
```
