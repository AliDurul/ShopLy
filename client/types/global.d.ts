
interface IPageSearchParams { searchParams: Promise<{ [key: string]: string | undefined }> }

interface IPageParams { params: Promise<{ [key: string]: string }> }


interface IProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    isDiscounted: boolean;
    discountPrice?: number;
    images: string[];
    quantity: number;
    ratings: number;
    category?: string;
    size: string;
    color: string;
    brand: string;
    description: string;
    specifications?: Record<string, string>;
    availableSizes?: string[];
    availableColors?: string[];
} 