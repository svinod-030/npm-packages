# Feature Toggle JS Example

This example demonstrates how to use the `feature-toggle-js` library in a React application. It showcases three different ways to initialize and use feature toggles:

1. Config-based toggles
2. API-based toggles
3. Environment variable based toggles

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/svinod-030/npm-packages.git
cd npm-packages/examples/feature-toggle-example
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will start at http://localhost:3000

## Usage Examples

### 1. Config-based Toggles

The ConfigExample component demonstrates how to initialize feature toggles using a static configuration object:

```typescript
import { init, enabled } from 'feature-toggle-js';

const config = {
  NEW_FEATURE: true,
  DARK_MODE: false,
  BETA_FEATURES: true
};

init({ config });
```

### 2. API-based Toggles

The ApiExample component shows how to fetch feature toggles from an API endpoint:

```typescript
import { init, enabled } from 'feature-toggle-js';

await init({ 
  apiUrl: 'https://api.example.com/feature-toggles',
  enableLogging: true 
});
```

### 3. Environment Variable Based Toggles

The EnvExample component demonstrates how to use environment variables for feature toggles:

1. Create a `.env` file:
```bash
TOGGLE_DEBUG_MODE=true
TOGGLE_MAINTENANCE_MODE=false
TOGGLE_EXPERIMENTAL=true
```

2. Initialize in your code:
```typescript
import { init, enabled } from 'feature-toggle-js';

init();
```

## Project Structure

```
feature-toggle-example/
├── src/
│   ├── components/
│   │   ├── ConfigExample.tsx
│   │   ├── ApiExample.tsx
│   │   └── EnvExample.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Learn More

For more information about the feature-toggle-js library, check out:
- [feature-toggle-js Documentation](https://github.com/svinod-030/npm-packages/tree/main/packages/feature-toggle-js)
- [API Reference](https://github.com/svinod-030/npm-packages/tree/main/packages/feature-toggle-js#api-reference) 