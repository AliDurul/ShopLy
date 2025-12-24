'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Share2, Truck, Shield, RotateCw } from 'lucide-react';
import { useCartActions } from '@/store/cartStore';
import { useUrlParams } from '@/hooks/useUrlParams';
import { Label } from './ui/label';

interface ProductInfoProps {
    product: any;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const { addItem } = useCartActions();
    const { getParam, updateUrlParams } = useUrlParams();
    const selectedSize = getParam('size', 'M') as string;
    const selectedColor = getParam('color', 'Black') as string;
    // const [selectedSize, setSelectedSize] = useState('M');
    // const [selectedColor, setSelectedColor] = useState('Black');

    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const discountPercent = Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
    );

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Black', 'White', 'Blue', 'Gray', 'Red', 'Navy'];

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.images[0],
            category: product.brand,
            size: selectedSize,
            color: selectedColor,
        });
    };

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
                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
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
                    <span className="text-4xl font-bold text-primary">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    <Badge variant="destructive" className="text-base px-3 py-1">
                        -{discountPercent}%
                    </Badge>
                </div>
                <p className="text-sm text-green-600 font-medium">In Stock (24 items available)</p>
                {/* <p className="text-muted-foreground leading-relaxed">
                    {product.description ||
                        `Experience premium quality with our ${product.name}. high-quality materials ert or sophisticated elegance, this ${product.name} delivers on both fronts. Its timeless design ensures it remains a staple in your wardrobe for years to come.`}
                </p> */}
            </div>

            <Separator />

            {/* Size Selector */}
            <div className='space-y-2'>
                <Label>Size: <span className="text-primary">{selectedSize}</span></Label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <Button
                            variant={'primary-outline'}
                            size={'sm'}
                            key={size}
                            onClick={() => updateUrlParams({ size })}
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
                <Label >Color: <span className="text-primary">{selectedColor}</span></Label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <Button
                            variant={'primary-outline'}
                            size={'sm'}
                            key={color}
                            onClick={() => updateUrlParams({ color })}
                            className={` ${selectedColor === color
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
            <div className="space-y-3">
                <label className="font-semibold text-sm">Quantity</label>
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
                <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                >
                    <svg viewBox="0 0 24 24" className="size-5 mr-2">
                        <path fill="currentColor" d="M7 22q-.825 0-1.413-.587T5 20q0-.825.588-1.413T7 18q.825 0 1.413.588T9 20q0 .825-.587 1.413T7 22Zm10 0q-.825 0-1.413-.587T15 20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.587 1.413T17 22ZM6.15 6l3.05 6h7.1l2.75-6H6.15Zm-1.6-2h15.5q.6 0 .912.488t.063.987l-3.85 8.4q-.25.55-.75.888T15.85 15H8.3l-1.1 2h11.8v2H7.1q-.725 0-1.113-.612T5.7 17.8l1.6-2.9L3 4H1V2h3q.375 0 .7.2t.45.55L6.5 6Z" />
                    </svg>
                    Add to Cart
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="px-6"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                >
                    <Heart
                        className={`size-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                    />
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="px-6"
                    onClick={handleShare}
                >
                    <Share2 className="size-5" />
                </Button>
            </div>

            <Separator />

            {/* Shipping & Returns Info */}
            <div className="flex justify-evenly flex-wrap bg-gray-50 p-4 rounded-lg">
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
        </div>
    );
}
