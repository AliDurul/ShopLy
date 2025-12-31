// Base product - shared across all product types
interface IProduct1 {
    id: string;
    slug: string;
    name: string;
    description: string;
    brand: string;
    categoryId: string;
    category?: ICategory;
    
    // Base price (can be overridden by variants)
    basePrice: number;
    compareAtPrice?: number; // Original price for showing discounts
    
    // Product can have multiple variants
    variants: IProductVariant[];
    
    // Dynamic attributes based on product type
    attributes: IProductAttribute[];
    
    // Which attributes define variants (e.g., ["size", "color"])
    variantAttributes: string[];
    
    // Shared images (variants can have their own)
    images: IProductImage[];
    
    // SEO & Display
    metaTitle?: string;
    metaDescription?: string;
    tags: string[];
    
    // Status
    status: 'draft' | 'active' | 'archived';
    
    // Reviews summary (denormalized for performance)
    ratingsAverage: number;
    ratingsCount: number;
    
    createdAt: Date;
    updatedAt: Date;
}

// Each variant is a unique combination of attributes (e.g., Red + Large)
interface IProductVariant {
    id: string;
    productId: string;
    sku: string; // Unique identifier for inventory
    
    // The attribute values that define this variant
    // e.g., { color: "red", size: "L" }
    attributeValues: Record<string, string>;
    
    // Variant-specific pricing (optional, falls back to base)
    price?: number;
    compareAtPrice?: number;
    
    // Inventory
    stock: number;
    lowStockThreshold?: number;
    trackInventory: boolean;
    allowBackorder: boolean;
    
    // Variant-specific images
    images?: IProductImage[];
    
    // Physical properties (for shipping)
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    
    isDefault: boolean; // Show this variant by default
    isActive: boolean;
}

// Defines what attributes a product has
interface IProductAttribute {
    name: string;        // e.g., "color", "size", "material"
    displayName: string; // e.g., "Color", "Size", "Material"
    type: 'select' | 'color' | 'text' | 'number';
    values: IAttributeValue[];
    isVariantAttribute: boolean; // Does this create variants?
    isFilterable: boolean;       // Show in filters?
    isVisible: boolean;          // Show on product page?
}

interface IAttributeValue {
    value: string;       // e.g., "red", "xl"
    displayName: string; // e.g., "Red", "Extra Large"
    colorHex?: string;   // For color type: "#FF0000"
    imageUrl?: string;   // Optional swatch image
    sortOrder: number;
}

interface IProductImage {
    id: string;
    url: string;
    alt: string;
    sortOrder: number;
    // Link image to specific attribute value (e.g., show red images for red variant)
    attributeValue?: { name: string; value: string };
}

interface ICategory {
    id: string;
    slug: string;
    name: string;
    description?: string;
    image?: string;
    parentId?: string;
    children?: ICategory[];
    
    // Category-level attribute templates
    // When creating a product in this category, suggest these attributes
    attributeTemplates?: IProductAttribute[];
    
    sortOrder: number;
    isActive: boolean;
}