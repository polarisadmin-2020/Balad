const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure the shared-ui package is built first
try {
  console.log('Building shared-ui package...');
  execSync('cd packages/shared-ui && npm run build', { stdio: 'inherit' });
} catch (error) {
}