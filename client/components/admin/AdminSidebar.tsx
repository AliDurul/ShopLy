'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tags,
    Settings,
    BarChart3,
    MessageSquare,
    Truck,
    Percent,
    ChevronLeft,
    ChevronRight,
    Store,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const mainNavItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/categories', label: 'Categories', icon: Tags },
];

const secondaryNavItems = [
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
    { href: '/admin/shipping', label: 'Shipping', icon: Truck },
    { href: '/admin/coupons', label: 'Coupons', icon: Percent },
];

const settingsNavItems = [
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin';
        }
        return pathname.startsWith(href);
    };

    const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                isActive(href)
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                isCollapsed && 'justify-center px-2'
            )}
            title={isCollapsed ? label : undefined}
        >
            <Icon className="size-5 shrink-0" />
            {!isCollapsed && <span>{label}</span>}
        </Link>
    );

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300',
                isCollapsed ? 'w-16' : 'w-64'
            )}
        >
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className={cn(
                    'flex h-16 items-center border-b px-4',
                    isCollapsed ? 'justify-center' : 'justify-between'
                )}>
                    <Link href="/admin" className="flex items-center gap-2">
                        <Store className="size-6 text-primary" />
                        {!isCollapsed && (
                            <span className="text-xl font-bold">ShopLy Admin</span>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 px-3 py-4">
                    <nav className="space-y-6">
                        {/* Main Navigation */}
                        <div className="space-y-1">
                            {!isCollapsed && (
                                <p className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                    Main
                                </p>
                            )}
                            {mainNavItems.map((item) => (
                                <NavLink key={item.href} {...item} />
                            ))}
                        </div>

                        <Separator />

                        {/* Secondary Navigation */}
                        <div className="space-y-1">
                            {!isCollapsed && (
                                <p className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                    Management
                                </p>
                            )}
                            {secondaryNavItems.map((item) => (
                                <NavLink key={item.href} {...item} />
                            ))}
                        </div>

                        <Separator />

                        {/* Settings */}
                        <div className="space-y-1">
                            {!isCollapsed && (
                                <p className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                    System
                                </p>
                            )}
                            {settingsNavItems.map((item) => (
                                <NavLink key={item.href} {...item} />
                            ))}
                        </div>
                    </nav>
                </ScrollArea>

                {/* Collapse Toggle */}
                <div className="border-t p-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggle}
                        className={cn(
                            'w-full justify-center',
                            !isCollapsed && 'justify-start'
                        )}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="size-4" />
                        ) : (
                            <>
                                <ChevronLeft className="size-4 mr-2" />
                                <span>Collapse</span>
                            </>
                        )}
                    </Button>
                </div>

                {/* Back to Store */}
                <div className="border-t p-3">
                    <Link
                        href="/"
                        className={cn(
                            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-foreground',
                            isCollapsed && 'justify-center px-2'
                        )}
                        title={isCollapsed ? 'Back to Store' : undefined}
                    >
                        <Store className="size-4" />
                        {!isCollapsed && <span>Back to Store</span>}
                    </Link>
                </div>
            </div>
        </aside>
    );
}
