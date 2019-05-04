# Service

## TODO Diagram

## API

| Method | Path            | Request Parameters        | Request Body | Response Body |
| ------ | --------------- | ------------------------- | ------------ | --------------|
| GET    | /fractals       | `sort`, `limit`, `offset` | *None*       | `[Fractal]`   |
| POST   | /fractals       | *None*                    | `Fractal`    | `Fractal`     |
| GET    | /fractal/<name> | *None*                    | *None*       | `Fractal`     |

See `fractal.schema.json` for the definition of `Fractal`

## Development

Run the endpoint locally with `./start`, deploy to production with `./deploy`.
