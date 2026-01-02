import React from 'react'
import { Button } from './ui/button'
import { HeaderCarousel } from './HeaderCarousel.tsx'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className='py-3 p-2 space-y-3 md:space-y-6'>
            <HeaderCarousel />

            <div className="relative overflow-hidden rounded-xl text-white px-6 py-4 sm:px-10 sm:py-6 shadow-lg bg-linear-to-r from-primary/90  to-secondary ">
                <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                <div className='relative flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between'>
                    <div>
                        <p className='uppercase tracking-wider text-white/90 text-xs sm:text-sm font-semibold'>Limited Time Offer</p>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm'>
                            Extra 15% off New Arrivals
                        </h2>
                        <p className='text-white/90 text-sm sm:text-base'>Use code
                            <span className='mx-2 rounded-md bg-white/15 px-2 py-1 font-mono text-[12px] sm:text-sm'>SHOPLY15</span>
                            at checkout. Ends Sunday.
                        </p>
                    </div>

                    <div className='mt-4 md:mt-0 flex items-center gap-3'>
                        <Link href='/new-arrivals'>
                            <Button className='bg-white text-gray-900 hover:bg-white/90'>Shop Now</Button>
                        </Link>
                        <Link href='/sale'>
                            <Button variant='outline' className='border-white text-black hover:bg-white/90'>View Deals</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
