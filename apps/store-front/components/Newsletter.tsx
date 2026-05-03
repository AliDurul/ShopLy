'use client';
import React from 'react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input';
import { useIsMobile } from '@workspace/ui/hooks/useMobile';

export default function Newsletter() {
    const  isMobile  = useIsMobile()
    return (
        <section aria-labelledby="newsletter-title" className="relative overflow-hidden rounded-2xl max-w-5/6 mx-auto mb-12">

            <div className="relative  border border-primary/20 p-10 md:p-14 shadow-sm shadow-primary/10   bg-linear-to-bl from-primary/90 to-secondary ">

                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-white">
                        <h2 id="newsletter-title" className="text-2xl md:text-3xl font-bold tracking-tight">
                            Join the ShopLy newsletter
                        </h2>
                        <p className="text-sm md:text-base text-white/90 mt-2 max-w-prose">
                            Get exclusive offers, early access to drops, and curated picks straight to your inbox.
                        </p>
                    </div>
                    <form
                        aria-label="Newsletter subscription"
                        className="flex w-full md:w-auto items-center gap-3 flex-col md:flex-row"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                        <Input
                            id="newsletter-email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="border border-neutral-300 placeholder:text-white "
                        />
                        <Button size={isMobile ? 'sm' : 'lg'} type="submit" variant="secondary" className="">Subscribe</Button>
                    </form>
                </div>
                <p className="text-xs md:text-sm text-white/90 mt-4">By subscribing, you agree to receive marketing emails from ShopLy. You can unsubscribe at any time.</p>
            </div>
        </section >
    )
}
