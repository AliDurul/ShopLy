'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    ShoppingBag,
    Heart,
    Tag,
    Truck,
    ShieldCheck,
    RotateCcw,
    X,
    ChevronRight,
    Star,
    Percent,
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Badge } from '@workspace/ui/components/badge';
import { Separator } from '@workspace/ui/components/separator';
import { Skeleton } from '@workspace/ui/components/skeleton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';
import { formatCurrency, slugify } from '@/lib/utils';
import {
    useCartActions,
    useCartHydrating,
    useCartItemCount,
    useCartItems,
    useCartSubtotal,
} from '@/store/cartStore';
import { useWishListActions, useIsWishList } from '@/store/wishListStore';

// Promo codes for demo
const VALID_PROMO_CODES: Record<string, { type: 'percent' | 'fixed'; value: number; minOrder?: number }> = {
    'SAVE10': { type: 'percent', value: 10 },
    'FLAT20': { type: 'fixed', value: 20, minOrder: 100 },
    'WELCOME15': { type: 'percent', value: 15, minOrder: 50 },
};

export default function CartPage() {
    const items = useCartItems();
    const isHydrating = useCartHydrating();
    const subtotal = useCartSubtotal();
    const itemCount = useCartItemCount();
    const { removeCart, updateCart, clearCarts, updateItemVariant } = useCartActions();
    const { addWishList } = useWishListActions();

    // Promo code state
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
    const [promoError, setPromoError] = useState('');

    // Calculations
    const shippingThreshold = 100;
    const freeShipping = subtotal >= shippingThreshold;
    const shippingCost = freeShipping ? 0 : 9.99;
    const taxRate = 0.08;
    const taxAmount = subtotal * taxRate;
    const discountAmount = appliedPromo?.discount || 0;
    const total = subtotal + shippingCost + taxAmount - discountAmount;

    const handleApplyPromo = () => {
        setPromoError('');
        const code = promoCode.toUpperCase().trim();
        const promo = VALID_PROMO_CODES[code];

        if (!promo) {
            setPromoError('Invalid promo code');
            return;
        }

        if (promo.minOrder && subtotal < promo.minOrder) {
            setPromoError(`Minimum order of ${formatCurrency(promo.minOrder)} required`);
            return;
        }

        const discount = promo.type === 'percent'
            ? (subtotal * promo.value) / 100
            : promo.value;

        setAppliedPromo({ code, discount });
        setPromoCode('');
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
        setPromoError('');
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeCart(productId);
        } else if (newQuantity <= 10) {
            updateCart(productId, newQuantity);
        }
    };

    const handleMoveToWishlist = (item: IProduct) => {
        addWishList(item);
        removeCart(item.id);
    };

    // Loading state
    if (isHydrating) {
        return (
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
                <Skeleton className="h-10 w-48 mb-8" />
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Card key={i} className="p-4">
                                <div className="flex gap-4">
                                    <Skeleton className="w-32 h-32 rounded-lg shrink-0" />
                                    <div className="flex-1 space-y-3">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div>
                        <Card className="p-6">
                            <Skeleton className="h-6 w-1/2 mb-4" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-12 w-full mt-4" />
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        );
    }

    // Empty cart state
    if (items.length === 0) {
        return (
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="rounded-full bg-muted p-8 mb-6">
                        <ShoppingCart className="size-16 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold mb-3">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8 max-w-md">
                        Looks like you haven&apos;t added anything to your cart yet.
                        Start shopping to fill it up!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg">
                            <Link href="/products">
                                <ShoppingBag className="size-5 mr-2" />
                                Start Shopping
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/my-wishlist">
                                <Heart className="size-5 mr-2" />
                                View Wishlist
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                        <ShoppingCart className="size-8 text-primary" />
                        Shopping Cart
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="size-4 mr-2" />
                            Clear Cart
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will remove all {itemCount} items from your cart.
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={clearCarts}
                                className="bg-destructive text-white hover:bg-destructive/90"
                            >
                                Clear Cart
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {/* Free Shipping Progress */}
            {!freeShipping && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-3">
                            <Truck className="size-5 text-primary shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    Add{' '}
                                    <span className="text-primary font-bold">
                                        {formatCurrency(shippingThreshold - subtotal)}
                                    </span>{' '}
                                    more to get <span className="text-primary font-bold">FREE shipping!</span>
                                </p>
                                <div className="w-full bg-primary/20 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((subtotal / shippingThreshold) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <CartItemCard
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={removeCart}
                            onMoveToWishlist={handleMoveToWishlist}
                            onUpdateVariant={updateItemVariant}
                        />
                    ))}

                    {/* Continue Shopping Link */}
                    <div className="pt-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-primary hover:underline font-medium"
                        >
                            <ArrowRight className="size-4 mr-2 rotate-180" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Promo Code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Tag className="size-4" />
                                        Promo Code
                                    </label>
                                    {appliedPromo ? (
                                        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <Percent className="size-4 text-green-600" />
                                                <span className="font-medium text-green-700">{appliedPromo.code}</span>
                                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                                    -{formatCurrency(appliedPromo.discount)}
                                                </Badge>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-6 text-green-600 hover:text-red-600"
                                                onClick={handleRemovePromo}
                                            >
                                                <X className="size-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Enter code"
                                                value={promoCode}
                                                onChange={(e) => {
                                                    setPromoCode(e.target.value);
                                                    setPromoError('');
                                                }}
                                                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                                                className="uppercase"
                                            />
                                            <Button variant="secondary" onClick={handleApplyPromo}>
                                                Apply
                                            </Button>
                                        </div>
                                    )}
                                    {promoError && (
                                        <p className="text-sm text-destructive">{promoError}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Try: SAVE10, FLAT20, WELCOME15
                                    </p>
                                </div>

                                <Separator />

                                {/* Price Breakdown */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Subtotal ({itemCount} items)
                                        </span>
                                        <span>{formatCurrency(subtotal)}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        {freeShipping ? (
                                            <span className="text-green-600 font-medium">FREE</span>
                                        ) : (
                                            <span>{formatCurrency(shippingCost)}</span>
                                        )}
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Estimated Tax (8%)
                                        </span>
                                        <span>{formatCurrency(taxAmount)}</span>
                                    </div>

                                    {appliedPromo && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount</span>
                                            <span>-{formatCurrency(discountAmount)}</span>
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">{formatCurrency(total)}</span>
                                </div>

                                {/* Checkout Button */}
                                <Button asChild className="w-full" size="lg">
                                    <Link href="/checkout">
                                        Proceed to Checkout
                                        <ChevronRight className="size-5 ml-2" />
                                    </Link>
                                </Button>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-2 pt-4">
                                    <div className="flex flex-col items-center text-center p-2">
                                        <ShieldCheck className="size-5 text-primary mb-1" />
                                        <span className="text-xs text-muted-foreground">Secure Checkout</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-2">
                                        <RotateCcw className="size-5 text-primary mb-1" />
                                        <span className="text-xs text-muted-foreground">30-Day Returns</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-2">
                                        <Truck className="size-5 text-primary mb-1" />
                                        <span className="text-xs text-muted-foreground">Fast Delivery</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Savings Summary */}
                        {(appliedPromo || freeShipping) && (
                            <Card className="bg-green-50 border-green-200">
                                <CardContent className="py-4">
                                    <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                                        <Tag className="size-4" />
                                        Your Savings
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        {freeShipping && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Free Shipping</span>
                                                <span>+{formatCurrency(9.99)}</span>
                                            </div>
                                        )}
                                        {appliedPromo && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Promo Code ({appliedPromo.code})</span>
                                                <span>+{formatCurrency(appliedPromo.discount)}</span>
                                            </div>
                                        )}
                                        <Separator className="my-2 bg-green-200" />
                                        <div className="flex justify-between font-bold text-green-700">
                                            <span>Total Saved</span>
                                            <span>
                                                {formatCurrency((freeShipping ? 9.99 : 0) + (appliedPromo?.discount || 0))}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

// Cart Item Card Component
interface CartItemCardProps {
    item: IProduct;
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
    onMoveToWishlist: (item: IProduct) => void;
    onUpdateVariant: (id: number, patch: Partial<Pick<IProduct, 'size' | 'color'>>) => void;
}

function CartItemCard({ item, onQuantityChange, onRemove, onMoveToWishlist, onUpdateVariant }: CartItemCardProps) {
    const isInWishlist = useIsWishList(item.id);

    const discountPercent = item.isDiscounted && item.discountPrice
        ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
        : 0;

    const itemTotal = (item.discountPrice || item.price) * item.quantity;

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow relative">
            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3 absolute top-2 right-2 z-10">
                {!isInWishlist && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary h-8 px-2"
                        onClick={() => onMoveToWishlist(item)}
                    >
                        <Heart className="size-4 mr-1" />
                        <span className="text-xs">Move to Wishlist</span>
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive h-8 px-2"
                    onClick={() => onRemove(item.id)}
                >
                    <Trash2 className="size-4 mr-1" />
                    <span className="text-xs">Remove</span>
                </Button>
            </div>
            <div className="flex flex-col sm:flex-row px-4 gap-4">
                {/* Product Image */}
                <Link
                    href={`/products/${item.slug || slugify(item.name)}`}
                    className="relative w-full sm:w-32 shrink-0 bg-muted rounded-lg overflow-hidden group"
                >
                    {item.images?.[0] ? (
                        <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            No Image
                        </div>
                    )}
                    {discountPercent > 0 && (
                        <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                            -{discountPercent}%
                        </Badge>
                    )}
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex-1">
                        {/* Brand */}
                        {item.brand && (
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                {item.brand}
                            </p>
                        )}

                        {/* Name */}
                        <Link href={`/products/${item.slug || slugify(item.name)}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                                {item.name}
                            </h3>
                        </Link>

                        {/* Rating */}
                        {item.ratings > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-3 ${i < item.ratings
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Variants */}
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            {item.availableSizes && item.availableSizes.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Size:</span>
                                    <Select
                                        value={item.size}
                                        onValueChange={(value) => onUpdateVariant(item.id, { size: value })}
                                    >
                                        <SelectTrigger className="h-8 w-20 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {item.availableSizes.map((size) => (
                                                <SelectItem key={size} value={size}>
                                                    {size}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            {item.availableColors && item.availableColors.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Color:</span>
                                    <Select
                                        value={item.color}
                                        onValueChange={(value) => onUpdateVariant(item.id, { color: value })}
                                    >
                                        <SelectTrigger className="h-8 w-24 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {item.availableColors.map((color) => (
                                                <SelectItem key={color} value={color}>
                                                    {color}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="font-bold text-primary">
                                {formatCurrency(item.discountPrice || item.price)}
                            </span>
                            {item.discountPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                    {formatCurrency(item.price)}
                                </span>
                            )}
                            <span className="text-xs text-muted-foreground">each</span>
                        </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Qty:</span>
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 rounded-r-none"
                                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                                >
                                    <Minus className="size-3" />
                                </Button>
                                <span className="w-10 text-center text-sm font-medium">
                                    {item.quantity}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 rounded-l-none"
                                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= 10}
                                >
                                    <Plus className="size-3" />
                                </Button>
                            </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Item Total</p>
                            <p className="font-bold text-lg">{formatCurrency(itemTotal)}</p>
                        </div>
                    </div>


                </div>
            </div>
        </Card>
    );
}
