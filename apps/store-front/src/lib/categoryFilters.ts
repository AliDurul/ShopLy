// Comprehensive filter options by category
export interface CategoryConfig {
  title: string
  subcategories: string[]
  brands: string[]
  priceRange: [number, number]
  sizes?: string[]
  colors?: string[]
  fitTypes?: string[]
  materials?: string[]
  patterns?: string[]
  lifestyle?: string[]
  activityType?: string[]
  warranty?: string[]
  connectivity?: string[]
  roomType?: string[]
}

export const categoryFilterOptions = {
  men: {
    title: "Men",
    subcategories: [
      "T-Shirts & Polos",
      "Shirts",
      "Jeans & Pants",
      "Jackets & Coats",
      "Suits & Blazers",
      "Shoes",
      "Accessories",
      "Sportswear"
    ],
    brands: [
      "Nike",
      "Adidas",
      "Puma",
      "Levi's",
      "Tommy Hilfiger",
      "Calvin Klein",
      "Ralph Lauren",
      "Hugo Boss"
    ],
    priceRange: [20, 500],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Blue", "Gray", "Navy", "Red", "Brown"],
    fitTypes: ["Slim Fit", "Regular Fit", "Relaxed Fit", "Skinny", "Oversized"],
    materials: ["Cotton", "Polyester", "Wool", "Denim", "Silk", "Linen"],
    patterns: ["Solid", "Striped", "Checkered", "Printed", "Patterned"],
    lifestyle: ["Casual", "Formal", "Sports", "Party", "Everyday"]
  },
  women: {
    title: "Women",
    subcategories: [
      "Dresses",
      "Tops & Blouses",
      "Jeans & Pants",
      "Skirts",
      "Jackets & Coats",
      "Shoes & Heels",
      "Bags & Handbags",
      "Jewelry"
    ],
    brands: [
      "Zara",
      "H&M",
      "Forever 21",
      "ASOS",
      "Gap",
      "Gucci",
      "Prada",
      "Coach"
    ],
    priceRange: [25, 600],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Pink", "Red", "Blue", "Purple", "Nude", "Burgundy"],
    fitTypes: ["Slim Fit", "Regular Fit", "Relaxed Fit", "Bodycon", "Oversized", "A-Line"],
    materials: ["Cotton", "Polyester", "Silk", "Wool", "Linen", "Chiffon"],
    patterns: ["Solid", "Striped", "Floral", "Printed", "Polka Dot", "Plaid"],
    lifestyle: ["Casual", "Formal", "Party", "Beach", "Everyday", "Office"]
  },
  kids: {
    title: "Kids",
    subcategories: [
      "Boys Clothing",
      "Girls Clothing",
      "Baby & Toddler",
      "Kids Shoes",
      "School Uniforms",
      "Kids Accessories"
    ],
    brands: [
      "Disney",
      "Carter's",
      "Nike",
      "Adidas",
      "H&M",
      "Gap Kids",
      "Gymboree",
      "OshKosh"
    ],
    priceRange: [15, 200],
    sizes: ["2T", "3T", "4T", "5T", "6", "8", "10", "12", "14", "16"],
    colors: ["Primary Colors", "Pastels", "Bright", "Neutral", "Character"],
    materials: ["Cotton", "Polyester", "Organic Cotton"],
    patterns: ["Character", "Cartoon", "Solid", "Striped"],
    lifestyle: ["School", "Play", "Party", "Everyday", "Comfort"]
  },
  electronics: {
    title: "Electronics",
    subcategories: [
      "Smartphones",
      "Laptops & Computers",
      "Tablets & iPads",
      "Audio & Headphones",
      "Cameras",
      "Smart Watches",
      "Gaming",
      "TV & Home Theater"
    ],
    brands: [
      "Apple",
      "Samsung",
      "Sony",
      "LG",
      "Microsoft",
      "Google",
      "Canon",
      "Nikon",
      "JBL",
      "Bose"
    ],
    priceRange: [50, 3000],
    colors: ["Black", "White", "Silver", "Gold", "Blue", "Red"],
    warranty: ["1 Year", "2 Years", "Extended"],
    connectivity: ["WiFi", "Bluetooth", "4G", "5G", "USB-C"]
  },
  'home-living': {
    title: "Home-Living",
    subcategories: [
      "Furniture",
      "Home Decor",
      "Bedding & Bath",
      "Kitchen & Dining",
      "Lighting",
      "Storage & Organization",
      "Garden & Outdoor"
    ],
    brands: [
      "IKEA",
      "West Elm",
      "Pottery Barn",
      "Wayfair",
      "Bed Bath & Beyond",
      "Target",
      "Crate and Barrel",
      "Restoration Hardware"
    ],
    priceRange: [20, 2000],
    colors: ["Black", "White", "Gray", "Brown", "Beige", "Cream", "Natural Wood"],
    materials: ["Wood", "Metal", "Fabric", "Glass", "Ceramic", "Leather"],
    lifestyle: ["Modern", "Minimalist", "Rustic", "Contemporary", "Vintage"],
    roomType: ["Bedroom", "Living Room", "Kitchen", "Bathroom", "Office", "Outdoor"]
  },
  'sports-outdoors': {
    title: "Sports-Outdoors",
    subcategories: [
      "Gym & Fitness",
      "Cycling",
      "Outdoor & Camping",
      "Running",
      "Swimming",
      "Team Sports"
    ],
    brands: [
      "Nike",
      "Adidas",
      "Under Armour",
      "The North Face",
      "Columbia",
      "Salomon",
      "Garmin",
      "GoPro"
    ],
    priceRange: [20, 1500],
    colors: ["Black", "White", "Gray", "Blue", "Red", "Green", "Yellow"],
    activityType: ["Gym", "Outdoor", "Water Sports", "Winter Sports", "Team Sports", "Running"],
    materials: ["Polyester", "Nylon", "Spandex", "Neoprene"],
    fitTypes: ["Slim", "Regular", "Relaxed", "Compression"],
    lifestyle: ["Performance", "Casual", "Professional", "Beginner-Friendly"]
  }
} satisfies Record<string, CategoryConfig>

export type CategoryKey = keyof typeof categoryFilterOptions

export function getCategoryConfig(category: string | null): CategoryConfig | null {
  if (!category) return null
  const key = category.toLowerCase() as CategoryKey
  return categoryFilterOptions[key] || null
}

export function getAllCategories() {
  return Object.values(categoryFilterOptions).map(cat => ({
    key: Object.keys(categoryFilterOptions).find(
      k => categoryFilterOptions[k as CategoryKey] === cat
    ),
    ...cat
  }))
}
