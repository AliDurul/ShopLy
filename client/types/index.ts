export interface CartItem {
    id: number;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
    quantity: number;
    category?: string;
    size?: string;
    color?: string;
    availableSizes?: string[];
    availableColors?: string[];
}

// ------------------Products Interface------------------
export interface IFilterState {
    cat: string
    priceRange: [number, number]
    ratings: number[]
    subCat: string[]
    brands: string[]
    sizes: string[]
    colors: string[]
    materials: string[]
    fitTypes: string[]
    patterns: string[]
    lifestyle: string[]
    activityType: string[]
    freeShipping: boolean
}