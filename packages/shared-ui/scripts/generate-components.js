const fs = require('fs');
const path = require('path');

// Import the component generator
const { ComponentGenerator } = require('../dist/lib/services');

async function generateAllComponents() {
  try {
    const exportsDir = path.join(process.cwd(), 'figma-exports');
    
    // Create figma-exports directory if it doesn't exist
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
      console.log('Created figma-exports directory');
    }
    
    // Check if there are any JSON files in the figma-exports directory
    const files = fs.readdirSync(exportsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
      console.log('No JSON files found in figma-exports directory. Please add Figma JSON exports to the figma-exports directory.');
      return;
    }
    
    // Create an instance of the component generator
    const generator = new ComponentGenerator();

    // Process each JSON file
    for (const file of jsonFiles) {
      console.log(`Processing ${file}...`);
      const filePath = path.join(exportsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      try {
        const figmaJson = JSON.parse(content);
        await generator.generateComponents(figmaJson);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }

    console.log('All components generated successfully!');
  } catch (error) {
    console.error('Error generating components:', error);
    process.exit(1);
  }
}

// Run the component generation
generateAllComponents();