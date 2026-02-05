# OpenSync React Native SDK Client Analysis

This document explains the behavior of `packages/sdk-react-native/src/index.ts`.

## What the code does

- Exposes an `OpenSyncClient` class that wraps HTTP calls for auth and sync.
- Supports two constructor signatures:
  - `new OpenSyncClient(baseUrl: string)` for legacy/default behavior.
  - `new OpenSyncClient(config)` for dynamic behavior.
- Defaults remain unchanged when using string constructor:
  - `register: /auth/register`
  - `login: /auth/login`
  - `push: /sync/push`
  - `pull: /sync/pull`
  - `userId: 'me'`
- Allows teams to override endpoint paths via `endpoints` and user identity via `getUserId`.
- Allows injecting a custom `axiosInstance` for advanced integrations/testing.
- `register` and `login` save `res.data.token` into in-memory `token` and return `res.data`.
- `push` and `pull` send bearer auth from this token and return `res.data`.

## Assumptions and edge cases

- Assumes backend contracts match configured endpoint paths and payload shapes.
- Assumes `res.data.token` is present on register/login responses.
- If token is not set, sync calls send `Bearer undefined` (preserved behavior).
- `getUserId` is called at request time for push/pull; malformed values are forwarded.
- Input validation is still delegated to backend.
- Errors are still surfaced via axios promise rejections.

## Refactor risks

- Changing request/response payload shapes can break backend compatibility.
- Changing token lifecycle or auth header formatting can cause auth regressions.
- Changing URL normalization behavior can break teams relying on current base/path handling.
- Tightening input validation may reject calls currently accepted by backend.

## Improvement ideas

- Add unit tests for constructor compatibility and endpoint/user overrides.
- Add typed request/response contracts per route.
- Add optional runtime validation as opt-in utilities (not default behavior).
