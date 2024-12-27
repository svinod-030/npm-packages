# Feature Toggle Manager

A simple javascript library for managing feature toggles using environment variables. This library provides a clean and easy-to-use API to enable and disable features in your application based on toggles defined in the environment.

---
# Key Features
1. **Node.js Support:** Reads toggles from process.env variables.
2. **Browser Support:** Loads toggles from a provided configuration or fetches them from an API.
3. **Runtime Detection:** Automatically detects the runtime environment (Node.js or browser).
4. **Logging:** Debug logs can be enabled or disabled via options.

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

### 1. Set Up Environment Variables

Define feature toggles in your environment variables. Use the `TOGGLE_` prefix for all feature toggle keys. The values should be `true` or `false` (case-sensitive).

Example:

```bash
export TOGGLE_NEW_FEATURE=true
export TOGGLE_BETA_MODE=false
```

### 2. Initialize the Manager

Use the `init()` function to initialize the FeatureToggleManager. This function must be called before using `enabled()`. Toggles can be loaded from various sources like below.

#### 2.1. Node.js environment

```javascript
const { init, enabled } = require("feature-toggle-js");

init();
```

#### 2.2. Preloaded config

```javascript
const { init, enabled } = require("feature-toggle-js");

const config = {
    NEW_FEATURE: true,
    BETA_MODE: false,
};

init({ config });
```

#### 2.3. Fetch config from API or local JSON file

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

### 3. Check Feature Toggles

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

### `init()`

Initializes the FeatureToggleManager and loads feature toggles from environment variables. This must be called before using the `enabled()` function.

Example:

```javascript
init();
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

## Example Usage

```javascript
// Import the manager
const { init, enabled } = require("feature-toggle-js");

// Initialize the manager
init();

// Check toggles
if (enabled("NEW_FEATURE")) {
  console.log("The new feature is enabled!");
} else {
  console.log("The new feature is disabled.");
}

if (enabled("BETA_MODE")) {
  console.log("Beta mode is enabled.");
} else {
  console.log("Beta mode is disabled.");
}
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

