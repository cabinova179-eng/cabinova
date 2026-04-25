// src/data/products.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  imageFile: string;
  category: string;
  material: string;
  rating: number;
  reviews: number;
  description: string;
  dimensions: string;
  specs: Record<string, string>;
}

// Dynamic image loader: picks up all Kitchen*.png from src/assets/
const imageModules = import.meta.glob('/src/assets/Kitchen*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

function getImage(filename: string): string {
  const key = `/src/assets/${filename}`;
  if (imageModules[key]) return imageModules[key] as string;

  // STRICT FALLBACK: No AI/Unsplash images. If a specific size is missing, use a standard 600mm floor unit.
  const defaultKey = '/src/assets/Kitchen Floor 600 880 H x 560D.png';
  return (imageModules[defaultKey] as string) || '';
}

export const products: Product[] = [
  // ── Eye-Level Oven Units ──
  {
    id: 'elo-600', name: 'Eye-Level Oven Unit 600', price: 4299, category: 'Eye-Level Oven Units', material: 'Engineered Board',
    rating: 4.9, reviews: 34, dimensions: '2100H × 600W × 600D / 240H × 600W × 600D',
    imageFile: 'Kitchen Eye-level oven 600 2100H x 600W x 600D)AND ( 600 240H x 600W x 600D).png',
    image: getImage('Kitchen Eye-level oven 600 2100H x 600W x 600D)AND ( 600 240H x 600W x 600D).png'),
    description: 'Full-height eye-level oven housing with integrated upper storage. Designed for built-in 600mm ovens.',
    specs: { 'Height': '2100mm / 240mm', 'Width': '600mm', 'Depth': '600mm', 'Finish': 'Premium White' }
  },
  {
    id: 'elo-750', name: 'Eye-Level Oven Unit 750', price: 4899, category: 'Eye-Level Oven Units', material: 'Engineered Board',
    rating: 4.8, reviews: 28, dimensions: '2100H × 750W × 600D / 2460H × 750W × 600D',
    imageFile: 'Kitchen Eye-level oven 750 2100H X 750W x 600D and 750 2460H x 750W x 600D.png',
    image: getImage('Kitchen Eye-level oven 750 2100H X 750W x 600D and 750 2460H x 750W x 600D.png'),
    description: 'Extra-wide eye-level oven tower available in standard and tall configurations.',
    specs: { 'Height': '2100mm / 2460mm', 'Width': '750mm', 'Depth': '600mm', 'Finish': 'Premium White' }
  },

  // ── Floor Drawer Units ──
  {
    id: 'fd-1d-450', name: 'Single Drawer Floor Unit 450', price: 1199, category: 'Floor Drawer Units', material: 'Engineered Board',
    rating: 4.7, reviews: 62, dimensions: '880H × 450W × 560D',
    imageFile: 'Kitchen Floor 1 Drawer 450 880H x 560D.png',
    image: getImage('Kitchen Floor 1 Drawer 450 880H x 560D.png'),
    description: 'Compact single-drawer base unit with full-extension soft-close runners.',
    specs: { 'Height': '880mm', 'Width': '450mm', 'Depth': '560mm', 'Drawers': '1' }
  },
  {
    id: 'fd-2pd-600', name: 'Double Pot Drawer Unit 600', price: 1699, category: 'Floor Drawer Units', material: 'Engineered Board',
    rating: 4.8, reviews: 87, dimensions: '880H × 600W × 560D',
    imageFile: 'Kitchen Floor 2 Pot Drawer 600 880H x 560D.png',
    image: getImage('Kitchen Floor 2 Pot Drawer 600 880H x 560D.png'),
    description: 'Two deep pot drawers with heavy-duty soft-close runners for pots and pans.',
    specs: { 'Height': '880mm', 'Width': '600mm', 'Depth': '560mm', 'Drawers': '2 Pot' }
  },
  {
    id: 'fd-2pd-900', name: 'Double Pot Drawer Unit 900', price: 2099, category: 'Floor Drawer Units', material: 'Engineered Board',
    rating: 4.9, reviews: 45, dimensions: '880H × 900W × 560D',
    imageFile: 'Kitchen Floor 2 pot drawer 900 880H x 560D.png',
    image: getImage('Kitchen Floor 2 pot drawer 900 880H x 560D.png'),
    description: 'Extra-wide double pot drawer unit for maximum storage capacity.',
    specs: { 'Height': '880mm', 'Width': '900mm', 'Depth': '560mm', 'Drawers': '2 Pot' }
  },
  {
    id: 'fd-3dv-450', name: 'Three Drawer Veg Unit 450', price: 1549, category: 'Floor Drawer Units', material: 'Engineered Board',
    rating: 4.6, reviews: 53, dimensions: '880H × 450W × 560D',
    imageFile: 'Kitchen Floor 3 Drawer veg 450 880H x 560D.png',
    image: getImage('Kitchen Floor 3 Drawer veg 450 880H x 560D.png'),
    description: 'Three-drawer vegetable storage unit with ventilated lower drawer.',
    specs: { 'Height': '880mm', 'Width': '450mm', 'Depth': '560mm', 'Drawers': '3 (Veg)' }
  },
  {
    id: 'fd-3dw-450', name: 'Three Drawer Wicker Unit 450', price: 1649, category: 'Floor Drawer Units', material: 'Engineered Board',
    rating: 4.5, reviews: 39, dimensions: '880H × 450W × 560D',
    imageFile: 'Kitchen Floor 3 Drawer Wicker 450 880H x 560D.png',
    image: getImage('Kitchen Floor 3 Drawer Wicker 450 880H x 560D.png'),
    description: 'Three-drawer unit with wicker basket inserts for a warm, natural aesthetic.',
    specs: { 'Height': '880mm', 'Width': '450mm', 'Depth': '560mm', 'Drawers': '3 (Wicker)' }
  },
  {
    id: 'fd-4d-450', name: 'Four Drawer Unit 450/500', price: 1799, category: 'Floor Drawer Units', material: 'Engineered Board',
    rating: 4.7, reviews: 71, dimensions: '880H × 450/500W × 560D',
    imageFile: 'Kitchen Floor 4 Drawer 450 880H x 560D and 500 880H x 560D.png',
    image: getImage('Kitchen Floor 4 Drawer 450 880H x 560D and 500 880H x 560D.png'),
    description: 'Four-drawer base unit available in 450mm and 500mm widths with soft-close.',
    specs: { 'Height': '880mm', 'Width': '450/500mm', 'Depth': '560mm', 'Drawers': '4' }
  },

  // ── Standard Floor Units ──
  {
    id: 'sf-300', name: 'Floor Unit 300', price: 799, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.5, reviews: 91, dimensions: '880H × 300W × 560D',
    imageFile: 'Kitchen Floor 300 880H x 560D.png',
    image: getImage('Kitchen Floor 300 880H x 560D.png'),
    description: 'Narrow single-door floor unit. Ideal for tight spaces.',
    specs: { 'Height': '880mm', 'Width': '300mm', 'Depth': '560mm', 'Doors': '1' }
  },
  {
    id: 'sf-400', name: 'Floor Unit 400', price: 899, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.6, reviews: 78, dimensions: '880H × 400W × 560D',
    imageFile: 'Kitchen Floor 400 880H X 560D.png',
    image: getImage('Kitchen Floor 400 880H X 560D.png'),
    description: 'Single-door floor cabinet with internal shelf.',
    specs: { 'Height': '880mm', 'Width': '400mm', 'Depth': '560mm', 'Doors': '1' }
  },
  {
    id: 'sf-450', name: 'Floor Unit 450', price: 949, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.6, reviews: 84, dimensions: '880H × 450W × 560D',
    imageFile: 'Kitchen Floor 450 880 H x 560D.png',
    image: getImage('Kitchen Floor 450 880 H x 560D.png'),
    description: 'Mid-width single-door floor unit with adjustable shelf.',
    specs: { 'Height': '880mm', 'Width': '450mm', 'Depth': '560mm', 'Doors': '1' }
  },
  {
    id: 'sf-500', name: 'Floor Unit 500', price: 999, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.7, reviews: 66, dimensions: '880H × 500W × 560D',
    imageFile: 'Kitchen Floor 500 880H x 560D.png',
    image: getImage('Kitchen Floor 500 880H x 560D.png'),
    description: 'Single-door floor cabinet with adjustable internal shelving.',
    specs: { 'Height': '880mm', 'Width': '500mm', 'Depth': '560mm', 'Doors': '1' }
  },
  {
    id: 'sf-600', name: 'Floor Unit 600', price: 1099, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.8, reviews: 112, dimensions: '880H × 600W × 560D',
    imageFile: 'Kitchen Floor 600 880 H x 560D.png',
    image: getImage('Kitchen Floor 600 880 H x 560D.png'),
    description: 'Standard double-door floor unit — the most popular base cabinet.',
    specs: { 'Height': '880mm', 'Width': '600mm', 'Depth': '560mm', 'Doors': '2' }
  },
  {
    id: 'sf-800', name: 'Floor Unit 800', price: 1299, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.7, reviews: 58, dimensions: '880H × 800W × 560D',
    imageFile: 'Kitchen Floor 900 880H x 560D.png', // Mapped to 900mm to avoid AI image
    image: getImage('Kitchen Floor 900 880H x 560D.png'),
    description: 'Wide double-door floor cabinet with centre divider and adjustable shelves.',
    specs: { 'Height': '880mm', 'Width': '800mm', 'Depth': '560mm', 'Doors': '2' }
  },
  {
    id: 'sf-900', name: 'Floor Unit 900', price: 1399, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.8, reviews: 47, dimensions: '880H × 900W × 560D',
    imageFile: 'Kitchen Floor 900 880H x 560D.png',
    image: getImage('Kitchen Floor 900 880H x 560D.png'),
    description: 'Extra-wide double-door base unit. Ideal below a 900mm hob.',
    specs: { 'Height': '880mm', 'Width': '900mm', 'Depth': '560mm', 'Doors': '2' }
  },
  {
    id: 'sf-1000', name: 'Floor Unit 1000', price: 1499, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.7, reviews: 33, dimensions: '880H × 1000W × 560D',
    imageFile: 'Kitchen Floor 1000 880H X 560D.png',
    image: getImage('Kitchen Floor 1000 880H X 560D.png'),
    description: 'Large double-door floor unit for substantial storage.',
    specs: { 'Height': '880mm', 'Width': '1000mm', 'Depth': '560mm', 'Doors': '2' }
  },
  {
    id: 'sf-1200', name: 'Floor Unit 1200', price: 1699, category: 'Standard Floor Units', material: 'Engineered Board',
    rating: 4.8, reviews: 26, dimensions: '880H × 1200W × 560D',
    imageFile: 'Kitchen Floor 1200 880H X 560D.png',
    image: getImage('Kitchen Floor 1200 880H X 560D.png'),
    description: 'Our widest standard floor unit with ample interior space.',
    specs: { 'Height': '880mm', 'Width': '1200mm', 'Depth': '560mm', 'Doors': '2' }
  },

  // ── Special Floor Units ──
  {
    id: 'sf-corner', name: 'Corner Floor Unit', price: 1899, category: 'Special Floor Units', material: 'Engineered Board',
    rating: 4.8, reviews: 44, dimensions: '880H × 900W × 560D',
    imageFile: 'Kitchen Floor corner 900 x 900 880H x 560D.png',
    image: getImage('Kitchen Floor corner 900 x 900 880H x 560D.png'),
    description: 'L-shaped corner base unit that maximises corner space with rotating carousel.',
    specs: { 'Height': '880mm', 'Width': '900mm', 'Depth': '560mm', 'Type': 'Corner' }
  },
  {
    id: 'sf-pantry-corner', name: 'Pantry Corner Floor Unit', price: 2199, category: 'Special Floor Units', material: 'Engineered Board',
    rating: 4.9, reviews: 31, dimensions: '880H × 900W × 560D',
    imageFile: 'Kitchen Floor pantry corner 2100H x 1034W x 600D and 2460H X 1034W X 600D.png',
    image: getImage('Kitchen Floor pantry corner 2100H x 1034W x 600D and 2460H X 1034W X 600D.png'),
    description: 'Deep corner pantry unit with pull-out shelving for easy access.',
    specs: { 'Height': '880mm', 'Width': '900mm', 'Depth': '560mm', 'Type': 'Pantry Corner' }
  },
  {
    id: 'sf-end-display', name: 'End Display Floor Unit', price: 999, category: 'Special Floor Units', material: 'Engineered Board',
    rating: 4.5, reviews: 37, dimensions: '720H × 300W × 560D',
    imageFile: 'Kitchen Floor End Display 300 720H X 560D.png',
    image: getImage('Kitchen Floor End Display 300 720H X 560D.png'),
    description: 'Open-shelf end display unit for a decorative finishing touch.',
    specs: { 'Height': '720mm', 'Width': '300mm', 'Depth': '560mm', 'Type': 'End Display' }
  },

  // ── Grocery Units ──
  {
    id: 'gu-600', name: 'Grocery Unit 600', price: 3499, category: 'Grocery Units', material: 'Engineered Board',
    rating: 4.9, reviews: 52, dimensions: '2100H × 600W × 600D',
    imageFile: 'Kitchen Grocery 600 2100H x 600D AND 600 2460H X 600D.png',
    image: getImage('Kitchen Grocery 600 2100H x 600D AND 600 2460H X 600D.png'),
    description: 'Full-height grocery pantry with multiple adjustable shelves.',
    specs: { 'Height': '2100mm', 'Width': '600mm', 'Depth': '600mm', 'Type': 'Grocery Pantry' }
  },
  {
    id: 'gu-900', name: 'Grocery Unit 900', price: 4199, category: 'Grocery Units', material: 'Engineered Board',
    rating: 4.9, reviews: 38, dimensions: '2100H × 900W × 600D',
    imageFile: 'Kitchen Grocery 900 2100H x 600D AND 900 2460H X 600D.png',
    image: getImage('Kitchen Grocery 900 2100H x 600D AND 900 2460H X 600D.png'),
    description: 'Extra-wide grocery pantry tower with double doors and six adjustable shelves.',
    specs: { 'Height': '2100mm', 'Width': '900mm', 'Depth': '600mm', 'Type': 'Grocery Pantry' }
  },

  // ── Microwave Unit ──
  {
    id: 'mw-600', name: 'Microwave Unit 600/750', price: 1299, category: 'Microwave Units', material: 'Engineered Board',
    rating: 4.7, reviews: 63, dimensions: '440H × 600/750W × 540D',
    imageFile: 'Kitchen Microwave (600 440H x 600W x 540D) and 750 440H x 750W x 540D.png',
    image: getImage('Kitchen Microwave (600 440H x 600W x 540D) and 750 440H x 750W x 540D.png'),
    description: 'Purpose-built microwave housing available in 600mm and 750mm widths.',
    specs: { 'Height': '440mm', 'Width': '600/750mm', 'Depth': '540mm', 'Type': 'Microwave' }
  },

  // ── Standard Wall Units ──
  {
    id: 'wu-300', name: 'Wall Unit 300', price: 549, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.5, reviews: 88, dimensions: '720H × 300W × 300D',
    imageFile: 'Kitchen wall 300 720H x 300D.png',
    image: getImage('Kitchen wall 300 720H x 300D.png'),
    description: 'Slim single-door wall cabinet for spice storage or narrow spaces.',
    specs: { 'Height': '720mm', 'Width': '300mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'wu-400', name: 'Wall Unit 400', price: 599, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.6, reviews: 74, dimensions: '720H × 400W × 300D',
    imageFile: 'Kitchen Wall 400 720H x 300D.png',
    image: getImage('Kitchen Wall 400 720H x 300D.png'),
    description: 'Single-door wall cabinet with two adjustable shelves.',
    specs: { 'Height': '720mm', 'Width': '400mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'wu-450', name: 'Wall Unit 450', price: 649, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.6, reviews: 67, dimensions: '720H × 450W × 300D',
    imageFile: 'Kitchen Wall 450 720H x 300D.png',
    image: getImage('Kitchen Wall 450 720H x 300D.png'),
    description: 'Mid-size wall unit with great balance of space and proportion.',
    specs: { 'Height': '720mm', 'Width': '450mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'wu-500', name: 'Wall Unit 500', price: 699, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 59, dimensions: '720H × 500W × 300D',
    imageFile: 'Kitchen Wall 500 720H x 300D.png',
    image: getImage('Kitchen Wall 500 720H x 300D.png'),
    description: 'Single-door wall cabinet ideal for glasses, mugs, and small appliances.',
    specs: { 'Height': '720mm', 'Width': '500mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'wu-600', name: 'Wall Unit 600', price: 799, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.8, reviews: 103, dimensions: '720H × 600W × 300D',
    imageFile: 'Kitchen Wall 600 720H x 300D.png',
    image: getImage('Kitchen Wall 600 720H x 300D.png'),
    description: 'The most popular wall cabinet — double-door with adjustable shelving.',
    specs: { 'Height': '720mm', 'Width': '600mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'wu-800', name: 'Wall Unit 800', price: 949, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 51, dimensions: '720H × 800W × 300D',
    imageFile: 'Kitchen Wall 600 720H x 300D.png', // Mapped to 600mm to avoid AI Image
    image: getImage('Kitchen Wall 600 720H x 300D.png'),
    description: 'Wide double-door wall cabinet with two adjustable shelves.',
    specs: { 'Height': '720mm', 'Width': '800mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'wu-900', name: 'Wall Unit 900', price: 1049, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.8, reviews: 43, dimensions: '720H × 900W × 300D',
    imageFile: 'Kitchen Wall 900 1080H x 300D and 1000 1080H x 300D.png', // Mapped to 1080H image to avoid AI
    image: getImage('Kitchen Wall 900 1080H x 300D and 1000 1080H x 300D.png'),
    description: 'Extra-wide wall unit perfect above a 900mm hob.',
    specs: { 'Height': '720mm', 'Width': '900mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'wu-1000', name: 'Wall Unit 1000', price: 1149, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 29, dimensions: '720H × 1000W × 300D',
    imageFile: 'Kitchen Wall 900 1080H x 300D and 1000 1080H x 300D.png', // Mapped to 1080H image to avoid AI
    image: getImage('Kitchen Wall 900 1080H x 300D and 1000 1080H x 300D.png'),
    description: 'Large double-door wall cabinet for substantial overhead storage.',
    specs: { 'Height': '720mm', 'Width': '1000mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'wu-1200', name: 'Wall Unit 1200', price: 1299, category: 'Standard Wall Units', material: 'Engineered Board',
    rating: 4.8, reviews: 22, dimensions: '720H × 1200W × 300D',
    imageFile: 'Kitchen Wall 1200 720H x 300D.png',
    image: getImage('Kitchen Wall 1200 720H x 300D.png'),
    description: 'Our widest standard wall unit with three adjustable shelves.',
    specs: { 'Height': '720mm', 'Width': '1200mm', 'Depth': '300mm', 'Doors': '2' }
  },

  // ── Special Wall Units ──
  {
    id: 'wu-corner', name: 'Corner Wall Unit', price: 1199, category: 'Special Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 36, dimensions: '720H × 600W × 300D',
    imageFile: 'Kitchen Wall Corner 600 720H x 600W x 300D.png',
    image: getImage('Kitchen Wall Corner 600 720H x 600W x 300D.png'),
    description: 'L-shaped corner wall unit with bi-fold door for easy access.',
    specs: { 'Height': '720mm', 'Width': '600mm', 'Depth': '300mm', 'Type': 'Corner' }
  },
  {
    id: 'wu-end-display', name: 'End Display Wall Unit', price: 649, category: 'Special Wall Units', material: 'Engineered Board',
    rating: 4.5, reviews: 42, dimensions: '720H × 300W × 300D',
    imageFile: 'Kitchen Wall End Display 720H x 300W x 300D.png',
    image: getImage('Kitchen Wall End Display 720H x 300W x 300D.png'),
    description: 'Open-shelf end unit for decorative display.',
    specs: { 'Height': '720mm', 'Width': '300mm', 'Depth': '300mm', 'Type': 'End Display' }
  },
  {
    id: 'wu-flap-600', name: 'Flap Wall Unit 600', price: 899, category: 'Special Wall Units', material: 'Engineered Board',
    rating: 4.6, reviews: 48, dimensions: '360H × 600W × 300D',
    imageFile: 'Kitchen Wall Flap 600 360H x 600W x 300D.png',
    image: getImage('Kitchen Wall Flap 600 360H x 600W x 300D.png'),
    description: 'Wall unit with flip-up door and gas strut for smooth operation.',
    specs: { 'Height': '360mm', 'Width': '600mm', 'Depth': '300mm', 'Type': 'Flap' }
  },
  {
    id: 'wu-flap-900', name: 'Flap Wall Unit 900', price: 1099, category: 'Special Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 35, dimensions: '360H × 900W × 300D',
    imageFile: 'Kitchen Wall Flap 900 360H x 900W x 300D.png',
    image: getImage('Kitchen Wall Flap 900 360H x 900W x 300D.png'),
    description: 'Wide flap-front wall cabinet with dual gas struts.',
    specs: { 'Height': '360mm', 'Width': '900mm', 'Depth': '300mm', 'Type': 'Flap' }
  },

  // ── High Wall Units (1080H) ──
  {
    id: 'hwu-300', name: 'High Wall Unit 300', price: 749, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.6, reviews: 55, dimensions: '1080H × 300W × 300D',
    imageFile: 'Kitchen Wall High 300 1080H x 300D.png',
    image: getImage('Kitchen Wall High 300 1080H x 300D.png'),
    description: 'Tall narrow wall unit for maximum vertical storage.',
    specs: { 'Height': '1080mm', 'Width': '300mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'hwu-400', name: 'High Wall Unit 400', price: 799, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.6, reviews: 47, dimensions: '1080H × 400W × 300D',
    imageFile: 'Kitchen Wall High 400 1080H x 300D.png',
    image: getImage('Kitchen Wall High 400 1080H x 300D.png'),
    description: 'Tall single-door wall unit with three adjustable shelves.',
    specs: { 'Height': '1080mm', 'Width': '400mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'hwu-450', name: 'High Wall Unit 450', price: 849, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 41, dimensions: '1080H × 450W × 300D',
    imageFile: 'Kitchen Wall High 450 1080H x 300D.png',
    image: getImage('Kitchen Wall High 450 1080H x 300D.png'),
    description: 'Tall wall cabinet in a versatile 450mm width.',
    specs: { 'Height': '1080mm', 'Width': '450mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'hwu-500', name: 'High Wall Unit 500', price: 899, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 38, dimensions: '1080H × 500W × 300D',
    imageFile: 'Kitchen Wall High 500 1080H x 300D.png',
    image: getImage('Kitchen Wall High 500 1080H x 300D.png'),
    description: 'Extended-height wall unit with three adjustable shelves.',
    specs: { 'Height': '1080mm', 'Width': '500mm', 'Depth': '300mm', 'Doors': '1' }
  },
  {
    id: 'hwu-600', name: 'High Wall Unit 600', price: 999, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.8, reviews: 64, dimensions: '1080H × 600W × 300D',
    imageFile: 'Kitchen Wall High 600 1080H x 300D.png',
    image: getImage('Kitchen Wall High 600 1080H x 300D.png'),
    description: 'Tall double-door wall unit — the most popular high wall cabinet.',
    specs: { 'Height': '1080mm', 'Width': '600mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'hwu-800', name: 'High Wall Unit 800', price: 1199, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 32, dimensions: '1080H × 800W × 300D',
    imageFile: 'Kitchen Wall High 600 1080H x 300D.png', // Mapped to 600mm to avoid AI Image
    image: getImage('Kitchen Wall High 600 1080H x 300D.png'),
    description: 'Wide tall wall cabinet with double doors and three adjustable shelves.',
    specs: { 'Height': '1080mm', 'Width': '800mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'hwu-900', name: 'High Wall Unit 900', price: 1299, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.8, reviews: 27, dimensions: '1080H × 900W × 300D',
    imageFile: 'Kitchen Wall High 900 1080H x 300D and 1000 1080H x 300D.png',
    image: getImage('Kitchen Wall High 900 1080H x 300D and 1000 1080H x 300D.png'),
    description: 'Extra-wide tall wall unit. Pairs perfectly above a 900mm hob.',
    specs: { 'Height': '1080mm', 'Width': '900mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'hwu-1000', name: 'High Wall Unit 1000', price: 1399, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 21, dimensions: '1080H × 1000W × 300D',
    imageFile: 'Kitchen Wall High 900 1080H x 300D and 1000 1080H x 300D.png',
    image: getImage('Kitchen Wall High 900 1080H x 300D and 1000 1080H x 300D.png'),
    description: 'Large tall wall unit with maximum overhead storage.',
    specs: { 'Height': '1080mm', 'Width': '1000mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'hwu-1200', name: 'High Wall Unit 1200', price: 1599, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.8, reviews: 18, dimensions: '1080H × 1200W × 300D',
    imageFile: 'Kitchen Wall High 1200 1080H x 300D.png',
    image: getImage('Kitchen Wall High 1200 1080H x 300D.png'),
    description: 'Our widest tall wall unit with four adjustable shelves.',
    specs: { 'Height': '1080mm', 'Width': '1200mm', 'Depth': '300mm', 'Doors': '2' }
  },
  {
    id: 'hwu-corner', name: 'High Corner Wall Unit', price: 1499, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.7, reviews: 24, dimensions: '1080H × 600W × 300D',
    imageFile: 'Kitchen Wall High Corner 1080H x 600w x 300D.png',
    image: getImage('Kitchen Wall High Corner 1080H x 600w x 300D.png'),
    description: 'Tall corner wall unit with bi-fold door access.',
    specs: { 'Height': '1080mm', 'Width': '600mm', 'Depth': '300mm', 'Type': 'Corner' }
  },
  {
    id: 'hwu-end-display', name: 'High End Display Wall Unit', price: 849, category: 'High Wall Units', material: 'Engineered Board',
    rating: 4.5, reviews: 30, dimensions: '1080H × 300W × 300D',
    imageFile: 'Kitchen Wall High End Display 1080H x 300w x 300D.png',
    image: getImage('Kitchen Wall High End Display 1080H x 300w x 300D.png'),
    description: 'Tall open-shelf end display unit for showcasing items.',
    specs: { 'Height': '1080mm', 'Width': '300mm', 'Depth': '300mm', 'Type': 'End Display' }
  },
];

export const categories = [
  { name: 'Standard Floor Units', description: 'The foundation of every great kitchen. Durable base cabinets from 300mm to 1200mm wide.', image: getImage('Kitchen Floor 600 880 H x 560D.png') },
  { name: 'Floor Drawer Units', description: 'Deep pot drawers, veg drawers, and multi-drawer units for organised storage.', image: getImage('Kitchen Floor 4 Drawer 450 880H x 560D and 500 880H x 560D.png') },
  { name: 'Standard Wall Units', description: 'Overhead cabinets in various widths to match your kitchen layout.', image: getImage('Kitchen Wall 600 720H x 300D.png') },
  { name: 'High Wall Units', description: 'Extended-height wall cabinets (1080mm) for maximum vertical storage.', image: getImage('Kitchen Wall High 600 1080H x 300D.png') },
  { name: 'Special Floor Units', description: 'Corner units, pantry corners, and end displays for custom configurations.', image: getImage('Kitchen Floor corner 900 x 900 880H x 560D.png') },
  { name: 'Special Wall Units', description: 'Corner, flap, and display wall units for unique kitchen spaces.', image: getImage('Kitchen Wall Flap 600 360H x 600W x 300D.png') },
  { name: 'Eye-Level Oven Units', description: 'Full-height oven towers designed for built-in appliances.', image: getImage('Kitchen Eye-level oven 600 2100H x 600W x 600D)AND ( 600 240H x 600W x 600D).png') },
  { name: 'Grocery Units', description: 'Full-height pantry cabinets for all your dry goods and grocery storage.', image: getImage('Kitchen Grocery 600 2100H x 600D AND 600 2460H X 600D.png') },
  { name: 'Microwave Units', description: 'Purpose-built microwave housing to keep countertops clear.', image: getImage('Kitchen Microwave (600 440H x 600W x 540D) and 750 440H x 750W x 540D.png') },
];