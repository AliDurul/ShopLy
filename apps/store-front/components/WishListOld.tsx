"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@workspace/ui/components/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { FiHeart } from "react-icons/fi"
import { Badge } from "@workspace/ui/components/badge"
import { useWishListActions, useWishListHydrating, useWishListItems, useWishListCount } from "@/store/wishListStore"
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Separator } from "@workspace/ui/components/separator";
import { X, ShoppingCart } from "lucide-react";
import { formatCurrency, slugify } from "@/lib/utils";
import { useCartActions } from "@/store/cartStore";


export function WishList() {

    const items = useWishListItems();
    const isHydrating = useWishListHydrating();
    const { removeWishList, clearWishLists } = useWishListActions();
    const favoriteCount = useWishListCount();
    const { addCart } = useCartActions();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='relative'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <FiHeart size={22} className="text-gray-700 hover:text-red-500 transition-colors cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>WishLists</p>
                        </TooltipContent>
                    </Tooltip>
                    {
                        isHydrating
                            ? <Skeleton className="bg-secondary absolute -top-2 -right-2 size-3 rounded-full px-1 font-mono " />
                            : favoriteCount > 0 && (
                                <Badge variant={'destructive'} className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                                    {favoriteCount}
                                </Badge>
                            )
                    }
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[360px] sm:w-[400px] p-0">
                <div className="w-full">
                    <SheetHeader className="p-6 border-b">
                        <SheetTitle>My WishLists</SheetTitle>
                        <SheetDescription>Your saved items & wishlist.</SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-250px)] px-6 py-4 ">
                        {isHydrating && (
                            <div className="space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <Skeleton className="size-20 rounded-md" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/5" />
                                            <Skeleton className="h-3 w-2/5" />
                                            <Skeleton className="h-3 w-1/5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!isHydrating && items.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <FiHeart size={48} className="text-gray-300 mb-3" />
                                <p className="text-sm text-muted-foreground">Your favorites list is empty.</p>
                                <p className="text-xs text-muted-foreground mt-1">Add items you love to save them for later!</p>
                            </div>
                        )}
                        {!isHydrating && items.length > 0 && (
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="group border rounded-lg p-3 flex gap-4 items-start hover:shadow-md transition-shadow">
                                        <Link href={`/products/${slugify(item.name)}`} className="relative size-20 shrink-0 rounded-md overflow-hidden bg-muted">
                                            {item.images ? (
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover object-top" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">No Image</div>
                                            )}
                                        </Link>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <Link href={`/products/${slugify(item.name)}`}>
                                                        <p className="font-medium leading-tight truncate line-clamp-1 hover:text-primary">{item.name}</p>
                                                    </Link>
                                                    {item.brand && (
                                                        <p className="text-xs text-muted-foreground truncate">{item.brand}</p>
                                                    )}
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="size-7 hover:text-destructive" 
                                                    onClick={() => removeWishList(item.id)} 
                                                    aria-label="Remove from favorites"
                                                >
                                                    <X className="size-4" />
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between pt-1">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-sm font-semibold text-primary">
                                                        {formatCurrency(item.discountPrice || item.price)}
                                                    </span>
                                                    {item.discountPrice && (
                                                        <span className="text-xs text-muted-foreground line-through">
                                                            {formatCurrency(item.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full mt-2 hover:bg-primary hover:text-white"
                                                onClick={() => addCart(item)}
                                            >
                                                <ShoppingCart className="size-4 mr-2" />
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                    <Separator />
                    <div className="px-6 py-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Total Items</span>
                            <span className="text-sm font-semibold tabular-nums text-primary">{items.length}</span>
                        </div>
                    </div>
                    <SheetFooter className="p-4 border-t flex gap-3">
                        {items.length > 0 && (
                            <Button 
                                variant="destructive" 
                                className="flex-1"
                                onClick={clearWishLists}
                            >
                                Clear All
                            </Button>
                        )}
                        <SheetClose asChild>
                            <Button variant="outline" className="flex-1">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}
