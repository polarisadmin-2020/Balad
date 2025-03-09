import { FigmaNode, FigmaComponent, FigmaComponentSet } from '../../types/figma';

/**
 * Service to parse and validate Figma JSON
 */
export class FigmaParser {
  /**
   * Parse Figma JSON and extract component sets
   */
  static parseJson(json: any): FigmaComponentSet[] {
    if (!json || typeof json !== 'object') {
      throw new Error('Invalid Figma JSON format');
    }

    return this.extractComponentSets(json);
  }

  /**
   * Extract component sets from Figma JSON
   */
  private static extractComponentSets(node: any): FigmaComponentSet[] {
    const componentSets: FigmaComponentSet[] = [];

    if (node.type === 'COMPONENT_SET') {
      componentSets.push(node as FigmaComponentSet);
    } else if (node.type === 'COMPONENT') {
      // Handle single component case (not in a set)
      const componentSet: FigmaComponentSet = {
        id: `set_${node.id || Math.random().toString(36).substring(2, 9)}`,
        name: node.name,
        type: 'COMPONENT_SET',
        children: [node as FigmaComponent]
      };
      componentSets.push(componentSet);
    } else if (node.name && typeof node.name === 'string') {
      // Try to create a component set from a generic node with a name
      const componentSet: FigmaComponentSet = {
        id: `set_${node.id || Math.random().toString(36).substring(2, 9)}`,
        name: node.name,
        type: 'COMPONENT_SET',
        children: Array.isArray(node.children) ? node.children.filter((child: any) => child.type === 'COMPONENT') : []
      };
      
      if (componentSet.children.length > 0) {
        componentSets.push(componentSet);
      }
    }

    // Recursively process children
    if (Array.isArray(node.children)) {
      node.children.forEach((child: any) => {
        componentSets.push(...this.extractComponentSets(child));
      });
    }

    return componentSets;
  }

  /**
   * Extract variants from component name
   * Format: "Property1=Value1, Property2=Value2"
   */
  static extractVariants(name: string): Record<string, string> {
    const variants: Record<string, string> = {};
    
    if (!name || !name.includes('=')) {
      return variants;
    }
    
    const parts = name.split(',');
    
    parts.forEach(part => {
      const [property, value] = part.trim().split('=');
      if (property && value) {
        variants[property.trim()] = value.trim();
      }
    });
    
    return variants;
  }

  /**
   * Validate component set structure
   */
  static validateComponentSet(componentSet: FigmaComponentSet): boolean {
    if (!componentSet.children?.length) {
      return false;
    }

    // For component sets, check if all children are components or have valid structure
    if (componentSet.type === 'COMPONENT_SET') {
      return componentSet.children.some(child => 
        child.type === 'COMPONENT' || 
        (child.name && typeof child.name === 'string')
      );
    }

    return true;
  }
}