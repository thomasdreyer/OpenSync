# Getting Started

## 1) Install dependencies

```bash
npm install
```

## 2) Start infrastructure

```bash
docker compose -f infra/docker/docker-compose.yml up -d db
```

## 3) Start API

```bash
npm run dev
```

API base URL: `http://localhost:8080/api`

## 4) Use the React Native SDK

```bash
npm install @opensync/sdk-react-native
```

```ts
import { OpenSyncClient } from '@opensync/sdk-react-native';

const client = new OpenSyncClient({ baseUrl: 'http://localhost:8080/api' });
await client.register('test@example.com', 'password123');
```

## 5) Package output checks

```bash
npm run build
npm --workspace @opensync/sdk-react-native pack
```
