# OpenSync 🚀

OpenSync is an open-source, offline-first backend stack for mobile apps. It includes:

- A NestJS API for auth + sync
- A React Native SDK package for clients
- Docker-based local development
- CI/release scaffolding for npm and NuGet distribution

## Current package targets

- **npm**: `@opensync/sdk-react-native` (React Native)
- **NuGet (planned/seeded)**: `OpenSync.Client` for .NET MAUI / Xamarin migration scenarios
- **Native SDKs (roadmap)**: Android (Kotlin) and iOS (Swift)

## Quick start (local development)

```bash
git clone https://github.com/thomasdreyer/opensync
cd opensync
npm install
docker compose -f infra/docker/docker-compose.yml up -d db
npm run dev
```

API is served from `http://localhost:8080/api`.

## Install the React Native SDK

```bash
npm install @opensync/sdk-react-native
# or
pnpm add @opensync/sdk-react-native
# or
yarn add @opensync/sdk-react-native
```

```ts
import { OpenSyncClient } from '@opensync/sdk-react-native';

const client = new OpenSyncClient({
  baseUrl: 'http://localhost:8080/api'
});

await client.register('user@example.com', 'password123');
await client.push([{ collection: 'todos', data: { id: 1, text: 'Ship it' } }]);
const updates = await client.pull(0);
```

## Package publishing

### npm (React Native SDK)

```bash
npm run build
cd packages/sdk-react-native
npm publish --access public
```

### NuGet (.NET mobile SDK)

```bash
dotnet pack packages/sdk-dotnet/OpenSync.Client/OpenSync.Client.csproj -c Release
# publish with:
# dotnet nuget push <nupkg> --api-key <key> --source https://api.nuget.org/v3/index.json
```

## Security and API contract

- Sync routes require JWT bearer auth.
- `userId` is derived from token claims on the server.
- Request payloads are validated with Nest `ValidationPipe` and DTO validators.

## Roadmap

- Kotlin Android SDK
- Swift iOS SDK
- Shared contract/OpenAPI for generated client SDKs
- Stable `0.1.0` package release after alpha feedback
