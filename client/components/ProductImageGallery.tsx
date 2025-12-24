'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [zoomActive, setZoomActive] = useState(false);
    const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });

    const handlePrevImage = () => {
        setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoomActive) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomCoords({ x, y });
    };

    return (
        <div className="w-full lg:w-[90%]  space-y-4 flex md:flex-row flex-col gap-2">
            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="overflow-x-auto min-w-fit   order-2 md:order-1 flex md:flex-col gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImageIndex(index)}
                            className={cn(
                                'relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                                mainImageIndex === index
                                    ? 'border-primary'
                                    : 'border-gray-200 hover:border-gray-400'
                            )}
                        >
                            <Image
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                className="w-full h-full object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Main Image with Zoom */}
            <div
                className="order-1 md:order-2 relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-zoom-in"
                onMouseEnter={() => setZoomActive(true)}
                onMouseLeave={() => setZoomActive(false)}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={images[mainImageIndex]}
                    alt={`${productName} - Image ${mainImageIndex + 1}`}
                    fill
                    className={cn(
                        'w-full h-full object-cover transition-transform duration-200',
                        zoomActive && 'scale-150'
                    )}
                    style={
                        zoomActive
                            ? {
                                transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                            }
                            : {}
                    }
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                />

                {/* Zoom Icon */}
                <div className="absolute bottom-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="size-5 text-gray-700" />
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {mainImageIndex + 1} / {images.length}
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white transition-all"
                            onClick={handlePrevImage}
                        >
                            <ChevronLeft className="size-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white transition-all"
                            onClick={handleNextImage}
                        >
                            <ChevronRight className="size-5" />
                        </Button>
                    </>
                )}
            </div>


        </div>
    );
}
