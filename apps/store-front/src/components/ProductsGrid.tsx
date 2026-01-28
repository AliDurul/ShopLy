import { use } from 'react'
import ProductCard from './ProductCard';

export default function ProductsGrid({ productsPromise }: {
    productsPromise: Promise<{
        message: string;
        success: boolean;
        data: IProduct[];
    } | {
        success: boolean;
        error: string;
    }>;
}) {

    const response = use(productsPromise);
    const products = response.success && 'data' in response ? response.data : [];

    return (
        <>
            {/* Products Grid */}
            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No products match your filters.</p>
                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </>
    )
}
