/**
 * Deployment configuration for different environments
 * This file helps manage environment-specific settings
 */

const environments = {
  development: {
    name: 'Development',
    url: 'http://localhost:3000',
    apiUrl: 'http://localhost:3001',
    envFile: '.env.local'
  },
  staging: {
    name: 'Staging',
    url: 'https://staging.your-app-domain.com',
    apiUrl: 'https://api-staging.your-app-domain.com',
    envFile: '.env.staging'
  },
  production: {
    name: 'Production',
    url: 'https://your-app-domain.com',
    apiUrl: 'https://api.your-app-domain.com',
    envFile: '.env.production'
  }
};

/**
 * Generate environment-specific .env file
 * @param {string} env - Environment name (development, staging, production)
 * @returns {string} - Content of the environment file
 */
function generateEnvFile(env) {
  const config = environments[env] || environments.development;
  
  return `# ${config.name} environment variables
# Generated on ${new Date().toISOString()}

NODE_ENV=${env}

# Application
NEXT_PUBLIC_APP_URL=${config.url}

# API endpoints
NEXT_PUBLIC_API_URL=${config.apiUrl}

# Add other environment-specific variables below
`;
}

module.exports = {
  environments,
  generateEnvFile
};