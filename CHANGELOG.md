## [3.0.0](https://github.com/d0-datanova/react-sdk/compare/v2.0.0...v3.0.0) (2025-07-24)

### ⚠ BREAKING CHANGES

* The DatanovaProvider component now requires the 'datanova' prop instead of 'value'. This provides a more descriptive and intuitive API.

Migration guide:
```jsx
// Before
<DatanovaProvider value={datanova}>
  <App />
</DatanovaProvider>

// After
<DatanovaProvider datanova={datanova}>
  <App />
</DatanovaProvider>
```

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-authored-by: Claude <noreply@anthropic.com>

* feat\!: rename DatanovaProvider prop from 'value' to 'datanova' ([#7](https://github.com/d0-datanova/react-sdk/issues/7)) ([15edb91](https://github.com/d0-datanova/react-sdk/commit/15edb91ee1ccf0552b6ad351ab33402ec7df462a))

## [2.0.0](https://github.com/d0-datanova/react-sdk/compare/v1.7.0...v2.0.0) (2025-07-14)

### ⚠ BREAKING CHANGES

* Updated @datanova/browser dependency from v1.8.0 to v2.0.0. This major version upgrade may introduce breaking changes to the browser SDK functionality.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-authored-by: Claude <noreply@anthropic.com>

* feat\!: upgrade @datanova/browser to v2.0.0 ([#6](https://github.com/d0-datanova/react-sdk/issues/6)) ([e217194](https://github.com/d0-datanova/react-sdk/commit/e2171941b35d9eade412223abfc19ac2a06b593a))

## [1.7.0](https://github.com/d0-datanova/react-sdk/compare/v1.6.0...v1.7.0) (2025-07-11)

### Features

* upgrade browser sdk ([0d4ba88](https://github.com/d0-datanova/react-sdk/commit/0d4ba880099080d1de40078d5a703c283558c5f5))

## [1.6.0](https://github.com/d0-datanova/react-sdk/compare/v1.5.0...v1.6.0) (2025-07-10)

### Features

* bump version ([3eba324](https://github.com/d0-datanova/react-sdk/commit/3eba32421ac0acdc0d67e4b5fce3b5036a1b0baf))

## [1.5.0](https://github.com/d0-datanova/react-sdk/compare/v1.4.0...v1.5.0) (2025-07-09)

### Features

* upgrade browser sdk version ([35a497f](https://github.com/d0-datanova/react-sdk/commit/35a497f37adce0ab1a3007c78dc628b2ebbf898a))

## [1.4.0](https://github.com/d0-datanova/react-sdk/compare/v1.3.0...v1.4.0) (2025-07-09)

### Features

* change name to createDatanova ([#3](https://github.com/d0-datanova/react-sdk/issues/3)) ([62eb557](https://github.com/d0-datanova/react-sdk/commit/62eb557380087b012913b394434b8a5868867906))

## [1.3.0](https://github.com/d0-datanova/react-sdk/compare/v1.2.0...v1.3.0) (2025-07-09)

### Features

* change TrackPageView to be standalone component ([#2](https://github.com/d0-datanova/react-sdk/issues/2)) ([278e85c](https://github.com/d0-datanova/react-sdk/commit/278e85cf1f10101701b95e73ed205fa06775d921))

## [1.2.0](https://github.com/d0-datanova/react-sdk/compare/v1.1.0...v1.2.0) (2025-07-09)

### Features

* selectively re-export from browser sdk ([f5c3483](https://github.com/d0-datanova/react-sdk/commit/f5c348348272962a47743f1d651a3feda2073b03))

## [1.1.0](https://github.com/d0-datanova/react-sdk/compare/v1.0.1...v1.1.0) (2025-07-09)

### Features

* change to useVariant ([#1](https://github.com/d0-datanova/react-sdk/issues/1)) ([8f9f18b](https://github.com/d0-datanova/react-sdk/commit/8f9f18b5cef3a17aad1f440e385e42463ce26c95))

## [1.0.1](https://github.com/d0-datanova/react-sdk/compare/v1.0.0...v1.0.1) (2025-07-09)

## 1.0.0 (2025-07-09)

### Features

* first commit ([fc376cb](https://github.com/d0-datanova/react-sdk/commit/fc376cbbdc7307c3a09bed50f7355d0a1fabbade))
