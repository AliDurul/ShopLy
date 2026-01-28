import Link from 'next/link'
import { Suspense } from 'react'
import { FiSearch, } from 'react-icons/fi'
import SearchInput from './SearchInput'
import { Separator } from './ui/separator'
import { CartSheet } from './CartSheet'
import { HeaderCategories } from './HeaderCategories'
import WishListBtn from './WishListBtn'
import HeaderAuthBtns from './HeaderAuthBtns'

export default async function Header() {

    return (
        <>
            {/* Top Strip */}
            <div className='hidden md:flex flex-col sm:flex-row justify-between items-center px-4 py-3 text-[12px] bg-gray-100 font-mont border-b border-gray-200 text-gray-400'>
                <div>
                    <p>Get up to 50% off new season styles, limited time only</p>
                </div>
                <ul className='flex space-x-4'>
                    <li>
                        <Link href="#">Help Center</Link>
                    </li>
                    <li>
                        <Link href="#">Order Tracking</Link>
                    </li>
                </ul>
            </div>

            {/* Main Header - Sticky */}
            <header className='sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm'>
                <div className='container mx-auto px-4 py-4'>
                    <div className='flex items-center justify-between gap-8'>
                        {/* Logo */}
                        <Link href="/" className='text-2xl font-bold text-gray-900 whitespace-nowrap'>
                            ShopLy
                        </Link>

                        {/* Search Bar */}
                        <Suspense>
                            <SearchInput />
                        </Suspense>

                        {/* Right Side Actions */}
                        <div className='flex items-center gap-6'>
                            {/* Login/Register */}
                            <HeaderAuthBtns />

                            <WishListBtn />

                            <CartSheet />

                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className='md:hidden mt-4'>
                        <div className='relative w-full'>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                            />
                            <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                        </div>
                    </div>
                </div>
                <Separator />
                <HeaderCategories />
            </header>
        </>
    )
}
