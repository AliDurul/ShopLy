import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import ProductCard from "./ProductCard"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProdCarauselList({products}: {products: any[]}) {
    return (
        <Carousel
            className="w-full min-w-0 "
            opts={{ align: 'start', dragFree: true, loop: false }}
        >
            <CarouselContent className="py-2">
                {products.map((product) => (
                    <CarouselItem key={product?.id} className="basis-auto transition-all pl-6">
                        <ProductCard product={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex left-5  hover:bg-primary! hover:text-primary-foreground! size-10 transition-all duration-300' />
            <CarouselNext className='hidden md:flex right-3  hover:bg-primary! hover:text-primary-foreground! size-10 transition-all duration-300' />
        </Carousel>

    )
}
