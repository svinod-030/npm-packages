import React, { useEffect, useState } from 'react';
import { init, enabled } from 'feature-toggle-js';

const ApiExample: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeToggles = async () => {
      try {
        // Initialize with API endpoint
        // Note: This is a mock API endpoint. Replace with your actual API endpoint
        await init({ 
          apiUrl: 'https://api.example.com/feature-toggles',
          enableLogging: true 
        });
        setIsInitialized(true);
      } catch (err) {
        setError('Failed to fetch feature toggles from API');
        console.error('Error initializing feature toggles:', err);
      }
    };

    initializeToggles();
  }, []);

  if (error) {
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded">
        {error}
      </div>
    );
  }

  if (!isInitialized) {
    return <div>Loading feature toggles from API...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">API-based Feature Toggles</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Premium Features</h3>
          {enabled('PREMIUM_FEATURES') ? (
            <div className="text-green-600">✓ Premium features are enabled</div>
          ) : (
            <div className="text-red-600">✗ Premium features are disabled</div>
          )}
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Analytics</h3>
          {enabled('ANALYTICS') ? (
            <div className="text-green-600">✓ Analytics are enabled</div>
          ) : (
            <div className="text-red-600">✗ Analytics are disabled</div>
          )}
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">A/B Test</h3>
          {enabled('AB_TEST') ? (
            <div className="text-green-600">✓ A/B test is enabled</div>
          ) : (
            <div className="text-red-600">✗ A/B test is disabled</div>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">API Configuration:</h3>
        <pre className="bg-white p-2 rounded">
          {JSON.stringify({
            apiUrl: 'https://api.example.com/feature-toggles',
            enableLogging: true
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ApiExample; 