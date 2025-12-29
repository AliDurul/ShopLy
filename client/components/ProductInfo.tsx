'use client';
import React, { useState, useOptimistic } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Share2, Truck, Shield, RotateCw } from 'lucide-react';
import { useCartActions, useCartProduct } from '@/store/cartStore';
import { useUrlParams } from '@/hooks/useUrlParams';
import { Label } from './ui/label';
import { useFavoriteActions, useIsFavorite } from '@/store/favoriteStore';
import { NavigationContent, useNavigation } from '@/context/NavigationContext';
import AddCartBtn from './AddCartBtn';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface ProductInfoProps {
    product: IProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    // Hooks
    const { toggleFavorite } = useFavoriteActions();
    const { getParam, updateUrlParams } = useUrlParams();
    const { startTransition } = useNavigation();
    const isFavorited = useIsFavorite(product.id);

    // variables & states
    const discountPercent = Math.round(((product.price - (product?.discountPrice ?? product.price)) / product.price) * 100);

    // Get values from URL - shallow updates are instant, no loading
    const selectedSize = getParam('size', 'M') as string;
    const selectedColor = getParam('color', 'Black') as string;
    const [optimisticColor, setOptimisticColor] = useOptimistic(selectedColor)

    const [quantity, setQuantity] = useState(1);

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Black', 'White', 'Blue', 'Gray', 'Red', 'Navy'];

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

            <NavigationContent className='space-y-5'>

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
            </NavigationContent>

            <Separator className='mt-5 md:mt-0'/>

            {/* Size Selector */}
            <div className='space-y-2'>
                <Label>Size: <span className="text-primary">{selectedSize}</span></Label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <Button
                            variant={'primary-outline'}
                            size={'sm'}
                            key={size}
                            onClick={() => updateUrlParams({ size }, { shallow: true })}
                            className={` ${selectedSize === size
                                ? 'border-primary bg-primary text-white hover:bg-primary/90'
                                : 'border-gray-300 hover:border-primary hover:bg-transparent hover:text-primary text-foreground'
                                }`}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Color Selector */}
            <div className='space-y-2'>
                <Label >Color: <span className="text-primary">{optimisticColor}</span></Label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <Button
                            variant={'primary-outline'}
                            size={'sm'}
                            key={color}
                            // onClick={() => updateUrlParams({ color }, { shallow: true })}
                            onClick={() => {
                                startTransition(() => {
                                    setOptimisticColor(color);
                                    updateUrlParams({ color });
                                });
                            }}
                            className={` ${optimisticColor === color
                                ? 'border-primary bg-primary text-white hover:bg-primary/90'
                                : 'border-gray-300 hover:border-primary hover:bg-transparent hover:text-primary text-foreground'
                                }`}
                        >
                            {color}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
                <Label className="">Quantity</Label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                    <Button
                        variant={'ghost'}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className=" hover:bg-gray-100! rounded-none transition-colors"
                    >
                        −
                    </Button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 text-center border-none focus:outline-none"
                        min="1"
                    />
                    <Button
                        variant={'ghost'}
                        onClick={() => setQuantity(quantity + 1)}
                        className="hover:bg-gray-100! rounded-none transition-colors"
                    >
                        +
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-3">

                <AddCartBtn product={product} variant={'default'} size={'lg'} />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-6"
                            onClick={() => toggleFavorite(product)}
                        >
                            <Heart className={`size-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</p>
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

            <Separator />

            {/* Shipping & Returns Info */}
            <div className="flex justify-evenly flex-wrap bg-gray-50 p-4 rounded-lg gap-5">
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
