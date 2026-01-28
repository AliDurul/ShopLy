import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'



export default function PromotionDiv({ type, promotions }: { type: 'mix' | 'mid', promotions: any[] }) {
    return (
        <section className='px-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {promotions.map((promo: any) => (
                type === 'mix' ? (
                    <Card key={promo.id} className="group overflow-hidden p-0 border border-primary/10 hover:border-primary/30 transition-colors">
                        <CardContent className="relative h-44 sm:h-52 md:h-56 p-0">
                            <Image
                                src={promo.imageSrc}
                                alt={promo.altText}
                                fill
                                sizes="(min-width:1024px)25vw,(min-width:640px)50vw,100vw"
                                className="object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-2"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                            <div className={`absolute ${promo.isRight ? 'right-4' : 'left-4'} bottom-4 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 drop-shadow max-w-[75%] `}>
                                <p className="text-sm md:text-lg font-medium">{promo.title}</p>
                                <p className="text-xs sm:text-sm font-bold text-primary">${promo.price}</p>
                                <Link href={promo.href}>
                                    <Button variant="link" size="sm" className="mt-1 text-dark group-hover:text-primary group-hover:underline">Shop Now</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card key={promo.id} className="group overflow-hidden p-0 border border-primary/10 hover:border-primary/30 transition-colors hover:shadow-lg">
                        <CardContent className="relative h-44 sm:h-52 md:h-56 p-0">
                            <Image
                                src={promo.imageSrc}
                                alt={promo.altText}
                                fill
                                sizes="(min-width:1024px)25vw,(min-width:640px)50vw,100vw"
                                className="object-cover object-center transform will-change-transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-2"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-center">
                                <p className="text-sm sm:text-base font-semibold drop-shadow">{promo.title}</p>
                                <p className="text-xs sm:text-sm font-bold text-primary drop-shadow">From ${promo.price}</p>
                                <Link href={promo.href}>
                                    <Button variant="secondary" size="sm" className="mt-2 shadow hover:shadow-lg">Shop Now</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )
            ))}
        </section>
    )
}
