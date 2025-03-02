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

// Instead of loading from filesystem, we'll export type definitions only
export type { 
  BaseComponentConfig,
  SizeConfig,
  StateConfig,
  ColorConfig,
  ComponentConfig
};