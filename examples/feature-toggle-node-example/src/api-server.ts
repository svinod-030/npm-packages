import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { init, enabled } from 'feature-toggle-js';

// Load environment variables from .env file
dotenv.config();

// Initialize feature toggle manager
async function initializeFeatureToggles() {
  try {
    // Initialize with environment variables
    await init({ enableLogging: true });
    console.log('Feature toggle manager initialized successfully');
  } catch (error) {
    console.error('Error initializing feature toggles:', error);
  }
}

// Create Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to check if maintenance mode is enabled
const maintenanceModeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (enabled('MAINTENANCE_MODE')) {
    return res.status(503).json({
      status: 'error',
      message: 'Service is currently under maintenance. Please try again later.'
    });
  }
  next();
};

// Middleware to log requests if logging is enabled
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (enabled('LOGGING')) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
};

// Apply middleware
app.use(express.json());
app.use(maintenanceModeMiddleware);
app.use(loggingMiddleware);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Feature Toggle API Server',
    version: '1.0.0'
  });
});

// Example route with feature toggle
app.get('/api/data', (req: Request, res: Response) => {
  // Check if new API is enabled
  if (enabled('NEW_API')) {
    // New API implementation
    res.json({
      data: [
        { id: 1, name: 'Item 1', description: 'This is a new API response' },
        { id: 2, name: 'Item 2', description: 'This is a new API response' }
      ],
      source: 'new-api'
    });
  } else {
    // Legacy API implementation
    res.json({
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ],
      source: 'legacy-api'
    });
  }
});

// Example route with experimental feature
app.get('/api/experimental', (req: Request, res: Response) => {
  if (enabled('EXPERIMENTAL')) {
    res.json({
      message: 'This is an experimental feature',
      data: {
        feature: 'experimental',
        status: 'active'
      }
    });
  } else {
    res.status(404).json({
      message: 'This feature is not available'
    });
  }
});

// Debug route that's only available when debug mode is enabled
app.get('/api/debug', (req: Request, res: Response) => {
  if (enabled('DEBUG_MODE')) {
    res.json({
      DEBUG_MODE: enabled('DEBUG_MODE'),
      MAINTENANCE_MODE: enabled('MAINTENANCE_MODE'),
      EXPERIMENTAL: enabled('EXPERIMENTAL'),
      NEW_API: enabled('NEW_API'),
      LOGGING: enabled('LOGGING')
    });
  } else {
    res.status(404).json({
      message: 'Debug endpoint is not available'
    });
  }
});

// Start the server
async function startServer() {
  await initializeFeatureToggles();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available feature toggles:');
    console.log('- DEBUG_MODE:', enabled('DEBUG_MODE'));
    console.log('- MAINTENANCE_MODE:', enabled('MAINTENANCE_MODE'));
    console.log('- EXPERIMENTAL:', enabled('EXPERIMENTAL'));
    console.log('- NEW_API:', enabled('NEW_API'));
    console.log('- LOGGING:', enabled('LOGGING'));
  });
}

// Run the server
startServer(); 