"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const items = [
  {
    src: "/carausel5.jpg",
    alt: "Big Saving Days",
    title: "Apple Iphone 15 Pro 128 GB, Pink Gold",
    subtitle: "$999.00",
    imgClass: "object-top",
    href: "/products/iphone-15-pro",
    cta: "Shop Now",
    variant: "default",
    position: " left-1/2 top-1/2 -translate-y-1/2",

    subtitleSize: "text-base sm:text-lg md:text-xl",
    align: "text-left",
  },
  {
    src: "/carausel6.jpg",
    alt: "Big Saving Days",
    title: "Buy New Trand Women Black Cotton Blend Top | Casual Wear",
    subtitle: "$30.00",
    imgClass: "object-top",
    href: "/products/women-black-cotton-top",
    cta: "Shop Now",
    variant: "default",
    position: "left-1/2 top-1/2 -translate-y-1/2",

    subtitleSize: "text-base sm:text-lg md:text-xl",
    align: "text-left",
  }
]

export function PromotionCarausel() {

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )


  return (
    <section className="w-full px-10 grid grid-cols-1 md:grid-cols-3 gap-4">
      <article className="md:col-span-2">
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
                    <CardContent className="relative h-48 sm:h-56 md:h-100 xl:h-110 p-0 transition-all duration-500">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className={`object-cover ${item.imgClass} transform `}
                      />
                      <div key={index} className={`absolute  ${item.position} flex flex-col gap-3 text-dark max-w-lg ${item.align}`}>
                        <p className="text-muted-foreground hidden md:block">Big Saving Days</p>
                        <h3 className={`font-bold text-base md:text-xl lg:text-3xl tracking-tight drop-shadow-lg `}>
                          {item.title}
                        </h3>
                        <p className={`font-medium opacity-95 drop-shadow-md `}>
                          Starting At Only <span className="text-primary text-xl">{item.subtitle}</span>
                        </p>
                        <div className="">
                          <Link href={item.href}>
                            <Button variant={'primary-outline'} size="sm" className="mt-1 cursor-pointer shadow-lg">
                              {item.cta}
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </article>
      <aside className="md:col-span-1 flex flex-col sm:flex-row md:flex-col gap-4 justify-evenly">
        <Card className="overflow-hidden w-full p-0 group">
          <CardContent className="relative h-40 md:h-48 p-0">
            <Image
              src="/promo1.jpg"
              alt="Promo 1"
              fill
              sizes="33vw"
              className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute left-1/2 top-1/7 md:top-1/4 ">
              <p className="text-base ">Make your own fashion with low price </p>
              <p className="text-sm font-bold text-primary">$50</p>
              <Link href="/shipping">
                <Button variant="link" size="sm" className="mt-2 cursor-pointer">Shop Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden w-full p-0 group">
          <CardContent className="relative h-40 md:h-48 p-0">
            <Image
              src="/promo2.jpg"
              alt="Promo 2"
              fill
              sizes="33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute left-1/2 top-1/7 md:top-1/4 ">
              <p className="text-base ">Buy Men&apos;s footwear with low price </p>
              <p className="text-sm font-bold text-primary">$15</p>
              <Link href="/member-deals">
                <Button variant={'link'} size="sm" className="mt-2 cursor-pointer">Shop Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>


      </aside>
    </section>
  )
}
