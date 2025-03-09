/**
 * Deployment configuration for different environments
 * This file helps manage environment-specific settings
 */

const environments = {
  development: {
    name: 'Development',
    url: 'http://172.16.2.57:3000',
    apiUrl: 'http://172.16.2.57:3001',
    envFile: '.env.local',
    host: '172.16.2.57'
  },
  staging: {
    name: 'Staging',
    url: 'http://172.16.2.57:3000',
    apiUrl: 'http://172.16.2.57:3001',
    envFile: '.env.staging',
    host: '172.16.2.57'
  },
  production: {
    name: 'Production',
    url: 'http://172.16.2.57:3000',
    apiUrl: 'http://172.16.2.57:3001',
    envFile: '.env.production',
    host: '172.16.2.57'

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
HOST=${config.host}


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