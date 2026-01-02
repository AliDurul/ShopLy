'use client';
import { FiHeart } from 'react-icons/fi'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Skeleton } from './ui/skeleton'
import { useWishListCount, useWishListHydrating } from '@/store/wishListStore';
import { Badge } from './ui/badge';
import Link from 'next/link';

export default function HeaderWishListBtn() {
    const isHydrating = useWishListHydrating();
    const favoriteCount = useWishListCount();
    return (
        <div className='relative'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={'my-wishlist'}>
                        <FiHeart
                            size={22}
                            className="text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
                        />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>WishLists</p>
                </TooltipContent>
            </Tooltip>
            {
                isHydrating
                    ? <Skeleton className="bg-secondary absolute -top-2 -right-2 size-3 rounded-full px-1 font-mono " />
                    : favoriteCount > 0 && (
                        <Badge variant={'destructive'} className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                            {favoriteCount}
                        </Badge>
                    )
            }
        </div>
    )
}
