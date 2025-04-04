import React, { useState } from 'react';
import ConfigExample from './components/ConfigExample';
import ApiExample from './components/ApiExample';
import EnvExample from './components/EnvExample';


const App: React.FC = () => {
  const [initMethod, setInitMethod] = useState<'config' | 'api' | 'env'>('config');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Feature Toggle JS Examples</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Initialization Method:</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${initMethod === 'config' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setInitMethod('config')}
          >
            Config Based
          </button>
          <button
            className={`px-4 py-2 rounded ${initMethod === 'api' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setInitMethod('api')}
          >
            API Based
          </button>
          <button
            className={`px-4 py-2 rounded ${initMethod === 'env' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setInitMethod('env')}
          >
            Environment Based
          </button>
        </div>
      </div>

      <div className="mt-8">
        {initMethod === 'config' && <ConfigExample />}
        {initMethod === 'api' && <ApiExample />}
        {initMethod === 'env' && <EnvExample />}
      </div>
    </div>
  );
};

export default App; 