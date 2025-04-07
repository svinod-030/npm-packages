import dotenv from 'dotenv';
import { init, enabled } from 'feature-toggle-js';

// Load environment variables from .env file
dotenv.config();

// Initialize feature toggle manager
async function initializeFeatureToggles() {
  try {
    // Initialize with environment variables
    // Note: Environment variables must be prefixed with TOGGLE_
    await init({ enableLogging: true });
    console.log('Feature toggle manager initialized successfully');
    
    // Log all environment variables for debugging
    console.log('Environment variables:');
    console.log('TOGGLE_DEBUG_MODE:', process.env.TOGGLE_DEBUG_MODE);
    console.log('TOGGLE_MAINTENANCE_MODE:', process.env.TOGGLE_MAINTENANCE_MODE);
    console.log('TOGGLE_EXPERIMENTAL:', process.env.TOGGLE_EXPERIMENTAL);
    console.log('TOGGLE_NEW_API:', process.env.TOGGLE_NEW_API);
    console.log('TOGGLE_LOGGING:', process.env.TOGGLE_LOGGING);
    
    // Demonstrate feature toggle usage
    demonstrateFeatureToggles();
  } catch (error) {
    console.error('Error initializing feature toggles:', error);
  }
}

function demonstrateFeatureToggles() {
  console.log('\n--- Feature Toggle Demo ---');
  
  // Check if debug mode is enabled
  if (enabled('DEBUG_MODE')) {
    console.log('✓ Debug mode is enabled');
  } else {
    console.log('✗ Debug mode is disabled');
  }
  
  // Check if maintenance mode is enabled
  if (enabled('MAINTENANCE_MODE')) {
    console.log('✓ Maintenance mode is enabled');
  } else {
    console.log('✗ Maintenance mode is disabled');
  }
  
  // Check if experimental features are enabled
  if (enabled('EXPERIMENTAL')) {
    console.log('✓ Experimental features are enabled');
  } else {
    console.log('✗ Experimental features are disabled');
  }
  
  // Check if new API is enabled
  if (enabled('NEW_API')) {
    console.log('✓ New API is enabled');
  } else {
    console.log('✗ New API is disabled');
  }
  
  // Check if logging is enabled
  if (enabled('LOGGING')) {
    console.log('✓ Logging is enabled');
  } else {
    console.log('✗ Logging is disabled');
  }
  
  // Example of conditional code execution based on feature toggles
  console.log('\n--- Conditional Code Execution ---');
  
  if (enabled('DEBUG_MODE')) {
    console.log('Running in debug mode with additional logging');
    // Additional debug code here
  }
  
  if (enabled('MAINTENANCE_MODE')) {
    console.log('System is in maintenance mode, some features may be unavailable');
    // Maintenance mode code here
  }
  
  if (enabled('NEW_API')) {
    console.log('Using the new API implementation');
    // New API code here
  } else {
    console.log('Using the legacy API implementation');
    // Legacy API code here
  }
}

// Run the example
initializeFeatureToggles(); 