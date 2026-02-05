# OpenSync Architecture

OpenSync follows a local-first, server-authoritative sync model for mobile apps.

## Core components

- **Mobile SDKs**: React Native (current), .NET mobile (seed), native Android/iOS (roadmap)
- **API**: NestJS auth + sync endpoints
- **Database**: PostgreSQL via TypeORM
- **Sync model**: push local deltas, pull remote changes since version

## Sync flow

1. Client writes to local storage.
2. Client pushes pending deltas.
3. Server stores normalized change records.
4. Client pulls changes newer than `since` version.
5. Client reconciles in local store.

## Security model

- JWT bearer authentication
- Sync endpoints protected with auth guard
- Server derives `userId` from JWT claims
- DTO-based validation for auth/sync payloads

## Packaging architecture

- npm package: `@opensync/sdk-react-native`
- NuGet package: `OpenSync.Client`
- Future: generated clients from shared OpenAPI contract
