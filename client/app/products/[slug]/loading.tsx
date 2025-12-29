import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailLoading() {
  return (
    <main className="container mx-auto px-5 py-8">
      {/* Breadcrumb Skeleton */}
      {/* <nav className="flex items-center gap-2 text-sm mb-8">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="size-4" />
                <Skeleton className="h-4 w-32" />
            </nav> */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <span  className="text-muted-foreground hover:text-primary transition-colors">
          Home
        </span>
        <ChevronRight className="size-4 text-muted-foreground" />
        <span className="text-muted-foreground hover:text-primary transition-colors">
          Products
        </span>
        <ChevronRight className="size-4 text-muted-foreground" />
        {/* <span className="text-foreground font-medium line-clamp-1">{product?.name}</span> */}
        <Skeleton className="h-4 w-32" />

      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Gallery Skeleton */}
        <div className="w-full lg:w-[90%] flex md:flex-row flex-col gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="size-20 rounded-lg shrink-0" />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 order-1 md:order-2">
            <Skeleton className="w-full aspect-square rounded-xl" />
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-5">
          {/* Brand & Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-3/4" />
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="size-5 rounded" />
              ))}
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>

          <Separator />

          {/* Size Selector */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-14 rounded-md" />
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-16 rounded-md" />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1 rounded-md" />
            <Skeleton className="h-12 w-14 rounded-md" />
            <Skeleton className="h-12 w-14 rounded-md" />
          </div>

          <Separator />

          {/* Shipping & Returns Info */}
          <div className="flex justify-evenly flex-wrap gap-4 bg-gray-50 p-4 rounded-lg">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="size-5 rounded" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Skeleton (Tabs) */}
      <div className="max-w-6xl mx-auto my-10 space-y-6">
        {/* Tab Headers */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg">
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
        </div>
        {/* Tab Content */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-32 mt-6" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="size-2 rounded-full" />
                <Skeleton className="h-4 w-full max-w-md" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-10 max-w-3/6 mx-auto bg-secondary" />

      {/* Customer Reviews Skeleton */}
      <div className="space-y-8">
        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
            <Skeleton className="h-14 w-16 mb-2" />
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="size-5 rounded" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-2 flex-1 rounded-full" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="flex flex-col items-center justify-center p-6">
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-48 mb-4" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Skeleton key={j} className="size-4 rounded" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-5 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Separator className="my-10 max-w-3/6 mx-auto bg-secondary" /> */}

      {/* Related Products Skeleton */}
      {/* <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border bg-white">
              <Skeleton className="h-52" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-1/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <div className="flex gap-1 pt-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Skeleton key={j} className="size-4 rounded" />
                  ))}
                </div>
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </main>
  );
}
