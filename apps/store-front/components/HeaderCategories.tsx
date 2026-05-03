
import * as React from "react"
import Link from "next/link"
import { Shirt, Gem, Smartphone, Dumbbell, Baby, Flame, Sparkles, Home as HomeIcon } from "lucide-react"
import { LuHouse } from "react-icons/lu";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@workspace/ui/components/carousel"

const mensCategories = [
    { title: "T-Shirts & Polos", href: "/products?cat=men&q=t-shirts", description: "Casual and formal t-shirts, polo shirts" },
    { title: "Shirts", href: "/products?cat=men&q=shirts", description: "Dress shirts, casual shirts, denim shirts" },
    { title: "Jeans & Pants", href: "/products?cat=men&q=jeans", description: "Slim fit, regular fit, cargo pants" },
    { title: "Jackets & Coats", href: "/products?cat=men&q=jackets", description: "Leather jackets, bomber jackets, winter coats" },
    { title: "Suits & Blazers", href: "/products?cat=men&q=suits", description: "Business suits, casual blazers" },
    { title: "Shoes", href: "/products?cat=men&q=shoes", description: "Sneakers, formal shoes, boots, sandals" },
    { title: "Accessories", href: "/products?cat=men&q=accessories", description: "Belts, wallets, ties, sunglasses" },
    { title: "Sportswear", href: "/products?cat=men&q=sportswear", description: "Gym wear, running gear, athletic shoes" },
]

const womensCategories = [
    { title: "Dresses", href: "/products?cat=women&q=dresses", description: "Casual dresses, evening gowns, summer dresses" },
    { title: "Tops & Blouses", href: "/products?cat=women&q=tops", description: "T-shirts, tank tops, formal blouses" },
    { title: "Jeans & Pants", href: "/products?cat=women&q=jeans", description: "Skinny jeans, wide leg pants, leggings" },
    { title: "Skirts", href: "/products?cat=women&q=skirts", description: "Mini skirts, midi skirts, maxi skirts" },
    { title: "Jackets & Coats", href: "/products?cat=women&q=jackets", description: "Blazers, trench coats, leather jackets" },
    { title: "Shoes & Heels", href: "/products?cat=women&q=shoes", description: "Heels, flats, boots, sandals, sneakers" },
    { title: "Bags & Handbags", href: "/products?cat=women&q=bags", description: "Shoulder bags, clutches, totes, backpacks" },
    { title: "Jewelry", href: "/products?cat=women&q=jewelry", description: "Necklaces, earrings, bracelets, rings" },
]

const kidsCategories = [
    { title: "Boys Clothing", href: "/products?cat=kids&q=boys", description: "T-shirts, jeans, jackets for boys (2-16 years)" },
    { title: "Girls Clothing", href: "/products?cat=kids&q=girls", description: "Dresses, tops, pants for girls (2-16 years)" },
    { title: "Baby & Toddler", href: "/products?cat=kids&q=baby", description: "Onesies, rompers, sleepwear (0-2 years)" },
    { title: "Kids Shoes", href: "/products?cat=kids&q=shoes", description: "Sneakers, sandals, boots for all ages" },
    { title: "School Uniforms", href: "/products?cat=kids&q=uniforms", description: "Shirts, pants, skirts, accessories" },
    { title: "Kids Accessories", href: "/products?cat=kids&q=accessories", description: "Bags, hats, socks, belts" },
]

const electronicsCategories = [
    { title: "Smartphones", href: "/products?cat=electronics&q=smartphones", description: "Latest smartphones from top brands" },
    { title: "Laptops & Computers", href: "/products?cat=electronics&q=laptops", description: "Gaming laptops, business laptops, desktops" },
    { title: "Tablets & iPads", href: "/products?cat=electronics&q=tablets", description: "Android tablets, iPads, accessories" },
    { title: "Audio & Headphones", href: "/products?cat=electronics&q=audio", description: "Wireless earbuds, headphones, speakers" },
    { title: "Cameras", href: "/products?cat=electronics&q=cameras", description: "DSLR, mirrorless, action cameras" },
    { title: "Smart Watches", href: "/products?cat=electronics&q=smartwatches", description: "Fitness trackers, smartwatches" },
    { title: "Gaming", href: "/products?cat=electronics&q=gaming", description: "Consoles, controllers, gaming accessories" },
    { title: "TV & Home Theater", href: "/products?cat=electronics&q=tv", description: "Smart TVs, soundbars, projectors" },
]

