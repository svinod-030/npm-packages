import React, { useEffect, useState } from 'react';
import { init, enabled } from 'feature-toggle-js';

const ConfigExample: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [configValues, setConfigValues] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize with static configuration
    const config = {
      NEW_FEATURE: true,
      DARK_MODE: false,
      BETA_FEATURES: true
    };

    // Store config values for display
    setConfigValues(config);
    
    // Initialize feature toggles
    init({ config });
    setIsInitialized(true);
    
    // Log for debugging
    console.log('Config initialized with:', config);
  }, []);

  if (!isInitialized) {
    return <div>Initializing...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Config-based Feature Toggles</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">New Feature</h3>
          {enabled('NEW_FEATURE') ? (
            <div className="text-green-600">✓ New feature is enabled</div>
          ) : (
            <div className="text-red-600">✗ New feature is disabled</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Value: {configValues.NEW_FEATURE ? 'true' : 'false'}
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Dark Mode</h3>
          {enabled('DARK_MODE') ? (
            <div className="text-green-600">✓ Dark mode is enabled</div>
          ) : (
            <div className="text-red-600">✗ Dark mode is disabled</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Value: {configValues.DARK_MODE ? 'true' : 'false'}
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Beta Features</h3>
          {enabled('BETA_FEATURES') ? (
            <div className="text-green-600">✓ Beta features are enabled</div>
          ) : (
            <div className="text-red-600">✗ Beta features are disabled</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Value: {configValues.BETA_FEATURES ? 'true' : 'false'}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Configuration Used:</h3>
        <pre className="bg-white p-2 rounded">
          {JSON.stringify(configValues, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ConfigExample; 