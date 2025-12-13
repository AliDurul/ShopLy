"use client"

import * as React from "react"
import Link from "next/link"
import { Shirt, Gem, Smartphone, Dumbbell } from "lucide-react"
import { LuHouse } from "react-icons/lu";
import { useIsMobile } from "@/hooks/use-mobile"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const mensCategories = [
    { title: "T-Shirts & Polos", href: "/products?categories=men&q=t-shirts", description: "Casual and formal t-shirts, polo shirts" },
    { title: "Shirts", href: "/products?categories=men&q=shirts", description: "Dress shirts, casual shirts, denim shirts" },
    { title: "Jeans & Pants", href: "/products?categories=men&q=jeans", description: "Slim fit, regular fit, cargo pants" },
    { title: "Jackets & Coats", href: "/products?categories=men&q=jackets", description: "Leather jackets, bomber jackets, winter coats" },
    { title: "Suits & Blazers", href: "/products?categories=men&q=suits", description: "Business suits, casual blazers" },
    { title: "Shoes", href: "/products?categories=men&q=shoes", description: "Sneakers, formal shoes, boots, sandals" },
    { title: "Accessories", href: "/products?categories=men&q=accessories", description: "Belts, wallets, ties, sunglasses" },
    { title: "Sportswear", href: "/products?categories=men&q=sportswear", description: "Gym wear, running gear, athletic shoes" },
]

const womensCategories = [
    { title: "Dresses", href: "/products?categories=women&q=dresses", description: "Casual dresses, evening gowns, summer dresses" },
    { title: "Tops & Blouses", href: "/products?categories=women&q=tops", description: "T-shirts, tank tops, formal blouses" },
    { title: "Jeans & Pants", href: "/products?categories=women&q=jeans", description: "Skinny jeans, wide leg pants, leggings" },
    { title: "Skirts", href: "/products?categories=women&q=skirts", description: "Mini skirts, midi skirts, maxi skirts" },
    { title: "Jackets & Coats", href: "/products?categories=women&q=jackets", description: "Blazers, trench coats, leather jackets" },
    { title: "Shoes & Heels", href: "/products?categories=women&q=shoes", description: "Heels, flats, boots, sandals, sneakers" },
    { title: "Bags & Handbags", href: "/products?categories=women&q=bags", description: "Shoulder bags, clutches, totes, backpacks" },
    { title: "Jewelry", href: "/products?categories=women&q=jewelry", description: "Necklaces, earrings, bracelets, rings" },
]

const kidsCategories = [
    { title: "Boys Clothing", href: "/products?categories=kids&q=boys", description: "T-shirts, jeans, jackets for boys (2-16 years)" },
    { title: "Girls Clothing", href: "/products?categories=kids&q=girls", description: "Dresses, tops, pants for girls (2-16 years)" },
    { title: "Baby & Toddler", href: "/products?categories=kids&q=baby", description: "Onesies, rompers, sleepwear (0-2 years)" },
    { title: "Kids Shoes", href: "/products?categories=kids&q=shoes", description: "Sneakers, sandals, boots for all ages" },
    { title: "School Uniforms", href: "/products?categories=kids&q=uniforms", description: "Shirts, pants, skirts, accessories" },
    { title: "Kids Accessories", href: "/products?categories=kids&q=accessories", description: "Bags, hats, socks, belts" },
]

const electronicsCategories = [
    { title: "Smartphones", href: "/products?categories=electronics&q=smartphones", description: "Latest smartphones from top brands" },
    { title: "Laptops & Computers", href: "/products?categories=electronics&q=laptops", description: "Gaming laptops, business laptops, desktops" },
    { title: "Tablets & iPads", href: "/products?categories=electronics&q=tablets", description: "Android tablets, iPads, accessories" },
    { title: "Audio & Headphones", href: "/products?categories=electronics&q=audio", description: "Wireless earbuds, headphones, speakers" },
    { title: "Cameras", href: "/products?categories=electronics&q=cameras", description: "DSLR, mirrorless, action cameras" },
    { title: "Smart Watches", href: "/products?categories=electronics&q=smartwatches", description: "Fitness trackers, smartwatches" },
    { title: "Gaming", href: "/products?categories=electronics&q=gaming", description: "Consoles, controllers, gaming accessories" },
    { title: "TV & Home Theater", href: "/products?categories=electronics&q=tv", description: "Smart TVs, soundbars, projectors" },
]

