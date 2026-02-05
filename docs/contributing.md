# Contributing to OpenSync

Thanks for contributing.

## Setup

```bash
git clone https://github.com/your-org/opensync
cd opensync
npm install
```

## Development

```bash
npm run dev
```

## Checks before PR

```bash
npm run build
npm run test
npm --workspace @opensync/sdk-react-native pack
```

## Release flow

1. Add a changeset (`npm run changeset`)
2. Open PR with the changes
3. Merge to main
4. Run release workflow for npm/NuGet artifacts
