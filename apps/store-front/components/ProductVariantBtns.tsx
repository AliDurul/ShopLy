import React, { useOptimistic } from 'react'
import { Label } from '@workspace/ui/components/label';
import { useUrlParams } from '@/hooks/useUrlParams';
import { NavigationContent, useNavigation } from '@/context/NavigationContext';
import { Button } from '@workspace/ui/components/button';
import { isNamedColor, mapColor } from '@/lib/utils';

interface ProductVariantBtnsProps {
    product: IProduct;
    shallow?: boolean; // true for modal (no navigation), false for product page
}

export default function ProductVariantBtns({ product, shallow = false }: ProductVariantBtnsProps) {
    const { getParam, updateUrlParams } = useUrlParams();
    const { startTransition } = useNavigation();

    // Get values from URL - shallow updates are instant, no loading
    const selectedSize = getParam('size', product.size) as string;
    const selectedColor = getParam('color', product.color) as string;
    const [optimisticColor, setOptimisticColor] = useOptimistic(selectedColor);

    const displayColor = shallow ? selectedColor : optimisticColor;

    return (
        <>
            {/* Size Selector */}
            <div className='space-y-2'>
                <Label>Size: <span className="text-primary">{selectedSize}</span></Label>
                {product.availableSizes && product.availableSizes.length > 0 && (
                    <div className="flex items-center gap-1">
                        {product.availableSizes.map(size => (
                            <Button
                                variant={'primary-outline'}
                                size={'default'}
                                key={size}
                                onClick={(e) => { e.stopPropagation(); updateUrlParams({ size }, { shallow: true }) }}
                                className={` ${selectedSize === size
                                    ? 'border-primary bg-primary text-white hover:bg-primary/90'
                                    : 'border-gray-300 hover:border-primary hover:bg-transparent hover:text-primary text-foreground'
                                    }`}
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Color Selector */}
            <NavigationContent className=''>
                <div className='space-y-2'>
                    <Label >Color: <span className="text-primary">{displayColor}</span></Label>
                    <div className="flex flex-wrap gap-2">
                        {product.availableColors && product.availableColors.length > 0 && (
                            <div className="flex items-center gap-2">
                                {product.availableColors.map(color => (
                                    <button
                                        key={color}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (shallow) {
                                                // Modal: instant update, no navigation
                                                updateUrlParams({ color }, { shallow: true });
                                            } else {
                                                // Product page: trigger loading state
                                                startTransition(() => {
                                                    setOptimisticColor(color);
                                                    updateUrlParams({ color });
                                                });
                                            }
                                        }}
                                        aria-label={`Select color ${color}`}
                                        className={`size-9 rounded-full border flex items-center justify-center text-[10px] font-medium transition ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary ${displayColor === color ? 'ring-2' : ''}`}
                                        style={{ backgroundColor: mapColor(color) }}
                                    >
                                        {isNamedColor(mapColor(color)) ? '' : color[0]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </NavigationContent>
        </>
    )
}
