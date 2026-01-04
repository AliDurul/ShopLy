'use client';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import WishlistItemCard from '@/components/WishlistItemCard';
import { useWishListActions, useWishListHydrating, useWishListItems } from '@/store/wishListStore';

export default function WishListPage() {
    const items = useWishListItems();
    const isHydrating = useWishListHydrating();
    const { clearWishLists } = useWishListActions();
    
    return (
        <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Heart className="size-6 text-primary" />
                        My Wishlist
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {isHydrating ? '...' : `${items.length} item${items.length !== 1 ? 's' : ''} saved`}
                    </p>
                </div>
                {items.length > 0 && (
                    <Button
                        variant="primary-outline"
                        size="sm"
                        // className="text-destructive hover:bg-destructive hover:text-white"
                        onClick={clearWishLists}
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {/* Loading State */}
            {isHydrating && (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-4 p-4 border rounded-lg bg-white  ">
                            <Skeleton className="w-48 h-48 rounded-md shrink-0" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-6 w-1/4" />
                                <div className="flex gap-3 pt-4">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isHydrating && items.length === 0 && (
                <div className="flex flex-col items-center justify-center  text-center ">
                    <div className="rounded-full bg-muted p-6 mb-4">
                        <Heart className="size-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        Save items you love by clicking the heart icon on any product.
                    </p>
                    <Button asChild>
                        <Link href="/products">
                            <ShoppingBag className="size-4 mr-2" />
                            Start Shopping
                        </Link>
                    </Button>
                </div>
            )}

            {/* Wishlist Items */}
            {!isHydrating && items.length > 0 && (
                <div className="space-y-4">
                    {items.map((item) => (
                        <WishlistItemCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}
