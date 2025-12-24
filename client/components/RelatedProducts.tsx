
import ProductCard from '@/components/ProductCard';

interface RelatedProductsProps {
    category: string;
    excludeId: string;
}

// Mock related products - in real app, fetch based on category
const mockRelatedProducts = [
    {
        id: '1',
        name: 'Classic Crew Neck T-Shirt',
        brand: 'Nike',
        price: 45.99,
        discountPrice: 34.99,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'],
        ratings: 4,
    },
    {
        id: '2',
        name: 'Premium Cotton Polo',
        brand: 'Ralph Lauren',
        price: 65.99,
        discountPrice: 49.99,
        images: ['https://images.unsplash.com/photo-1627873649417-af36141a4016?w=500&h=500&fit=crop'],
        ratings: 5,
    },
    {
        id: '3',
        name: 'Urban Casual Tee',
        brand: 'Adidas',
        price: 38.99,
        discountPrice: 29.99,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'],
        ratings: 4,
    },
    {
        id: '4',
        name: 'Slim Fit T-Shirt',
        brand: 'Tommy Hilfiger',
        price: 55.99,
        discountPrice: 41.99,
        images: ['https://images.unsplash.com/photo-1516902899804-e6b359eaf0ee?w=500&h=500&fit=crop'],
        ratings: 5,
    },
    {
        id: '5',
        name: 'Comfort Fit Casual Tee',
        brand: 'Gap',
        price: 32.99,
        discountPrice: 24.99,
        images: ['https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=500&fit=crop'],
        ratings: 3,
    },
    {
        id: '6',
        name: 'Designer Graphic Tee',
        brand: 'Calvin Klein',
        price: 48.99,
        discountPrice: 36.99,
        images: ['https://images.unsplash.com/photo-1485527539061-baada4ca3e77?w=500&h=500&fit=crop'],
        ratings: 4,
    },
];

export default async function RelatedProducts({ category, excludeId }: RelatedProductsProps) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const related = mockRelatedProducts.filter((p) => p.id !== excludeId);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {related.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
