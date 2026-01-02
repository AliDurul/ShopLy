'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, Package, User, SlidersHorizontal, LogOut, LogIn } from 'lucide-react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { FilterSidebar } from './FilterSidebar';
import { useState } from 'react';
import { LoginModal } from './LoginModal';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/my-wishlist', label: 'Wishlist', icon: Heart },
    { href: '/my-orders', label: 'Orders', icon: Package },
    // { href: '/my-account', label: 'Account', icon: User },
];

export default function BottomNav() {
    const [isLogin, setIsLogin] = useState(false);
    const pathname = usePathname();
    const isProductsPage = pathname === '/products' || pathname.startsWith('/products/');

    const isActive = (href: string) => {
        // Exact match for home
        if (href === '/') {
            return pathname === '/';
        }

        // Starts with for other routes
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <>
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex flex-col items-center justify-center h-full pt-2 pb-1 px-3 transition-colors ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Icon className="size-5 mb-1" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>

                            {/* Filter Button - between Home and Wishlist, only on products page */}
                            {index === 0 && isProductsPage && (
                                <Drawer key="filters">
                                    <DrawerTrigger asChild>
                                        <button
                                            className="flex flex-col items-center justify-center h-full pt-2 pb-1 px-3 transition-colors text-primary"
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
                        </>
                    );
                })}
                {isLogin
                    ? <>
                        <Link
                            key={'account'}
                            href={'my-account'}
                            className={`flex flex-col items-center justify-center h-full pt-2 pb-1 px-3 transition-colors ${isActive('/my-account') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <User className="size-5 mb-1" />
                            <span className="text-xs font-medium">Account</span>
                        </Link>
                        <button
                            onClick={() => setIsLogin(false)}
                            key={'logout'}
                            className="flex flex-col items-center justify-center h-full pt-2 pb-1 px-3 transition-colors text-muted-foreground hover:text-foreground">
                            <LogOut className="size-5 mb-1" />
                            <span className="text-xs font-medium">Logout</span>
                        </button>
                    </>
                    :
                    <LoginModal key={'login'} >
                        <button
                            className="flex flex-col items-center justify-center h-full pt-2 pb-1 px-3 transition-colors  text-muted-foreground hover:text-foreground">
                            <LogIn className="size-5 mb-1" />
                            <span className="text-xs font-medium">Login</span>
                        </button>
                    </LoginModal>

                }
            </div>
            {/* Safe area for devices with home indicator */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
}
