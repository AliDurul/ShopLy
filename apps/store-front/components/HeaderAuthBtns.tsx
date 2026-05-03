'use client';
import { LogIn, LogOut, User, Package, Heart, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useState } from 'react'
import { LoginModal } from './LoginModal';
import { Button } from '@workspace/ui/components/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import Link from 'next/link';

// Demo user data - replace with actual auth data
const demoUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '', // Can be a URL to user's avatar
    role: 'Admin'
};

export default function HeaderAuthBtns() {
    const [isLogin, setIsLogin] = useState(false);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const dropDownItems = [
        { label: 'My Account', href: '/my-account', icon: User },
        { label: 'My Orders', href: '/my-orders', icon: Package },
        { label: 'My Wishes', href: '/my-wishlist', icon: Heart },
    ]

    return (
        <>
            {isLogin ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-gray-100">
                            <Avatar className="size-8">
                                <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                                    {getInitials(demoUser.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden lg:flex flex-col items-start">
                                <span className="text-sm font-medium text-gray-900">{demoUser.name}</span>
                                <span className="text-xs text-muted-foreground">{demoUser.email}</span>
                            </div>
                            <ChevronDown className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{demoUser.name}</p>
                                <p className="text-xs text-muted-foreground">{demoUser.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            dropDownItems.map((item) => (
                                <DropdownMenuItem asChild key={item.href}>
                                    <Link href={item.href} className="cursor-pointer">
                                        <item.icon className="mr-2 size-4" />
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                        {
                            demoUser.role === 'Admin' && (
                                <DropdownMenuItem asChild key={'/admin'}>
                                    <Link href={'/admin'} className="cursor-pointer">
                                        <LayoutDashboard className="mr-2 size-4" />
                                        Admin Panel
                                    </Link>
                                </DropdownMenuItem>
                            )
                        }
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setIsLogin(false)}
                            className="text-destructive focus:text-destructive cursor-pointer"
                        >
                            <LogOut className="mr-2 size-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className='flex justify-center items-center'>
                    <LogIn className='size-4 mr-2' />

                    <LoginModal defaultView='login'>
                        <Button variant={'link'} className='p-0 text-gray-700 cursor-pointer hover:text-primary transition-all'>
                            <span className='text-sm font-medium'>Login</span>
                        </Button>
                    </LoginModal>
                    <span className='mx-2 text-gray-400'>|</span>
                    <LoginModal defaultView='register'>
                        <Button variant={'link'} className='p-0 text-gray-700 cursor-pointer hover:text-primary transition-all'>
                            <span className='text-sm font-medium'>Register</span>
                        </Button>
                    </LoginModal>
                </div>
            )}
        </>
    )
}
