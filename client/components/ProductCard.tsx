'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { LuExpand, LuHeart } from "react-icons/lu"
import Image from "next/image"
import { useCartActions, useCartItems } from "@/store/cartStore"
import { useFavoriteActions, useFavoriteItems } from "@/store/favoriteStore"
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";


export default function ProductCard({ product }: { product: any }) {
    const { addItem, updateItem, removeItem } = useCartActions();
    const items = useCartItems();
    const { toggleFavorite } = useFavoriteActions();
    const favoriteItems = useFavoriteItems();
    const router = useRouter();
    const productHref = `/products/${slugify(product.name)}`;

    const cartItem = items.find(item => item.id === product.id);
    const isInCart = !!cartItem;
    const isFavorited = favoriteItems.some(item => item.id === product.id);

    return (
        <Card className="min-w-64 overflow-hidden py-0 gap-4  hover:shadow-xl transition-shadow duration-300">
            <div
                className="relative overflow-hidden group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`View ${product.name}`}
                onClick={() => router.push(productHref)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        router.push(productHref);
                    }
                }}
            >
                {/* Discount badge */}
                <Badge className="absolute left-3 top-3 z-10" variant="destructive">
                    {`-${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%`}
                </Badge>
                {/* Action icons */}
                <div className="absolute right-3 -top-20 group-hover:top-3   transition-all duration-500 z-10 flex flex-col items-center gap-2">
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className="rounded-full p-0 cursor-pointer bg-white hover:bg-primary/80! hover:text-primary-foreground"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <LuExpand />
                    </Button>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className={`rounded-full p-0 cursor-pointer bg-white transition-colors ${
                            isFavorited 
                                ? 'text-red-500 hover:text-red-600' 
                                : 'hover:bg-primary/80! hover:text-primary-foreground'
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                discountPrice: product.discountPrice,
                                image: product.images[0],
                                brand: product.brand,
                            });
                        }}
                    >
                        <LuHeart className={isFavorited ? 'fill-current' : ''} />
                    </Button>
                </div>
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={480}
                    height={224}
                    className="h-52 w-full object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <Image
                    src={product.images[1]}
                    alt={`${product.name} alternate`}
                    width={480}
                    height={224}
                    className="absolute inset-0 h-52 w-full object-cover object-center opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

            </div>
            <CardHeader className="px-4 pb-0">
                <CardDescription className="text-muted-foreground">{product.brand}</CardDescription>
                <CardTitle className="line-clamp-1 text-sm hover:text-primary">
                    <Link href={productHref}>
                        {product.name}
                    </Link>
                </CardTitle>
                <CardDescription className="text-muted-foreground -mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pt-0">
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: product.ratings }).map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24" className="size-4 hover:scale-125 transition-transform" aria-hidden="true"><path fill="currentColor" d="m12 17.27l4.15 2.51q.675.41 1.413-.177t.547-1.423l-1.1-4.71l3.69-3.2q.725-.63.36-1.56t-1.32-.92l-4.85-.41l-1.89-4.31q-.38-.86-1.41-.86t-1.41.86L7.11 7.373l-4.85.41q-.95.08-1.316.923t.355 1.557l3.69 3.2l-1.1 4.71q-.2.95.538 1.535t1.423.065z" /></svg>
                    ))}
                </div>
                {/* Prices */}
                <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    <span className="text-primary font-semibold">${product.discountPrice.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter className="px-4 pb-4">
                {isInCart ? (
                    <Button
                        variant={'ghost'}
                        className="w-full hover:bg-primary/60 shadow-md shadow-primary/10  flex p-0 overflow-hidden transition-all duration-300">
                        
                        <div
                            className="rounded-r-xl p-2 px-3  bg-primary/60 hover:bg-primary/80 h-full justify-center items-center flex cursor-pointer text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (cartItem!.quantity === 1) {
                                    // removeItem(product.id);
                                    return
                                } else {
                                    updateItem(product.id, cartItem!.quantity - 1);
                                }
                            }}
                            aria-label="Decrease quantity"
                        >
                            <svg viewBox="0 0 24 24" className="size-4">
                                <path fill="currentColor" d="M19 12.998H5v-2h14z" />
                            </svg>
                        </div>

                        <span className="text-lg font-semibold tabular-nums min-w-8 text-center flex-1">
                            {cartItem!.quantity}
                        </span>
                        
                        <div
                            className="rounded-l-xl px-3 bg-secondary/60 hover:bg-secondary/80 h-full justify-center items-center flex p-2 cursor-pointer text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                updateItem(product.id, cartItem!.quantity + 1);
                            }}
                            aria-label="Increase quantity"
                        >
                            <svg viewBox="0 0 24 24" className="size-4">
                                <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                            </svg>
                        </div>

                    </Button>
                ) : (
                    <Button
                        variant={'primary-outline'}
                        className="w-full hover:bg-primary/80 shadow-md shadow-primary/10 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            addItem(product);
                        }}
                    >
                        <span className="inline-flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M7 22q-.825 0-1.413-.587T5 20q0-.825.588-1.413T7 18q.825 0 1.413.588T9 20q0 .825-.587 1.413T7 22Zm10 0q-.825 0-1.413-.587T15 20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.587 1.413T17 22ZM6.15 6l3.05 6h7.1l2.75-6H6.15Zm-1.6-2h15.5q.6 0 .912.488t.063.987l-3.85 8.4q-.25.55-.75.888T15.85 15H8.3l-1.1 2h11.8v2H7.1q-.725 0-1.113-.612T5.7 17.8l1.6-2.9L3 4H1V2h3q.375 0 .7.2t.45.55L6.5 6Z" /></svg>
                            ADD TO CART
                        </span>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
