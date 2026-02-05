# OpenSync 🚀
### Open-source mobile backend with offline-first sync

OpenSync is an open-source backend platform designed for modern mobile applications that need **offline-first data sync**, **realtime updates**, **auth**, and **storage** — without vendor lock-in.

Think: Firebase / Supabase — but **offline-first**, **self-hostable**, and **built for production mobile systems**.

---

## ✨ Why OpenSync

Mobile apps fail when:
- Networks are unreliable
- Backend sync is fragile
- Data conflicts break user trust
- Infrastructure costs spiral

OpenSync solves this by providing:
✅ Offline-first sync engine  
✅ Conflict resolution strategies  
✅ Auth & role-based access control  
✅ Realtime subscriptions  
✅ File storage  
✅ Self-hosted infrastructure  
✅ Mobile SDKs  

---

## 🧠 Core Features

### 🔐 Authentication
- Email/password, OAuth2, JWT
- Role-based permissions
- Multi-tenant ready

### 🔄 Offline-First Sync Engine
- Local-first SQLite storage
- Automatic background sync
- Conflict detection & resolution
- Delta-based updates

### ⚡ Realtime
- WebSocket subscriptions
- Event streams
- Push-friendly architecture

### 📦 Storage
- Secure file uploads/downloads
- Signed URLs
- Media handling

### 🛠 Admin Dashboard
- User management
- Data inspection
- Sync logs
- Permissions

### ☁️ Deployment
- Docker / Kubernetes ready
- Cloud or self-hosted
- CI/CD templates included

---

## 📱 Supported Clients (Planned)

- React Native (first-class)
- Flutter
- Web (PWA)
- Native iOS & Android

---


## 🔧 React Native SDK: multi-team configuration

The SDK client now supports dynamic configuration so different teams can map to their own API routes and identity model while keeping the default behavior unchanged.

```ts
import { OpenSyncClient } from '@opensync/sdk-react-native';

const client = new OpenSyncClient({
  baseUrl: 'https://api.example.com',
  endpoints: {
    register: '/v1/auth/signup',
    login: '/v1/auth/signin',
    push: '/v1/sync/upload',
    pull: '/v1/sync/download'
  },
  getUserId: () => currentWorkspaceUserId
});
```

If you pass just a URL string (`new OpenSyncClient('https://api.example.com')`), the previous default routes and `userId: 'me'` behavior are still used.

---

## 🚀 Getting Started (Early Preview)

```bash
git clone https://github.com/your-org/opensync
cd opensync
docker-compose up
```

```bash
import { OpenSyncClient } from '@opensync/sdk';

const client = new OpenSyncClient({
  url: 'http://localhost:8080',
  apiKey: 'dev-key'
});

await client.auth.signIn('user@email.com', 'password');
const todos = await client.collection('todos').sync();

```
