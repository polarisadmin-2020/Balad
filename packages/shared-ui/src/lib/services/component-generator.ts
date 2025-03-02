import { FigmaConverter } from './figma-converter';
import { FigmaParser } from './figma-parser';
import { FigmaComponentSet } from '../../types/figma';
import fs from 'fs';
import path from 'path';

/**
 * Service to generate React components from Figma JSON
 */
export class ComponentGenerator {
  private readonly outputDir: string;
  private readonly componentsDir: string;

  constructor(outputDir: string = 'src/components') {
    this.outputDir = outputDir;
    this.componentsDir = path.join(process.cwd(), outputDir);
  }

  /**
   * Generate components from Figma JSON
   */
  async generateComponents(figmaJson: any): Promise<void> {
    try {
      // Parse and validate Figma JSON
      const componentSets = FigmaParser.parseJson(figmaJson);

      // Generate components for each valid component set
      for (const componentSet of componentSets) {
        if (FigmaParser.validateComponentSet(componentSet)) {
          await this.generateComponent(componentSet);
        }
      }
    } catch (error) {
      console.error('Error generating components:', error);
      throw error;
    }
  }

  /**
   * Generate a single component
   */
  private async generateComponent(componentSet: FigmaComponentSet): Promise<void> {
    try {
      // Convert component set to code
      const componentCode = FigmaConverter.convertComponentSet(componentSet);

      // Create component file name
      const componentName = this.formatComponentName(componentSet.name);
      const componentDir = path.join(this.componentsDir, componentName);
      
      // Ensure component directory exists
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }
      
      const filePath = path.join(componentDir, `${componentName}.tsx`);
      const indexPath = path.join(componentDir, 'index.ts');

      // Write component file
      fs.writeFileSync(filePath, componentCode, 'utf8');

      // Create index file for the component
      const indexContent = `export * from './${componentName}';\nexport { default } from './${componentName}';\n`;
      fs.writeFileSync(indexPath, indexContent, 'utf8');

      // Update main components index file
      this.updateMainIndex(componentName);

      console.log(`Generated component: ${componentName}`);
    } catch (error) {
      console.error(`Error generating component ${componentSet.name}:`, error);
      throw error;
    }
  }

  /**
   * Update the main components index file
   */
  private updateMainIndex(componentName: string): void {
    const mainIndexPath = path.join(this.componentsDir, 'index.ts');
    
    // Create main index file if it doesn't exist
    if (!fs.existsSync(mainIndexPath)) {
      fs.writeFileSync(mainIndexPath, '', 'utf8');
    }
    
    // Read current content
    let indexContent = fs.readFileSync(mainIndexPath, 'utf8');
    const exportStatement = `export * from './${componentName}';\n`;
    
    // Add export if it doesn't exist
    if (!indexContent.includes(exportStatement)) {
      indexContent += exportStatement;
      fs.writeFileSync(mainIndexPath, indexContent, 'utf8');
    }
  }

  /**
   * Format component name to PascalCase
   */
  private formatComponentName(name: string): string {
    // Remove any variant information from the name
    const baseName = name.includes('=') ? name.split('=')[0].split(',')[0].trim() : name;
    
    return baseName
      .split(/[^a-zA-Z0-9]/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  }
}