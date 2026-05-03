'use client';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { Separator } from '@workspace/ui/components/separator';
import { Heart, Share2, Truck, Shield, RotateCw } from 'lucide-react';
import { useWishListActions, useIsWishList } from '@/store/wishListStore';
import AddCartBtn from './AddCartBtn';
import { Tooltip, TooltipContent, TooltipTrigger } from '@workspace/ui/components/tooltip';
import ProductVariantBtns from './ProductVariantBtns';

interface ProductInfoProps {
    product: IProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    // Hooks
    const { toggleWishList } = useWishListActions();
    const isWishListd = useIsWishList(product.id);

    // variables & states
    const discountPercent = Math.round(((product.price - (product?.discountPrice ?? product.price)) / product.price) * 100);



    // functions
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description || '',
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        }
    };

    return (
        <div className="space-y-5">
            {/* Brand & Title */}


            <div>
                <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    {Array.from({ length: product.ratings }).map((_, i) => (
                        <svg
                            key={i}
                            viewBox="0 0 24 24"
                            className="size-5 text-amber-400"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                d="m12 17.27l4.15 2.51q.675.41 1.413-.177t.547-1.423l-1.1-4.71l3.69-3.2q.725-.63.36-1.56t-1.32-.92l-4.85-.41l-1.89-4.31q-.38-.86-1.41-.86t-1.41.86L7.11 7.373l-4.85.41q-.95.08-1.316.923t.355 1.557l3.69 3.2l-1.1 4.71q-.2.95.538 1.535t1.423.065z"
                            />
                        </svg>
                    ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.ratings} out of 5</span>
                <span className="text-sm text-muted-foreground">({100} reviews)</span>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    {
                        product.isDiscounted
                            ? (<>
                                <span className="text-4xl font-bold text-primary">${product?.discountPrice?.toFixed(2)}</span>
                                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                                <Badge variant="destructive" className="text-base px-3 py-1">
                                    -{discountPercent}%
                                </Badge>
                            </>)
                            : <span className="text-4xl font-bold text-primary">${product?.price.toFixed(2)}</span>

                    }

                </div>
                <p className="text-sm text-green-600 font-medium">In Stock (24 items available)</p>
                {/* <p className="text-muted-foreground leading-relaxed">
                        {product.description ||
                            `Experience premium quality with our ${product.name}. high-quality materials ert or sophisticated elegance, this ${product.name} delivers on both fronts. Its timeless design ensures it remains a staple in your wardrobe for years to come.`}
                    </p> */}
            </div>

            <Separator className='mt-5' />

            <ProductVariantBtns product={product} />

            <Separator className='mt-5'/>

            {/* Action Buttons */}
            <div className="flex gap-3">

                <AddCartBtn product={product} variant={'default'} size={'lg'} />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-6"
                            onClick={() => toggleWishList(product)}
                        >
                            <Heart className={`size-5 ${isWishListd ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isWishListd ? 'Remove from WishLists' : 'Add to WishLists'}</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-6"
                            onClick={handleShare}
                        >
                            <Share2 className="size-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Share</p>
                    </TooltipContent>
                </Tooltip>

            </div>


            {/* Shipping & Returns Info */}
            <div className="flex justify-evenly flex-wrap bg-gray-50 pt-7 p-4 rounded-lg gap-5">
                <div className="flex gap-3">
                    <Truck className="size-5 text-primary shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-sm">Free Shipping</p>
                        <p className="text-xs text-muted-foreground">On orders over $50</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <RotateCw className="size-5 text-primary shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-sm">Easy Returns</p>
                        <p className="text-xs text-muted-foreground">30-day return policy</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Shield className="size-5 text-primary shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-sm">Secure Checkout</p>
                        <p className="text-xs text-muted-foreground">SSL encrypted payment</p>
                    </div>
                </div>
            </div>
        </div >
    );
}
