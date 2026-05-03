import WishListSidebar from '@/components/WishListSidebar';
import React from 'react'

export default function Mylayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="max-w-425 mx-auto px-10 py-8 bg-[#f1f2f2]">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar */}
                <div className="lg:sticky lg:top-40 lg:self-start">
                    <WishListSidebar />
                </div>
                {children}
            </div>
        </main>
    )
}
