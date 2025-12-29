"use client"

import Image from "next/image";

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { FiShoppingCart } from "react-icons/fi"
import { Badge } from "./ui/badge"
import { useCartActions, useCartHydrating, useCartItems, useCartItemCount, useCartSubtotal } from "@/store/cartStore"
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";


export function Cart() {

    const items = useCartItems();
    const isHydrating = useCartHydrating();
    const { updateCart, removeCart } = useCartActions();
    const cartItemCount = useCartItemCount();
    const subtotal = useCartSubtotal();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='relative  '>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <FiShoppingCart size={22} className="text-gray-700 hover:text-secondary transition-colors cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Shopping Cart</p>
                        </TooltipContent>
                    </Tooltip>
                    {
                        isHydrating
                            ? <Skeleton className="bg-secondary absolute -top-2 -right-2 size-3 rounded-full px-1 font-mono " />
                            : cartItemCount > 0 && (
                                <Badge variant={'secondary'} className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                                    {cartItemCount}
                                </Badge>
                            )
                    }

                    {/* <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                        {cartItemCount}
                    </Badge> */}
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[360px] sm:w-[400px] p-0">
                <div className="w-full">
                    <SheetHeader className="p-6 border-b">
                        <SheetTitle>Cart Summary</SheetTitle>
                        <SheetDescription>Your selected items & quantity goals.</SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-350px)] px-6 py-4 ">
                        {isHydrating && (
                            <div className="space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <Skeleton className="size-16 rounded-md" />
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
                            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                        )}
                        {!isHydrating && items.length > 0 && (
                            <div className="space-y-5">
                                {items.map(item => (
                                    <div key={item.id} className="group border rounded-lg p-3 flex gap-4 items-start">
                                        <div className="relative size-20 h-24  shrink-0 rounded-md overflow-hidden bg-muted">
                                            {item.images ? (
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover object-top" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">No Image</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <p className="font-medium leading-tight truncate line-clamp-1">{item.name}</p>
                                                    {item.category && (
                                                        <p className="text-xs text-muted-foreground truncate">{item.category}</p>
                                                    )}
                                                </div>
                                                <Button variant="ghost" size="icon" className="size-7 hover:text-primary" onClick={() => removeCart(item.id)} aria-label="Remove item">
                                                    <Trash2 className="size-4 " />
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between pt-1">
                                                <p className="text-sm font-medium text-primary">
                                                    {formatCurrency(item.discountPrice ? item.discountPrice * item.quantity : item.price * item.quantity)}
                                                    {item.discountPrice && (
                                                        <span className="ml-2 text-xs text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                                                    )}
                                                </p>
                                                {(item.size || item.color) && (
                                                    <p className="text-xs text-muted-foreground">{item.size}{item.size && item.color ? ' / ' : ''}{item.color}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                {/* Size selector */}
                                                {/* {item.availableSizes && item.availableSizes.length > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        {item.availableSizes.map(sz => (
                                                            <Button
                                                                key={sz}
                                                                variant={sz === item.size ? "secondary" : "outline"}
                                                                size="sm"
                                                                className="h-7 px-2 text-xs"
                                                                onClick={() => updateVariant(item.id, { size: sz })}
                                                                aria-label={`Select size ${sz}`}
                                                            >
                                                                {sz}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                )} */}
                                                {/* Color selector */}
                                                {/* {item.availableColors && item.availableColors.length > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        {item.availableColors.map(col => (
                                                            <button
                                                                key={col}
                                                                onClick={() => updateVariant(item.id, { color: col })}
                                                                aria-label={`Select color ${col}`}
                                                                className={`size-6 rounded-full border flex items-center justify-center text-[10px] font-medium transition ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary ${col === item.color ? 'ring-2' : ''}`}
                                                                style={{ backgroundColor: mapColor(col) }}
                                                            >
                                                                {isNamedColor(mapColor(col)) ? '' : col[0]}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )} */}
                                                {/* Quantity */}
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="size-6"
                                                        onClick={() => updateCart(item.id, Math.max(1, item.quantity - 1))}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="size-3" />
                                                    </Button>
                                                    <span className="text-sm tabular-nums w-6 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="size-6"
                                                        onClick={() => updateCart(item.id, item.quantity + 1)}
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="size-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                    <Separator />
                    <div className="px-6 py-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Items</span>
                            <span className="text-sm font-semibold tabular-nums text-primary">{items.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Subtotal</span>
                            <span className="text-sm font-semibold tabular-nums text-primary">
                                {formatCurrency(subtotal)}
                            </span>
                        </div>

                        <p className="text-xs text-muted-foreground">Taxes & shipping calculated at checkout.</p>
                    </div>
                    <SheetFooter className="p-4 border-t flex gap-4">
                        <div className="flex gap-3 flex-wrap flex-1">
                            <Button className="flex-1 uppercase">Checkout</Button>
                            <Button variant={'secondary'} className="flex-1 uppercase">View Cart</Button>
                        </div>
                        <SheetClose asChild>
                            <Button variant="outline" className="flex-1">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}

// Helpers
function mapColor(col: string): string {
    const lower = col.toLowerCase();
    switch (lower) {
        case 'black': return '#000';
        case 'white': return '#fff';
        case 'blue': return '#2563eb';
        case 'red': return '#dc2626';
        case 'green': return '#16a34a';
        case 'gray': return '#6b7280';
        case 'yellow': return '#eab308';
        case 'purple': return '#7e22ce';
        case 'pink': return '#db2777';
        default: return col; // attempt direct CSS color
    }
}

function isNamedColor(val: string): boolean {
    return /^#/.test(val); // if hex we assume we don't need letter overlay
}
