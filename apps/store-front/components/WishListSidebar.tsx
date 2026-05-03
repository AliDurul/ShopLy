'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Separator } from '@workspace/ui/components/separator';
import { User, MapPin, Package, Heart, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

const menuItems = [
    { href: '/my-account', label: 'My Account', icon: User },
    { href: '/my-orders', label: 'My Orders', icon: Package },
    { href: '/my-wishlist', label: 'My Wishlist', icon: Heart },
];

// Placeholder user data - replace with actual auth data
const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
};

export default function WishListSidebar() {
    const pathname = usePathname();

    return (
        <Card className="w-full lg:w-72 shrink-0 h-fit">
            <CardContent >
                {/* User Profile Section */}
                <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="size-20 mb-3">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <Separator className="mb-4" />

                {/* Navigation Menu */}
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    className={cn(
                                        'w-full justify-start gap-3',
                                        isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                                    )}
                                >
                                    <Icon className="size-4" />
                                    <span className="flex-1 text-left">{item.label}</span>
                                    <ChevronRight className={cn(
                                        'size-4 transition-transform',
                                        isActive && 'text-primary'
                                    )} />
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                <Separator className="my-4" />

                {/* Logout Button */}
                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <LogOut className="size-4" />
                    <span>Logout</span>
                </Button>
            </CardContent>
        </Card>
    );
}
