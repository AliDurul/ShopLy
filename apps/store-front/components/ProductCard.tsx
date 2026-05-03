'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import Image from "next/image"
import { useCartActions, useCartProduct } from "@/store/cartStore"
import { LuHeart } from "react-icons/lu"
import { useWishListActions, useIsWishList } from "@/store/wishListStore"
import Link from "next/link";
import ProductOverview from "./ProductOverview";
import AddCartBtn from "./AddCartBtn";
import { useRouter } from "next/navigation";


export default function ProductCard({ product }: { product: IProduct }) {
    const { toggleWishList } = useWishListActions();
    const isWishListd = useIsWishList(product.id);
    const router = useRouter()

    return (
        <Card className="min-w-64 overflow-hidden py-0 gap-4  hover:shadow-xl transition-shadow duration-300">
            <div
                className="relative overflow-hidden group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`View ${product.name}`}
                onClick={() => router.push(`/products/${product.slug}`)}
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

                    <ProductOverview product={product} />

                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className={`rounded-full p-0 cursor-pointer bg-white transition-colors ${isWishListd
                            ? 'text-red-500 hover:text-red-600'
                            : 'hover:bg-primary/80! hover:text-primary-foreground'
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleWishList(product);
                        }}
                    >
                        <LuHeart className={isWishListd ? 'fill-current' : ''} />
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
                    {
                        product.isDiscounted ? (
                            <>
                                <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                                <span className="text-primary font-semibold">${product.discountPrice?.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                        )
                    }
                    {/* <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    <span className="text-primary font-semibold">${product.discountPrice?.toFixed(2)}</span> */}
                </div>
            </CardContent>
            <CardFooter className="px-4 pb-4 gap-4">
                <AddCartBtn product={product} showDelBtn={false} />
            </CardFooter>
        </Card>
    )
}
