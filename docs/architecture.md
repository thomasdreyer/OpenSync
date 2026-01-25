
---

# ✅ 3. ARCHITECTURE OVERVIEW (docs/architecture.md)

```markdown
# OpenSync Architecture

OpenSync follows a **local-first, server-authoritative sync model** optimized for mobile environments with unreliable connectivity.

## High-Level Components

Mobile Client → Local DB → Sync Engine → API Gateway → Data Store → Realtime Engine → Other Clients

### Client Side
- SQLite / Realm local store
- Change queue
- Conflict resolver
- Background sync worker

### Server Side
- Auth service
- Sync API
- Conflict resolution layer
- Event bus
- Storage service

### Realtime
- WebSocket / SSE pub-sub
- Channel-based subscriptions
- Event replay

---

## Sync Model

1. Client writes to local DB immediately
2. Changes queued locally
3. Background sync pushes deltas
4. Server validates & merges
5. Server broadcasts updates
6. Clients reconcile

---

## Conflict Resolution

- Last-write-wins
- Field-level merge
- Custom merge strategies (pluggable)

---

## Data Integrity

- Version vectors
- Schema migrations
- Deterministic replay
- Server-side validation

---

## Security

- JWT auth
- Role-based permissions
- Row-level policies
- Encrypted transport

---

## Scalability

- Horizontal stateless APIs
- Event-driven sync engine
- Partitioned datasets
- Offline-first edge-friendly design
