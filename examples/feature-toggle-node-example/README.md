# Feature Toggle JS - Node.js Example

This example demonstrates how to use the `feature-toggle-js` package in a Node.js application.

## Features

- Environment variable based feature toggles
- Express server with feature toggle middleware
- Conditional code execution based on feature toggles
- Debug endpoints that are only available when debug mode is enabled

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to this example directory
3. Install dependencies:

```bash
npm install
```

## Configuration

Feature toggles are configured using environment variables. Create a `.env` file in the root directory with the following content:

```
TOGGLE_DEBUG_MODE=true
TOGGLE_MAINTENANCE_MODE=false
TOGGLE_EXPERIMENTAL=true
TOGGLE_NEW_API=true
TOGGLE_LOGGING=true
```

## Running the Examples

### Basic Example

Run the basic example that demonstrates feature toggle usage:

```bash
npm start
```

### API Server Example

Run the Express API server example:

```bash
npm run start:server
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## Available Endpoints (API Server)

- `GET /`: Returns basic information about the API server
- `GET /api/data`: Returns data with different formats based on the NEW_API toggle
- `GET /api/experimental`: Returns experimental feature data (only available when EXPERIMENTAL toggle is enabled)
- `GET /api/debug`: Returns debug information (only available when DEBUG_MODE toggle is enabled)

## Feature Toggle Usage

### Checking if a Feature is Enabled

```typescript
import { enabled } from 'feature-toggle-js';

if (enabled('DEBUG_MODE')) {
  // Debug mode is enabled
  console.log('Running in debug mode');
} else {
  // Debug mode is disabled
  console.log('Running in production mode');
}
```

### Initializing the Feature Toggle Manager

```typescript
import { init } from 'feature-toggle-js';

// Initialize with environment variables
await init({ enableLogging: true });
```

## Environment Variables

All feature toggles must be prefixed with `TOGGLE_` in the environment variables:

- `TOGGLE_DEBUG_MODE`: Enable/disable debug mode
- `TOGGLE_MAINTENANCE_MODE`: Enable/disable maintenance mode
- `TOGGLE_EXPERIMENTAL`: Enable/disable experimental features
- `TOGGLE_NEW_API`: Enable/disable the new API implementation
- `TOGGLE_LOGGING`: Enable/disable request logging

## License

MIT 