import { getData } from '@/actions/actionUtils';
import React from 'react'
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductDetails from '@/components/ProductDetails';
import CustomerReviews from '@/components/CustomerReviews';
import RelatedProducts from '@/components/RelatedProducts';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function ProductDetail({ params }: IPageParams) {
    'use cache';
    const { slug } = await params;

    const response = await getData(slug);
    const product: any = response.data;

    if (!response.success || !response.data) {
        return (
            <main className="max-w-7xl mx-auto p-5">
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/products" className="text-primary hover:underline">
                        Back to Products
                    </Link>
                </div>
            </main>
        )
    }

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
                <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                <ProductImageGallery images={product.images} productName={product.name} />

                <ProductInfo product={product} />
            </div>

            <ProductDetails product={product} />

            {/* <Separator className="mb-16" /> */}
            <Separator className='my-10 max-w-3/6 mx-auto bg-secondary' />

            <CustomerReviews product={product} />

            <Separator className='my-10 max-w-3/6 mx-auto bg-secondary' />

            <RelatedProducts category={product.brand} excludeId={product.id} />
        </main>
    )
}
