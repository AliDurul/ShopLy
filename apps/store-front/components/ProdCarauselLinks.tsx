'use client';
import { useUrlParams } from '@/hooks/useUrlParams';
import { Button } from '@workspace/ui/components/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@workspace/ui/components/carousel'
import { cn } from '@workspace/ui/lib/utils';



export default function ProdCarauselLinks({ categories }: { categories?: string[] }) {
    const { updateUrlParams, getParam } = useUrlParams();
    const selectedCategory = getParam('pp', 'fashion');

    return (
        <Carousel
            className="min-w-0 flex items-center "
            opts={{ align: 'start', dragFree: true, loop: false }}
        >
            <CarouselContent className="ml-1">
                {categories?.map((category, index) => (
                    <CarouselItem key={index} className="basis-auto transition-all">
                        <Button
                            variant={'link'}
                            size={'sm'}
                            className={cn('uppercase cursor-pointer text-gray-500', selectedCategory === category && 'text--dark  underline')}
                            onClick={() => updateUrlParams({ 'pp': category })}
                        >
                            {category}
                        </Button>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='-left-1' size={'icon-sm'} />
            <CarouselNext className='-right-6 xl:-right-3' size={'icon-sm'} />
        </Carousel>
    )
}
