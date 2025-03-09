/**
 * Script to set up environment files for deployment
 * Usage: node scripts/setup-env.js [environment]
 * 
 * Example:
 *   node scripts/setup-env.js production
 */

const fs = require('fs');
const path = require('path');
const { environments, generateEnvFile } = require('../deploy-config');

// Get environment from command line argument or default to development
const targetEnv = process.argv[2] || 'development';

if (!environments[targetEnv]) {
  console.error(`Error: Unknown environment "${targetEnv}"`);
  console.error(`Available environments: ${Object.keys(environments).join(', ')}`);
  process.exit(1);
}

// Root directory
const rootDir = path.resolve(__dirname, '..');

// Create root .env file
const rootEnvContent = generateEnvFile(targetEnv);
fs.writeFileSync(path.join(rootDir, '.env'), rootEnvContent);
console.log(`✅ Created root .env file for ${targetEnv} environment`);

// Get all packages
const packagesDir = path.join(rootDir, 'packages');
if (fs.existsSync(packagesDir)) {
  const packages = fs.readdirSync(packagesDir)
    .filter(item => fs.statSync(path.join(packagesDir, item)).isDirectory());
  
  // Create package-specific .env files
  packages.forEach(pkg => {
    const packageDir = path.join(packagesDir, pkg);
    const packageEnvExamplePath = path.join(packageDir, '.env.example');
    const packageEnvPath = path.join(packageDir, '.env');
    
    // If package has .env.example, use it as a template
    if (fs.existsSync(packageEnvExamplePath)) {
      let packageEnvContent = fs.readFileSync(packageEnvExamplePath, 'utf8');
      
      // Add environment-specific variables
      packageEnvContent += `\n# Environment: ${targetEnv}\n`;
      packageEnvContent += `NODE_ENV=${targetEnv}\n`;
      
      // Add shared variables from root
      packageEnvContent += `\n# Shared variables from root\n`;
      packageEnvContent += `NEXT_PUBLIC_APP_URL=${environments[targetEnv].url}\n`;
      packageEnvContent += `NEXT_PUBLIC_API_URL=${environments[targetEnv].apiUrl}\n`;
      
      fs.writeFileSync(packageEnvPath, packageEnvContent);
      console.log(`✅ Created .env file for ${pkg} package`);
    }
  });
}

console.log(`\n🚀 Environment setup complete for ${targetEnv}!`);
console.log(`You can now deploy your application with the correct environment variables.`);