
import { getAllData } from '@/actions/actionUtils';
import ProductCard from '@/components/ProductCard';

interface RelatedProductsProps {
    category: string;
    excludeId: number;
}

export default async function RelatedProducts({ excludeId }: RelatedProductsProps) {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const res = await getAllData({ url: 'products-related/' + excludeId });

    if (!('data' in res) || !res.success || res.data.length === 0) {
        return <div className="text-red-500">Failed to load related products.</div>;
    }

    const related = res.data;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {related.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