const homeCategories = [
    { title: "Furniture", href: "/products?cat=home-living&q=furniture", description: "Sofas, beds, tables, chairs, wardrobes" },
    { title: "Home Decor", href: "/products?cat=home-living&q=home-decor", description: "Wall art, mirrors, vases, decorative items" },
    { title: "Bedding & Bath", href: "/products?cat=home-living&q=home-bedding", description: "Sheets, towels, comforters, pillows" },
    { title: "Kitchen & Dining", href: "/products?cat=home-living&q=home-kitchen", description: "Cookware, dinnerware, utensils, appliances" },
    { title: "Lighting", href: "/products?cat=home-living&q=home-lighting", description: "Ceiling lights, lamps, outdoor lighting" },
    { title: "Storage & Organization", href: "/products?cat=home-living&q=home-storage", description: "Shelves, baskets, closet organizers" },
    { title: "Garden & Outdoor", href: "/products?cat=home-living&q=home-garden", description: "Patio furniture, planters, garden tools" },
]

const sportsCategories = [
    { title: "Gym & Fitness", href: "/products?cat=sports&q=gym", description: "Weights, yoga mats, resistance bands" },
    { title: "Cycling", href: "/products?cat=sports&q=cycling", description: "Bikes, helmets, cycling gear" },
    { title: "Outdoor & Camping", href: "/products?cat=sports&q=outdoor", description: "Tents, backpacks, hiking gear" },
    // { title: "Running", href: "/products?cat=sports&q=running", description: "Running shoes, activewear, fitness trackers" },
    // { title: "Swimming", href: "/products?cat=sports&q=swimming", description: "Swimwear, goggles, swim accessories" },
    // { title: "Team Sports", href: "/products?cat=sports&q=team", description: "Football, basketball, cricket equipment" },
]

// Mobile carousel categories
const mobileCategories = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Men", href: "/products?cat=men", icon: Shirt },
    { label: "Women", href: "/products?cat=women", icon: Gem },
    { label: "Kids", href: "/products?cat=kids", icon: Baby },
    { label: "Electronics", href: "/products?cat=electronics", icon: Smartphone },
    { label: "Home & Living", href: "/products?cat=home-living", icon: LuHouse },
    { label: "Sports", href: "/products?cat=sports", icon: Dumbbell },
    { label: "Sale", href: "/sale", icon: Flame, className: "text-destructive" },
    { label: "New", href: "/new-arrivals", icon: Sparkles },
]

export function HeaderCategories() {

    return (
        <>
            {/* Mobile Carousel - visible on small screens */}
            <div className="md:hidden py-2">
                <Carousel
                    opts={{ align: 'start', dragFree: true }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2">
                        {mobileCategories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <CarouselItem key={cat.label} className="basis-auto pl-2">
                                    <Link
                                        href={cat.href}
                                        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent transition-colors ${cat.className || ''}`}
                                    >
                                        <Icon className="size-5" />
                                        <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
                                    </Link>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Desktop NavigationMenu - hidden on small screens */}
            <NavigationMenu className="max-w-full py-3 hidden md:flex" viewport={false}>
                <NavigationMenuList className="flex-wrap ">

                    {/* Home */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/" className="flex items-center">
                                Home
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Men's Fashion */}
                    <NavigationMenuItem >
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">
                            <Shirt className="mr-2 h-4 w-4" />
                            Men
                        </NavigationMenuTrigger>
                        <NavigationMenuContent >
                            <ul className="grid gap-3 p-4 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                                {mensCategories.map((cat) => (
                                    <ListItem
                                        key={cat.title}
                                        title={cat.title}
                                        href={cat.href}
                                    >
                                        {cat.description}
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
                            <ul className="grid gap-3 p-4 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                                {womensCategories.map((cat) => (
                                    <ListItem
                                        key={cat.title}
                                        title={cat.title}
                                        href={cat.href}
                                    >
                                        {cat.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Kids */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:text-primary data-[state=open]:text-primary transition-colors">Kids</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                                {kidsCategories.map((cat) => (
                                    <ListItem
                                        key={cat.title}
                                        title={cat.title}
                                        href={cat.href}
                                    >
                                        {cat.description}
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
                            <ul className="grid gap-3 p-4 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                                {electronicsCategories.map((cat) => (
                                    <ListItem
                                        key={cat.title}
                                        title={cat.title}
                                        href={cat.href}
                                    >
                                        {cat.description}
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
                            <ul className="grid gap-3 p-4 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                                {homeCategories.map((cat) => (
                                    <ListItem
                                        key={cat.title}
                                        title={cat.title}
                                        href={cat.href}
                                    >
                                        {cat.description}
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
                            <ul className="grid gap-3 p-4 w-75 ">
                                {sportsCategories.map((cat) => (
                                    <ListItem
                                        key={cat.title}
                                        title={cat.title}
                                        href={cat.href}
                                    >
                                        {cat.description}
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
        </>
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
