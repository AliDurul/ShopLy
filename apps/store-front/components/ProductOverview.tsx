import { LuExpand, LuHeart } from "react-icons/lu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog"
import ProductImageGallery from "@/components/ProductImageGallery";
import { Separator } from "@workspace/ui/components/separator";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";

import { useWishListActions, useIsWishList } from "@/store/wishListStore";
import AddCartBtn from "./AddCartBtn";
import ProductVariantBtns from "./ProductVariantBtns";

export default function ProductOverview({ product }: { product: IProduct }) {

    const { toggleWishList } = useWishListActions();
    const isWishListd = useIsWishList(product.id);

    return (
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
            <DialogContent className="sm:max-w-5xl">
                <DialogHeader className="hidden">
                    <DialogTitle className="text-lg">{product.name}</DialogTitle>
                    <DialogDescription>
                        Quick view of product details
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <ProductImageGallery images={product.images} productName={product.name} />

                    <div className="space-y-5">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
                            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
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
                                {product.description + 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, numquam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, numquam.' ||
                                    `Experience premium quality with our ${product.name}. high-quality materials ert or sophisticated elegance, this ${product.name} delivers on both fronts. Its timeless design ensures it remains a staple in your wardrobe for years to come.`}
                            </p>
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



                        <Separator />

                        <ProductVariantBtns product={product} shallow />

                        <div className="pt-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant={'outline'}
                                    size={'sm'}
                                    className={`inline-flex items-center gap-2 ${isWishListd ? 'fill-red-600 text-red-600' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWishList(product);
                                    }}
                                >
                                    <LuHeart className={isWishListd ? 'fill-current' : ''} />
                                    <span className="text-xs">{isWishListd ? 'WishListd' : 'Add to WishLists'}</span>
                                </Button>

                                <AddCartBtn product={product} />
                            </div>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
