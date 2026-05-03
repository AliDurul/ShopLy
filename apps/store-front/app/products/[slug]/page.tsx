import { getData } from '@/actions/actionUtils';
import { Suspense } from 'react'
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductDetails from '@/components/ProductDetails';
import CustomerReviews from '@/components/CustomerReviews';
import RelatedProducts from '@/components/RelatedProducts';
import { Separator } from '@workspace/ui/components/separator';
import Link from 'next/link';
import { ChevronRight, PackageX, ArrowLeft, Search } from 'lucide-react';
import { ProductSkeletonGrid } from '@/components/Skeletons';
import { NavigationContent } from '@/context/NavigationContext';
import { Button } from '@workspace/ui/components/button';

export default async function ProductDetail({ params }: IPageParams) {
    const { slug } = await params;

    const response = await getData(slug);

    if (!response?.success || !response?.data) {
        return (
            <main className="max-w-7xl mx-auto p-5 min-h-[50vh] flex items-center justify-center">
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-muted p-6">
                            <PackageX className="size-16 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Product Not Found</h1>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Sorry, the product you&apos;re looking for doesn&apos;t exist or may have been removed.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button asChild variant="default">
                            <Link href="/products">
                                <Search className="size-4 mr-2" />
                                Browse Products
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">
                                <ArrowLeft className="size-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        )
    }

    const product = response?.data

    return (
        <main className="container mx-auto px-5 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRight className="size-4 text-muted-foreground" />
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                    Products
                </Link>
                <ChevronRight className="size-4 text-muted-foreground" />
                <span className="text-foreground font-medium line-clamp-1">{product?.name}</span>
            </nav>

            {/* Wrap content you want to show loading for */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                <NavigationContent>
                    <ProductImageGallery images={product?.images} productName={product?.name} />
                </NavigationContent>
                <ProductInfo product={product} />
            </div>

            <ProductDetails product={product} />

            {/* <Separator className="mb-16" /> */}
            <Separator className='my-10 max-w-3/6 mx-auto bg-secondary' />

            <Suspense fallback={<div>Loading customer reviews...</div>}>
                <CustomerReviews product={product} />
            </Suspense>

            <Separator className='my-10 max-w-3/6 mx-auto bg-secondary' />

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Related Products</h2>
                    <p className="text-muted-foreground">You might also like these items</p>
                </div>

                {/* Products Grid */}
                <Suspense fallback={<ProductSkeletonGrid length={5} />}>
                    <RelatedProducts category={product.brand} excludeId={product.id} />
                </Suspense>
            </div>
        </main>
    )
}
