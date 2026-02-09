export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'pick', name: 'Color Picking', icon: '🎨' },
  { id: 'convert', name: 'Color Conversion', icon: '🔄' },
  { id: 'generate', name: 'Palette & Generate', icon: '✨' },
  { id: 'check', name: 'Analysis', icon: '🔍' },
];

export const tools: Tool[] = [
  { name: 'Color Picker', slug: 'color-picker', description: 'Pick any color and get HEX, RGB, HSL values instantly.', icon: '🎯', category: 'pick' },
  { name: 'Image Color Extractor', slug: 'image-colors', description: 'Extract the dominant colors from any uploaded image.', icon: '🖼️', category: 'pick' },
  { name: 'Eyedropper Tool', slug: 'eyedropper', description: 'Pick colors from anywhere on your screen.', icon: '💉', category: 'pick' },
  { name: 'HEX to RGB', slug: 'hex-to-rgb', description: 'Convert HEX color codes to RGB values.', icon: '🔢', category: 'convert' },
  { name: 'RGB to HEX', slug: 'rgb-to-hex', description: 'Convert RGB values to HEX color codes.', icon: '#️⃣', category: 'convert' },
  { name: 'HSL Converter', slug: 'hsl-converter', description: 'Convert between HSL, HEX, and RGB color formats.', icon: '🌈', category: 'convert' },
  { name: 'Palette Generator', slug: 'palette-generator', description: 'Generate beautiful color palettes automatically.', icon: '🎨', category: 'generate' },
  { name: 'Gradient Generator', slug: 'gradient-generator', description: 'Create CSS gradients with a visual editor.', icon: '🌅', category: 'generate' },
  { name: 'Color Shades', slug: 'color-shades', description: 'Generate tints and shades of any color.', icon: '🎚️', category: 'generate' },
  { name: 'Random Color', slug: 'random-color', description: 'Generate random colors with various constraints.', icon: '🎲', category: 'generate' },
  { name: 'Contrast Checker', slug: 'contrast-checker', description: 'Check WCAG color contrast ratio for accessibility.', icon: '♿', category: 'check' },
  { name: 'Color Blindness Sim', slug: 'color-blind-sim', description: 'Simulate how colors appear to people with color blindness.', icon: '👁️', category: 'check' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
