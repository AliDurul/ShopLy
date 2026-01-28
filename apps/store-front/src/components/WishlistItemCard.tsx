'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, ShoppingCart, Check, Star } from 'lucide-react';
import { formatCurrency, slugify } from '@/lib/utils';
import { useWishListActions } from '@/store/wishListStore';
import { useCartActions, useCartProduct } from '@/store/cartStore';

interface WishlistItemCardProps {
    item: IProduct;
}

export default function WishlistItemCard({ item }: WishlistItemCardProps) {
    const { removeWishList } = useWishListActions();
    const { addCart } = useCartActions();
    const cartItem = useCartProduct(item.id);
    const isInCart = !!cartItem;

    const discountPercent = item.isDiscounted && item.discountPrice
        ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
        : 0;

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow p-4">
            <div className="flex flex-col sm:flex-row">
                {/* Product Image */}
                <Link
                    href={`/products/${item.slug || slugify(item.name)}`}
                    className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 bg-muted"
                >
                    {item.images?.[0] ? (
                        <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover object-top hover:scale-105 transition-all duration-300 rounded-2xl hover:rounded-3xl "
                            // sizes="(max-width: 640px) 100vw, 192px"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            No Image
                        </div>
                    )}
                    {discountPercent > 0 && (
                        <Badge variant="destructive" className="absolute top-2 left-2">
                            -{discountPercent}%
                        </Badge>
                    )}
                </Link>

                {/* Product Details */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                        {/* Brand */}
                        {item.brand && (
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                {item.brand}
                            </p>
                        )}

                        {/* Name */}
                        <Link href={`/products/${item.slug || slugify(item.name)}`}>
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                                {item.name}
                            </h3>
                        </Link>

                        {/* Rating */}
                        {item.ratings > 0 && (
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-4 ${i < item.ratings
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                                <span className="text-xs text-muted-foreground ml-1">
                                    ({item.ratings})
                                </span>
                            </div>
                        )}

                        {/* Size & Color */}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            {item.size && (
                                <span>Size: <span className="text-foreground font-medium">{item.size}</span></span>
                            )}
                            {item.color && (
                                <span>Color: <span className="text-foreground font-medium">{item.color}</span></span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 pt-1">
                            <span className="text-xl font-bold text-primary">
                                {formatCurrency(item.discountPrice || item.price)}
                            </span>
                            {item.discountPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                    {formatCurrency(item.price)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                        <Button
                            variant="outline"
                            className="flex-1"
                            asChild
                        >
                            <Link href={`/products/${item.slug || slugify(item.name)}`}>
                                View Details
                            </Link>
                        </Button>
                        {isInCart ? (
                            <Button
                                variant="secondary"
                                className="flex-1 gap-2"
                                disabled
                            >
                                <Check className="size-4" />
                                In Cart
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                className="flex-1 gap-2"
                                onClick={() => addCart(item)}
                            >
                                <ShoppingCart className="size-4" />
                                Add to Cart
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 hover:bg-destructive hover:text-primary hover:border-destructive"
                            onClick={() => removeWishList(item.id)}
                            aria-label="Remove from wishlist"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
