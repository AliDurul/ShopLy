import { Suspense } from "react";
import ProdCarauselLinks from "./ProdCarauselLinks";
import { Card, CardContent, CardTitle } from "@workspace/ui/components/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@workspace/ui/components/carousel";
import ProductCard from "./ProductCard";



interface ProductCarauselProps {
    title: string;
    subTitle?: string;
    categories?: string[];
    products: IProduct[];
}


export default function ProductCarausel({ title, subTitle, categories, products }: ProductCarauselProps) {

    return (
        <Card className='rounded-none'>
            <div className="flex flex-col md:flex-row md:justify-between gap-4 px-10">
                <div className='min-w-fit'>
                    <h2 className='text-xl font-semibold capitalize items-start'>{title}</h2>
                    <p className='text-gray-400 text-base/normal'>{subTitle}</p>
                </div>
                {categories && <Suspense><ProdCarauselLinks categories={categories} /></Suspense>}
            </div>
            <CardContent>
                <Carousel
                    className="w-full min-w-0 "
                    opts={{
                        align: 'start',
                        loop: false,
                        slidesToScroll: 'auto',
                        containScroll: 'trimSnaps'
                    }}
                >
                    <CarouselContent className="">
                        {products.map((product) => (
                            <CarouselItem key={product?.id} className="pl-6 basis-[280px] sm:basis-[300px] shrink-0">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='hidden md:flex left-5  hover:bg-primary! hover:text-primary-foreground! size-10 transition-all duration-300' />
                    <CarouselNext className='hidden md:flex right-3  hover:bg-primary! hover:text-primary-foreground! size-10 transition-all duration-300' />
                </Carousel>
            </CardContent>
        </Card>

    )
}
