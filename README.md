# Nexoos Simulator

It's a simple financial investments platform. You can create companies, request credit, and calculate monthly payments.
There isn't a login feature, because it's only a simulator, so you can do everything.

## Running

You can prepare your Postgres database and run it local, but we recommend using Docker:

```bash
docker-compose up
```

## Running tests

```bash
docker exec dev-challenge_app_1 bundle exec rspec
```

## Technologies

- Ruby 2.7
- Postgres 12.1
- Rails 6.0.3.4
