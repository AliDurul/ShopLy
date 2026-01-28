'use client';

import { Bell, Search, Menu, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

// Demo admin user - replace with actual auth
const adminUser = {
    name: 'Admin User',
    email: 'admin@shoply.com',
    avatar: '',
    role: 'Super Admin',
};

// Demo notifications
const notifications = [
    { id: 1, title: 'New Order', message: 'Order #1234 received', time: '5 min ago', unread: true },
    { id: 2, title: 'Low Stock Alert', message: 'Product "T-Shirt" is running low', time: '1 hour ago', unread: true },
    { id: 3, title: 'New Review', message: 'New 5-star review on "Jeans"', time: '2 hours ago', unread: false },
];

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const unreadCount = notifications.filter(n => n.unread).length;

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
            {/* Mobile Menu Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onMenuClick}
            >
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products, orders, customers..."
                        className="pl-9 bg-muted/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="size-5" />
                            {unreadCount > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center text-xs"
                                >
                                    {unreadCount}
                                </Badge>
                            )}
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Notifications</span>
                            {unreadCount > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                    {unreadCount} new
                                </Badge>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <div className="flex items-center gap-2 w-full">
                                    <span className="font-medium text-sm">{notification.title}</span>
                                    {notification.unread && (
                                        <span className="size-2 rounded-full bg-primary ml-auto" />
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">{notification.message}</span>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2">
                            <Avatar className="size-8">
                                <AvatarImage src={adminUser.avatar} alt={adminUser.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {getInitials(adminUser.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-sm font-medium">{adminUser.name}</span>
                                <span className="text-xs text-muted-foreground">{adminUser.role}</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{adminUser.name}</p>
                                <p className="text-xs text-muted-foreground">{adminUser.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/admin/profile" className="cursor-pointer">
                                <User className="mr-2 size-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/admin/settings" className="cursor-pointer">
                                <Settings className="mr-2 size-4" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                            <LogOut className="mr-2 size-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