const homeCategories = [
    { title: "Furniture", href: "/products?categories=home-living&q=furniture", description: "Sofas, beds, tables, chairs, wardrobes" },
    { title: "Home Decor", href: "/products?categories=home-living&q=home-decor", description: "Wall art, mirrors, vases, decorative items" },
    { title: "Bedding & Bath", href: "/products?categories=home-living&q=home-bedding", description: "Sheets, towels, comforters, pillows" },
    { title: "Kitchen & Dining", href: "/products?categories=home-living&q=home-kitchen", description: "Cookware, dinnerware, utensils, appliances" },
    { title: "Lighting", href: "/products?categories=home-living&q=home-lighting", description: "Ceiling lights, lamps, outdoor lighting" },
    { title: "Storage & Organization", href: "/products?categories=home-living&q=home-storage", description: "Shelves, baskets, closet organizers" },
    { title: "Garden & Outdoor", href: "/products?categories=home-living&q=home-garden", description: "Patio furniture, planters, garden tools" },
]

const sportsCategories = [
    { title: "Gym & Fitness", href: "/products?categories=sports&q=gym", description: "Weights, yoga mats, resistance bands" },
    { title: "Cycling", href: "/products?categories=sports&q=cycling", description: "Bikes, helmets, cycling gear" },
    { title: "Outdoor & Camping", href: "/products?categories=sports&q=outdoor", description: "Tents, backpacks, hiking gear" },
    // { title: "Running", href: "/products?categories=sports&q=running", description: "Running shoes, activewear, fitness trackers" },
    // { title: "Swimming", href: "/products?categories=sports&q=swimming", description: "Swimwear, goggles, swim accessories" },
    // { title: "Team Sports", href: "/products?categories=sports&q=team", description: "Football, basketball, cricket equipment" },
]

export function HeaderCategories() {
    const isMobile = useIsMobile();

    return (
        <nav>
            <NavigationMenu className="max-w-full py-3" viewport={isMobile}>
                <NavigationMenuList className="flex-wrap">

                    {/* Home */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/" className="flex items-center">
                                Home
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Men's Fashion */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">
                            <Shirt className="mr-2 h-4 w-4" />
                            Men
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {mensCategories.map((categories) => (
                                    <ListItem
                                        key={categories.title}
                                        title={categories.title}
                                        href={categories.href}
                                    >
                                        {categories.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Women's Fashion */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">
                            <Gem className="mr-2 h-4 w-4" />
                            Women
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {womensCategories.map((categories) => (
                                    <ListItem
                                        key={categories.title}
                                        title={categories.title}
                                        href={categories.href}
                                    >
                                        {categories.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Kids */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">Kids</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[550px]">
                                {kidsCategories.map((categories) => (
                                    <ListItem
                                        key={categories.title}
                                        title={categories.title}
                                        href={categories.href}
                                    >
                                        {categories.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Electronics */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">
                            <Smartphone className="mr-2 h-4 w-4" />
                            Electronics
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {electronicsCategories.map((categories) => (
                                    <ListItem
                                        key={categories.title}
                                        title={categories.title}
                                        href={categories.href}
                                    >
                                        {categories.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Home & Living */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">
                            <LuHouse className="mr-2 h-4 w-4" />
                            Home & Living
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {homeCategories.map((categories) => (
                                    <ListItem
                                        key={categories.title}
                                        title={categories.title}
                                        href={categories.href}
                                    >
                                        {categories.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Sports & Outdoors */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">
                            <Dumbbell className="mr-2 h-4 w-4" />
                            Sports
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 w-[300px] ">
                                {sportsCategories.map((categories) => (
                                    <ListItem
                                        key={categories.title}
                                        title={categories.title}
                                        href={categories.href}
                                    >
                                        {categories.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Sale */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} >
                            <Link href="/sale" className="text-destructive font-semibold hover:text-destructive transition-colors">
                                Sale
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* New Arrivals */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/new-arrivals" className="hover:text-primary data-[state=open]:text-primary transition-colors">
                                New Arrivals
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
