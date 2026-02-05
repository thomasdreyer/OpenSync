# Deployment

## Local Docker deployment

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

This starts:

- PostgreSQL (`db`)
- API (`api`)

## Environment variables

- `DB_HOST` (default: `localhost`)
- `JWT_SECRET` (default: `dev-secret`, change in production)

## Production recommendations

- Disable TypeORM auto-sync and use migrations
- Use a managed Postgres or HA Postgres cluster
- Rotate JWT secrets and use secret manager integration
- Add API rate limiting and request logging
- Put API behind TLS-terminating reverse proxy
