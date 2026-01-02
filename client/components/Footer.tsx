"use client";
import React from "react";
import Link from "next/link";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Facebook, Instagram, Twitter, Youtube, Truck, RotateCcw, Lock, Gift, Headphones } from "lucide-react";

export default function Footer() {
  const benefits = [
    { icon: Truck, title: "Free Shipping", description: "For all Orders Over $100" },
    { icon: RotateCcw, title: "30 Days Returns", description: "For an Exchange Product" },
    { icon: Lock, title: "Secured Payment", description: "Payment Cards Accepted" },
    { icon: Gift, title: "Special Gifts", description: "Our First Product Order" },
    { icon: Headphones, title: "Support 24/7", description: "Contact us Anytime" },
  ];

  return (
    <footer className=" bg-background border-t border-neutral-200/60">
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-lg border border-neutral-200/60 bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:bg-primary/5 group"
              >
                <Icon className="size-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-sm">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-bold text-xl tracking-tight">ShopLy</Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-prose">
              Your one‑stop shop for fashion, electronics, beauty and more.
            </p>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <LiaShippingFastSolid className="mr-2 size-5" />
              Free shipping on orders $200+
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/fashion">Fashion</Link></li>
              <li><Link href="/category/electronics">Electronics</Link></li>
              <li><Link href="/category/beauty">Beauty</Link></li>
              <li><Link href="/category/grocery">Grocery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Customer Care</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <div className="mt-3 flex items-center gap-3 text-muted-foreground">
              <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-primary"><Facebook className="size-5" /></Link>
              <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-primary"><Instagram className="size-5" /></Link>
              <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-primary"><Twitter className="size-5" /></Link>
              <Link href="https://youtube.com" aria-label="YouTube" className="hover:text-primary"><Youtube className="size-5" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200/60">
        <div className="mx-auto w-full max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopLy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
