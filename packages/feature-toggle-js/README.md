# Feature Toggle Manager

A simple JavaScript library for managing feature toggles with support for environment variables, preloaded configurations, or dynamic API integration. This library offers a clean and intuitive API to enable and disable features in your application, allowing seamless toggle management across various environments.

---
# Supported platforms
1. **Node.js Support:** Reads toggles from process.env variables.
2. **Browser Support:** Loads toggles from a provided configuration or fetches them from an API.
3. **Runtime Detection:** Automatically detects the runtime environment (Node.js or browser).

---

# Key Features

- **Environment Variable Support**: Easily enable/disable features based on environment-specific toggles.
- **Preloaded Configuration**: Use a static configuration file to define your toggles.
- **Dynamic API Integration**: Fetch toggles dynamically from an API for real-time updates.
- **Lightweight and Fast**: Minimal footprint for high performance.
- **Intuitive API**: Simplified methods for managing feature toggles.
- **Logging**: Debug logs can be enabled or disabled via options.

---

## Installation

Install the library using npm or yarn:

```bash
npm install feature-toggle-js
```

or

```bash
yarn add feature-toggle-js
```

---

## Getting Started

### 1. Initialize the Manager

Toggle configuration can be loaded multiple ways. Use one of the below options based on your requirement. Use the `init()` function to initialize the FeatureToggleManager. This function must be called before using `enabled()`. Toggles can be loaded from various sources like below.

#### a. Initialize with Environment Variables (Node.js environment)

Define feature toggles in your environment variables. Use the `TOGGLE_` prefix for all feature toggle keys. The values should be `true` or `false` (case-sensitive).

Example:

```bash
export TOGGLE_NEW_FEATURE=true
export TOGGLE_BETA_MODE=false
```

```javascript
const { init, enabled } = require("feature-toggle-js");

init();
```

#### b. Initialize with Preloaded Configuration

```javascript
const { init, enabled } = require("feature-toggle-js");

const config = {
    NEW_FEATURE: true,
    BETA_MODE: false,
};

init({ config });
```

#### c. Initialize with Dynamic API or JSON file path

```javascript
const { init, enabled } = require("feature-toggle-js");

const apiUrl = "http://localhost:5173/api.json";

await init({ apiUrl });

```
API response of http://localhost:5173/api.json
```json
  {
   "NEW_FEATURE": true,
   "BETA_MODE": false
  }
```

### 2. Check Feature Toggles

Use the `enabled()` function to check whether a feature is enabled.

```javascript
if (enabled("NEW_FEATURE")) {
  console.log("The new feature is enabled!");
} else {
  console.log("The new feature is disabled.");
}
```

---

## API Reference

```
init({
    config?: Record<string, boolean>;
    apiUrl?: string;
    enableLogging?: boolean;
})
```

Initializes the FeatureToggleManager and loads feature toggles from environment variables or preloaded config or dynamic API. This must be called before using the `enabled()` function.

Example:

```javascript
init();

// OR

const toggles = {"TOGGLE_BETA_FEATURE": "true"};
init({
    config: toggles
})

// OR

init({
    apiUrl: "http://localhost:5347/api.json"
})

```

### `enabled(featureName: string): boolean`

Checks whether a given feature toggle is enabled.

- **featureName**: The name of the feature toggle (case-sensitive, without the `TOGGLE_` prefix).
- **Returns**: `true` if the feature is enabled, `false` otherwise.

Example:

```javascript
if (enabled("BETA_MODE")) {
  console.log("Beta mode is enabled.");
}
```

---

## Examples

### Use with React with preloaded config

```javascript
import React from 'react';
import { init, enabled } from "feature-toggle-js";

const config = {
NEW_DASHBOARD: true,
};

init({config});


function App() {
return (
    <div>
        {enabled('NEW_DASHBOARD') ? (
            <NewDashboard />
        ) : (
            <OldDashboard />
        )}
    </div>
);
}

export default App;
```

### Use with React with dynamic API

```javascript
import React from 'react';
import { init, enabled } from "feature-toggle-js";

const apiUrl = "http://localhost:5173/api.json";

await init({ apiUrl });

function App() {
    return (
        <div>
            {enabled('NEW_DASHBOARD') ? (
                <NewDashboard />
            ) : (
                <OldDashboard />
            )}
        </div>
    );
}

export default App;
```

### Use with Express

```javascript
const express = require('express');
const { init, enabled } = require("feature-toggle-js");

const app = express();
const config = {
BETA_FEATURE: true,
};

init({config}); // For reading toggles from preloaded configuration
// init();  // for reading toggles config from environment variables
// init({apiUrl: "http://localhost:5347/toggles.json"}); // For reading toggles from dynamic api

app.get('/', (req, res) => {
if (toggles.isEnabled('BETA_FEATURE')) {
res.send('Beta Feature is enabled!');
} else {
res.send('Beta Feature is disabled!');
}
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
```

---

## Environment Variable Naming Convention

- All feature toggles must be prefixed with `TOGGLE_`. This is to differentiate the feature toggles from other project related environment variables.
- The toggle name should be descriptive and written in uppercase letters with underscores as separators.

Example:

```bash
export TOGGLE_NEW_FEATURE=true
export TOGGLE_EXPERIMENTAL_UI=false
```

---

## Error Handling

If `enabled()` is called before `init()`, an error will be thrown:

```
Error: FeatureToggleManager is not initialized. Call init() first.
```

Ensure that you call `init()` at the start of your application before checking any toggles.

---

## Testing

To test the library, you can use any Node.js testing framework like Jest. Here is an example:

```javascript
const { init, enabled } = require("feature-toggle-js");

describe("FeatureToggleManager", () => {
  beforeAll(() => {
    process.env.TOGGLE_TEST_FEATURE = "true";
    process.env.TOGGLE_DISABLED_FEATURE = "false";
  });

  it("should return true for enabled features", () => {
    init();
    expect(enabled("TEST_FEATURE")).toBe(true);
  });

  it("should return false for disabled features", () => {
    init();
    expect(enabled("DISABLED_FEATURE")).toBe(false);
  });

  it("should throw an error if enabled is called before init", () => {
    jest.resetModules();
    expect(() => enabled("TEST_FEATURE")).toThrowError(
      "FeatureToggleManager is not initialized. Call init() first."
    );
  });
});
```

Run the tests using:

```bash
npm test
```

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests on the GitHub repository.

---

## License

This project is licensed under the MIT License.

