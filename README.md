# randvin

A simple Express and AngularJS app for generating random VINs and copying them to your clipboard.

## Requirements

- Node.js 18 or newer (uses the built-in `fetch`)

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

The server listens on `PORT` (default `3000`); the UI is served at `http://localhost:3000/`.

## API

- `GET /` — home page
- `GET /vin` — returns a random VIN as JSON, e.g. `{ "vin": "1HGCM82633A004352" }`
  - `502` — upstream service failed or returned an invalid VIN
  - `504` — upstream request timed out (10 s)

## Configuration

- `PORT` — port to listen on (default `3000`)
- `VIN_UPSTREAM_URL` — upstream endpoint that returns a plain-text VIN (default `http://randomvin.com/getvin.php?type=real`)

## Project structure

- `app.js` — Express app setup
- `bin/www` — HTTP server entry point (graceful shutdown on SIGTERM/SIGINT)
- `routes/index.js` — routes (`/`, `/vin`)
- `views/` — EJS templates
- `public/javascripts/` — AngularJS app (module, service, controller)
