import fs from 'fs';
import path from 'path';

export interface BaseComponentConfig {
  name: string;
  type: string;
  description: string;
}

export interface SizeConfig {
  width: number;
  height: number;
  icon?: {
    size: number;
    position: number;
    strokeWidth: number;
  };
  text?: {
    size: string;
    weight: string;
  };
}

export interface StateConfig {
  background?: string | {
    default: string;
    onColor?: string;
  };
  border?: {
    width: number;
    default: string;
    onColor: string;
  };
  opacity?: number;
  transform?: string;
}

export interface ColorConfig {
  default: string;
  onColor?: string;
  hover?: string;
  active?: string;
}

export interface ComponentConfig extends BaseComponentConfig {
  sizes?: Record<string, SizeConfig>;
  states?: Record<string, StateConfig>;
  colors?: {
    background?: ColorConfig;
    text?: ColorConfig;
    border?: ColorConfig;
    icon?: ColorConfig;
  };
  cornerRadius?: number;
  examples?: string[];
}

export function loadComponentConfig(componentName: string): ComponentConfig {
  const configPath = path.join(process.cwd(), 'components', `${componentName}.json`);
  
  try {
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configContent);
    validateConfig(config);
    return config;
  } catch (error) {
    throw new Error(`Failed to load configuration for component ${componentName}: ${error.message}`);
  }
}

function validateConfig(config: ComponentConfig) {
  if (!config.name || !config.type || !config.description) {
    throw new Error('Component configuration must include name, type, and description');
  }
}

export function loadAllConfigs(): Record<string, ComponentConfig> {
  const configsDir = path.join(process.cwd(), 'components');
  const configs: Record<string, ComponentConfig> = {};

  if (!fs.existsSync(configsDir)) {
    return configs;
  }

  const files = fs.readdirSync(configsDir);
  for (const file of files) {
    if (file.endsWith('.json')) {
      const componentName = file.replace('.json', '');
      configs[componentName] = loadComponentConfig(componentName);
    }
  }

  return configs;
}