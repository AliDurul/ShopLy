"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function HeaderCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const items = [
    {
      src: "https://serviceapi.spicezgold.com/download/1763812170460_homeslides2.jpg",
      alt: "Winter Collection",
      imgClass: "object-center",
      title: "Winter Collection",
      subtitle: "Up to 40% off coats & knitwear",
      href: "/collections/winter",
      cta: "Make it Yours",
      variant: "default",
      position: "right-65 bottom-8 ",
      btnClass: "mt-1 w-78 h-17 text-xl hover:scale-105 hover:bg-primary100 transition-all",
      titleSize: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
      subtitleSize: "text-base sm:text-lg md:text-xl",
      align: "text-left",
    },
    {
      src: "https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg",
      imgClass: "object-center",
      alt:' "Electronics Sale"',
      href: "#",
      position: "hidden",
    },
    {
      src: "https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg",
      imgClass: "object-center",
      alt: "grocery sale",
      title: "Grocery Sale",
      subtitle: "Top brands at sharp prices",
      href: "/sale/grocery",
      cta: "Grocery Now",
      variant: "secondary",
      position: "left-25 bottom-5 ",
      btnClass: "mt-1 p-7 rounded-full text-xl hover:scale-105 hover:bg-primary100 transition-all",
      titleSize: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
      subtitleSize: "text-base sm:text-lg md:text-xl",
      align: "text-center",
    },
    {
      src: "/carausel4.jpg",
      alt: "Sports & Outdoor",
      imgClass: "object-center",
      title: "fashion for all",
      subtitle: "Gear up for your goals",
      href: "/sports",
      cta: "Find Your Fit",
      variant: "secondary",
      position: "left-15 bottom-23 ",
      btnClass: "mt-1 p-7  w-53 text-xl hover:scale-105 hover:bg-primary100 transition-all",
      titleSize: "text-3xl sm:text-4xl md:text-5xl",
      subtitleSize: "text-sm sm:text-base md:text-lg",
      align: "text-right",
    },
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="overflow-hidden py-0">
                <CardContent className="relative h-30 sm:h-56 md:h-72 lg:h-80 xl:h-120 p-0">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className={`object-fill ${item.imgClass} transform `}
                  />
                  {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" /> */}
                  {/* <div className={`absolute ${item.position} flex flex-col gap-3 text-white max-w-lg ${item.align}`}>
                    <Link href={item.href}>
                      <Button variant={item.variant as "default" | "secondary" | "destructive" | "outline"} size="sm" className={`${item.btnClass} cursor-pointer shadow-lg`}>
                        {item.cta}
                      </Button>
                    </Link>
                  </div> */}
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
