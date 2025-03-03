export interface FigmaNode {
  id?: string;
  name: string;
  type?: string;
  visible?: boolean;
  children?: FigmaNode[];
  width?: number;
  height?: number;
}

export interface FigmaComponent extends FigmaNode {
  type: 'COMPONENT';
  description?: string;
  cornerRadius?: number;
  fills?: any[];
  strokes?: any[];
  effects?: any[];
  constraints?: {
    horizontal: string;
    vertical: string;
  };
  width?: number;
  height?: number;
}

export interface FigmaComponentSet extends FigmaNode {
  type: 'COMPONENT_SET';
  description?: string;
  children: FigmaComponent[];
}

export interface FigmaVariant {
  property: string;
  value: string;
}

export interface FigmaSize {
  width: number;
  height: number;
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface FigmaText extends FigmaNode {
  type: 'TEXT';
  characters: string;
  style?: {
    fontFamily?: string;
    fontWeight?: number;
    fontSize?: number;
    lineHeight?: number;
    letterSpacing?: number;
    textCase?: string;
    textDecoration?: string;
  };
}