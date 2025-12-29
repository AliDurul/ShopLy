'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { LuExpand, LuHeart } from "react-icons/lu"
import Image from "next/image"
import { useCartActions, useCartProduct } from "@/store/cartStore"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useFavoriteActions, useIsFavorite } from "@/store/favoriteStore"
import Link from "next/link";
import ProductImageGallery from "@/components/ProductImageGallery";
import { Separator } from "./ui/separator";


export default function ProductCard({ product }: { product: IProduct }) {
    const { addCart, updateCart, removeCart } = useCartActions();
    const { toggleFavorite } = useFavoriteActions();

    const cartP = useCartProduct(product.id);
    const isInCart = !!cartP
    const isFavorited = useIsFavorite(product.id);

    return (
        <Card className="min-w-64 overflow-hidden py-0 gap-4  hover:shadow-xl transition-shadow duration-300">
            <div
                className="relative overflow-hidden group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`View ${product.name}`}
            // onClick={() => router.push(productHref)}
            // onKeyDown={(e) => {
            //     if (e.key === 'Enter' || e.key === ' ') {
            //         e.preventDefault();
            //         router.push(productHref);
            //     }
            // }}
            >
                {/* Discount badge */}
                {
                    product.isDiscounted && (
                        <Badge className="absolute left-3 top-3 z-10" variant="destructive">
                            {`-${Math.round(((product.price - (product?.discountPrice ?? product.price)) / product.price) * 100)}%`}
                        </Badge>
                    )
                }
                {/* Action icons */}
                <div className="absolute right-3 -top-20 group-hover:top-3   transition-all duration-500 z-10 flex flex-col items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant={'ghost'}
                                size={'sm'}
                                className="rounded-full p-0 cursor-pointer bg-white hover:bg-primary/80! hover:text-primary-foreground"
                                onClick={(e) => {
                                    // e.preventDefault();
                                    e.stopPropagation();
                                }}
                                aria-label="Quick view"
                            >
                                <LuExpand />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl w-[95vw]">
                            <DialogHeader>
                                <DialogTitle className="text-lg">{product.name}</DialogTitle>
                                <DialogDescription>
                                    Quick view of product details
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <ProductImageGallery images={product.images} productName={product.name} />
                                </div>
                                <div className="space-y-4">
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
                                            <span className="text-4xl font-bold text-primary">${product?.discountPrice?.toFixed(2)}</span>
                                            <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                                            <Badge variant="destructive" className="text-base px-3 py-1">
                                                -{13}%
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-green-600 font-medium">In Stock (24 items available)</p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {product.description ||
                                                `Experience premium quality with our ${product.name}. high-quality materials ert or sophisticated elegance, this ${product.name} delivers on both fronts. Its timeless design ensures it remains a staple in your wardrobe for years to come.`}
                                        </p>
                                    </div>

                                    <Separator />

                                    <div className="pt-2 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant={'outline'}
                                                size={'sm'}
                                                className={`inline-flex items-center gap-2 ${isFavorited ? 'fill-red-600 text-red-600' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(product);
                                                }}
                                            >
                                                <LuHeart className={isFavorited ? 'fill-current' : ''} />
                                                <span className="text-xs">{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
                                            </Button>

                                            <div className="flex items-center gap-2 ml-auto">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="size-8"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (isInCart && cartP) {
                                                            if (cartP.quantity === 1) {
                                                                removeCart(product.id);
                                                            } else {
                                                                updateCart(product.id, cartP.quantity - 1);
                                                            }
                                                        }
                                                    }}
                                                    aria-label="Decrease quantity"
                                                    disabled={!isInCart}
                                                >
                                                    <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M19 12.998H5v-2h14z" /></svg>
                                                </Button>
                                                <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                                                    {isInCart && cartP ? cartP.quantity : 0}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="size-8"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (isInCart && cartP) {
                                                            updateCart(product.id, cartP.quantity + 1);
                                                        } else {
                                                            addCart(product);
                                                        }
                                                    }}
                                                    aria-label="Increase quantity"
                                                >
                                                    <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg>
                                                </Button>
                                            </div>

                                            <span className="text-xs text-muted-foreground ml-2">Added: {isInCart && cartP ? cartP.quantity : 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className={`rounded-full p-0 cursor-pointer bg-white transition-colors ${isFavorited
                            ? 'text-red-500 hover:text-red-600'
                            : 'hover:bg-primary/80! hover:text-primary-foreground'
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product);
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
                    <Link href={`/products/${product.slug}`}>
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
                    <span className="text-primary font-semibold">${product.discountPrice?.toFixed(2)}</span>
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
                                if (cartP!.quantity === 1) {
                                    // removeCart(product.id);
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
                ) : (
                    <Button
                        variant={'primary-outline'}
                        className="w-full transition-all duration-700 hover:bg-primary/80 shadow-md shadow-primary/10 cursor-pointer"
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
            </CardFooter>
        </Card>
    )
}
