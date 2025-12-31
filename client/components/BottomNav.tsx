'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, Package, User, SlidersHorizontal } from 'lucide-react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { FilterSidebar } from './FilterSidebar';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    // { href: '/products?search=true', label: 'Search', icon: Search, matchPath: '/products' },
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/orders', label: 'Orders', icon: Package },
    { href: '/account', label: 'Account', icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();
    const isProductsPage = pathname === '/products' || pathname.startsWith('/products/');

    const isActive = (item: typeof navItems[0]) => {
        // Exact match for home
        if (item.href === '/') {
            return pathname === '/';
        }
        // For search, check if we're on products page
        // if (item.matchPath) {
        //     return pathname === item.matchPath;
        // }
        // Starts with for other routes
        return pathname.startsWith(item.href);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item);

                    return (
                        <div key={item.label}>
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex flex-col items-center justify-center flex-1 h-full pt-2 pb-1 transition-colors ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Icon className="size-5 mb-1" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>

                            {/* Filter Button - After Home, only on products page */}
                            {index === 0 && isProductsPage && (
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <button
                                            className="flex flex-col items-center justify-center flex-1 h-full pt-2 pb-1 transition-colors text-primary"
                                        >
                                            <SlidersHorizontal className="size-5 mb-1" />
                                            <span className="text-xs font-medium">Filters</span>
                                        </button>
                                    </DrawerTrigger>
                                    <DrawerContent className="max-h-[80vh] max-w-[60vh]">
                                        <DrawerHeader className="sr-only">
                                            <DrawerTitle>Filters</DrawerTitle>
                                        </DrawerHeader>
                                        <div className="overflow-y-auto">
                                            <FilterSidebar />
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                            )}
                        </div>
                    );
                })}
            </div>
            {/* Safe area for devices with home indicator */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
}
