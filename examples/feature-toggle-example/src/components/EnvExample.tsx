import React, { useEffect, useState } from 'react';
import { init, enabled } from 'feature-toggle-js';

const EnvExample: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [envValues, setEnvValues] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    // Initialize with environment variables
    // Note: Environment variables must be prefixed with TOGGLE_
    init();
    setIsInitialized(true);
    
    // Log environment variables for debugging
    const envVars = {
      TOGGLE_DEBUG_MODE: process.env.TOGGLE_DEBUG_MODE,
      TOGGLE_MAINTENANCE_MODE: process.env.TOGGLE_MAINTENANCE_MODE,
      TOGGLE_EXPERIMENTAL: process.env.TOGGLE_EXPERIMENTAL
    };
    setEnvValues(envVars);
    console.log('Environment variables:', envVars);
  }, []);

  if (!isInitialized) {
    return <div>Initializing...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Environment Variable Based Feature Toggles</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Debug Mode</h3>
          {enabled('TOGGLE_DEBUG_MODE') ? (
            <div className="text-green-600">✓ Debug mode is enabled</div>
          ) : (
            <div className="text-red-600">✗ Debug mode is disabled</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Value: {enabled('TOGGLE_DEBUG_MODE')  || 'undefined'}
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Maintenance Mode</h3>
          {enabled('TOGGLE_MAINTENANCE_MODE') ? (
            <div className="text-green-600">✓ Maintenance mode is enabled</div>
          ) : (
            <div className="text-red-600">✗ Maintenance mode is disabled</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Value: {envValues.TOGGLE_MAINTENANCE_MODE || 'undefined'}
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Experimental Features</h3>
          {enabled('TOGGLE_EXPERIMENTAL') ? (
            <div className="text-green-600">✓ Experimental features are enabled</div>
          ) : (
            <div className="text-red-600">✗ Experimental features are disabled</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Value: {envValues.TOGGLE_EXPERIMENTAL || 'undefined'}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Environment Variables Setup:</h3>
        <pre className="bg-white p-2 rounded">
          {`# Add these to your .env file:
TOGGLE_DEBUG_MODE=true
TOGGLE_MAINTENANCE_MODE=false
TOGGLE_EXPERIMENTAL=true`}
        </pre>
      </div>
    </div>
  );
};

export default EnvExample; 