import { useCartActions, useCartProduct } from '@/store/cartStore';
import { useWishListActions } from '@/store/wishListStore';
import React from 'react'
import { Button } from '@workspace/ui/components/button';
import { Minus } from 'lucide-react';
import { LiaMinusCircleSolid } from 'react-icons/lia';
import { Tooltip, TooltipContent, TooltipTrigger } from '@workspace/ui/components/tooltip';

interface IAddCartBtnProps {
    product: IProduct,
    className?: string,
    variant?: "primary-outline" | "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined,
    showDelBtn?: boolean
}

export default function AddCartBtn({ product, className, size = 'sm', variant = 'primary-outline', showDelBtn = true }: IAddCartBtnProps) {
    const { addCart, updateCart, removeCart } = useCartActions();

    const cartP = useCartProduct(product.id);
    const isInCart = !!cartP
    return (
        <>
            {isInCart ? (
                <>
                    <Button
                        size={size}
                        variant={'ghost'}
                        className={`flex-1 hover:bg-primary/60 shadow-md shadow-primary/10  flex p-0 overflow-hidden  ${className ?? ''}`}
                    >
                        <div className="rounded-r-xl p-2 px-3  bg-primary/60 hover:bg-primary/80 h-full justify-center items-center flex cursor-pointer text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (cartP!.quantity === 1) {
                                    return
                                } else {
                                    updateCart(product.id, cartP!.quantity - 1);
                                }
                            }}
                            aria-label="Decrease quantity"
                        >
                            <svg viewBox="0 0 24 24" className="size-4">
                                <path fill="currentColor" d="M19 12.998H5v-2h14z" />
                            </svg>
                        </div>

                        <span className="text-lg font-semibold tabular-nums min-w-8 text-center flex-1">
                            {cartP!.quantity}
                        </span>

                        <div
                            className="rounded-l-xl px-3 bg-secondary/60 hover:bg-secondary/80 h-full justify-center items-center flex p-2 cursor-pointer text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                updateCart(product.id, cartP!.quantity + 1);
                            }}
                            aria-label="Increase quantity"
                        >
                            <svg viewBox="0 0 24 24" className="size-4">
                                <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                            </svg>
                        </div>

                    </Button>
                    {
                        showDelBtn && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className='hover:text-primary'
                                        size={size}
                                        onClick={(e) => { e.stopPropagation(); removeCart(product.id) }}
                                    >
                                        <LiaMinusCircleSolid className="size-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Remove from Cart</p>
                                </TooltipContent>
                            </Tooltip>
                        )
                    }

                </>
            ) : (
                <Button
                    variant={variant}
                    size={size}
                    className="flex-1 transition-all duration-700 hover:bg-primary/80 shadow-md shadow-primary/10 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        addCart(product);
                    }}
                >
                    <span className="inline-flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M7 22q-.825 0-1.413-.587T5 20q0-.825.588-1.413T7 18q.825 0 1.413.588T9 20q0 .825-.587 1.413T7 22Zm10 0q-.825 0-1.413-.587T15 20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.587 1.413T17 22ZM6.15 6l3.05 6h7.1l2.75-6H6.15Zm-1.6-2h15.5q.6 0 .912.488t.063.987l-3.85 8.4q-.25.55-.75.888T15.85 15H8.3l-1.1 2h11.8v2H7.1q-.725 0-1.113-.612T5.7 17.8l1.6-2.9L3 4H1V2h3q.375 0 .7.2t.45.55L6.5 6Z" /></svg>
                        ADD TO CART
                    </span>
                </Button>
            )}
        </>
    )
}
