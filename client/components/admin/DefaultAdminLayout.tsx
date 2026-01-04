'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function DefaultAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <AdminSidebar
                    isCollapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <AdminSidebar
                        isCollapsed={false}
                        onToggle={() => setMobileMenuOpen(false)}
                    />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div
                className={cn(
                    'transition-all duration-300',
                    sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
                )}
            >
                <AdminHeader onMenuClick={() => setMobileMenuOpen(true)} />
                <main className="p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
