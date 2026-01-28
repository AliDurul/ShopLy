"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, X } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { getCategoryConfig, categoryFilterOptions } from "@/lib/categoryFilters"
import { IFilterState } from "@/types"
import { useUrlParams } from "@/hooks/useUrlParams"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useEffect, useState } from "react"


function PriceRangeSlider({ value, onCommit, min, max, step }: {
    value: [number, number]
    onCommit: (value: [number, number]) => void
    min: number
    max: number
    step: number
}) {
    const [tempPrice, setTempPrice] = useState<[number, number]>(value)

    useEffect(() => {
        setTempPrice(value)
    }, [value])

    return (
        <Slider
            min={min}
            max={max}
            step={step}
            value={tempPrice}
            onValueChange={(v) => setTempPrice(v as [number, number])}
            onValueCommit={(v) => onCommit(v as [number, number])}
            className="mt-2"
        />
    )
}

export function FilterSidebar() {

    const { getParam, updateUrlParams, searchParams } = useUrlParams();
    const category = getParam('cat', '');

    const categoryConfig = getCategoryConfig(category)
    const [defaultPriceMin, defaultPriceMax] = categoryConfig?.priceRange || [0, 1000]


    const mainCategories = Object.values(categoryFilterOptions).map(cat => cat.title);

    const globalBrands = Array.from(new Set(
        Object.values(categoryFilterOptions).flatMap(cat => cat.brands)
    ));
    const ratings = [5, 4, 3, 2, 1]

    const parseListParam = (key: string) => {
        const value = searchParams.get(key)
        if (!value) return []
        return value.split(',').map(item => item.trim()).filter(Boolean)
    }

    const parseNumberListParam = (key: string) => {
        return parseListParam(key)
            .map(value => Number(value))
            .filter(value => !Number.isNaN(value))
    }

    const parsePriceRange = (): [number, number] => {
        const raw = searchParams.get('priceRange')
        if (!raw) return [defaultPriceMin, defaultPriceMax]

        const [minRaw, maxRaw] = raw.split(',')
        const min = Number(minRaw)
        const max = Number(maxRaw)

        const safeMin = Number.isFinite(min) ? min : defaultPriceMin
        const safeMax = Number.isFinite(max) ? max : defaultPriceMax

        const boundedMin = Math.max(defaultPriceMin, Math.min(safeMin, defaultPriceMax))
        const boundedMax = Math.max(defaultPriceMin, Math.min(safeMax, defaultPriceMax))

        return [Math.min(boundedMin, boundedMax), Math.max(boundedMin, boundedMax)]
    }

    const filters: IFilterState = {
        cat: parseListParam('cat')[0] || '',
        subCat: parseListParam('subCat'),
        priceRange: parsePriceRange(),
        ratings: parseNumberListParam('ratings'),
        brands: parseListParam('brands'),
        sizes: parseListParam('sizes'),
        colors: parseListParam('colors'),
        materials: parseListParam('materials'),
        fitTypes: parseListParam('fitTypes'),
        patterns: parseListParam('patterns'),
        lifestyle: parseListParam('lifestyle'),
        activityType: parseListParam('activityType'),
        warranty: parseListParam('warranty'),
        connectivity: parseListParam('connectivity'),
        roomType: parseListParam('roomType'),
        freeShipping: getParam('freeShipping') === 'true'
    }
    // console.log(filters);
    const serializeFilterValue = (value: unknown) => {
        if (value === null || value === undefined) return null
        if (Array.isArray(value)) return value.length ? value.join(',') : null
        if (typeof value === 'boolean') return value ? 'true' : null
        return String(value)
    }

    const updateFilter = (key: keyof IFilterState, value: unknown, options: { debounce?: number; replace?: boolean } = {}) => {
        const serialized = serializeFilterValue(value)
        updateUrlParams({ [key]: serialized }, options)
    }

    const toggleArrayFilter = (key: keyof Pick<IFilterState, 'cat' | 'subCat' | 'brands' | 'ratings' | 'sizes' | 'colors' | 'materials' | 'fitTypes' | 'patterns' | 'lifestyle' | 'activityType' | 'warranty' | 'connectivity' | 'roomType'>, value: string | number) => {
        const current = filters[key] as (string | number)[]
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value]
        updateFilter(key, updated)
    }

    const clearAllFilters = () => {
        updateUrlParams({
            cat: '',
            subCat: null,
            priceRange: null,
            ratings: null,
            brands: null,
            sizes: null,
            colors: null,
            materials: null,
            fitTypes: null,
            patterns: null,
            lifestyle: null,
            activityType: null,
            warranty: null,
            connectivity: null,
            roomType: null,
            freeShipping: null
        }, { replace: true })
    }

    const activeFiltersCount =
        (filters.cat ? 1 : 0) +
        filters.subCat.length +
        filters.brands.length +
        filters.ratings.length +
        filters.sizes.length +
        filters.colors.length +
        filters.materials.length +
        filters.fitTypes.length +
        filters.patterns.length +
        filters.lifestyle.length +
        filters.activityType.length +
        filters.warranty.length +
        filters.connectivity.length +
        filters.roomType.length +
        (filters.freeShipping ? 1 : 0) +
        (filters.priceRange[0] !== defaultPriceMin || filters.priceRange[1] !== defaultPriceMax ? 1 : 0)

    // Use category-specific filters if available, otherwise use global
    const displayCategories = categoryConfig?.subcategories || mainCategories
    const displayBrands = categoryConfig?.brands || globalBrands

    return (
        <aside className="w-full lg:w-60 shrink-0 p-4 ">
            <div className="space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                        >
                            Clear all
                            <Badge variant="secondary" className="ml-1">{activeFiltersCount}</Badge>
                        </button>
                    )}
                </div>
                {category && categoryConfig && (
                    <p className="text-xs text-muted-foreground italic">
                        Filters for: <span className="font-medium text-foreground">{categoryConfig.title}</span>
                    </p>
                )}
                <Separator />

                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2 pr-4">

                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="free-shipping"
                                checked={filters.freeShipping}
                                onCheckedChange={(checked) => updateFilter('freeShipping', !!checked)}
                            />
                            <Label
                                htmlFor="free-shipping"
                                className="text-sm font-normal cursor-pointer"
                            >
                                Free Shipping
                            </Label>
                        </div>

                        {/* Categories */}
                        <Collapsible className="space-y-1.5 cursor-pointer" defaultOpen>
                            <CollapsibleTrigger className="w-full group">
                                <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                    <span className="font-medium text-sm text-left">
                                        Categories
                                    </span>
                                    <ChevronDown
                                        className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                        aria-hidden="true"
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="space-y-2">
                                    <RadioGroup value={filters.cat} onValueChange={(value) => {
                                        updateUrlParams({
                                            cat: value,
                                            subCat: null,
                                            priceRange: null,
                                            ratings: null,
                                            brands: null,
                                            sizes: null,
                                            colors: null,
                                            materials: null,
                                            fitTypes: null,
                                            patterns: null,
                                            lifestyle: null,
                                            activityType: null,
                                            freeShipping: null
                                        }, { replace: true })
                                    }}>
                                        {mainCategories.map((category) => (
                                            <div key={category} className="flex items-center gap-3">
                                                <RadioGroupItem value={category.toLowerCase()} id={`cat-${category}`} />
                                                <Label
                                                    htmlFor={`cat-${category}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {category}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Subcategories */}
                        {category && categoryConfig?.subcategories && categoryConfig.subcategories.length > 0 && (
                            <Collapsible className="space-y-1.5 cursor-pointer" defaultOpen>
                                <CollapsibleTrigger className="w-full group">
                                    <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                        <span className="font-medium text-sm text-left">
                                            Subcategories
                                        </span>
                                        <ChevronDown
                                            className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="space-y-2">
                                        {displayCategories.map((category) => (
                                            <div key={category} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`cat-${category}`}
                                                    checked={filters.subCat.includes(category.toLowerCase())}
                                                    onCheckedChange={() => toggleArrayFilter('subCat', category.toLocaleLowerCase())}
                                                />
                                                <Label
                                                    htmlFor={`cat-${category}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {category}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        )}

                        {/* Warranty (Electronics) */}
                        {categoryConfig?.warranty && categoryConfig.warranty.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Warranty</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.warranty.map((w) => (
                                                <div key={w} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`warranty-${w}`}
                                                        checked={filters.warranty.includes(w)}
                                                        onCheckedChange={() => toggleArrayFilter('warranty', w)}
                                                    />
                                                    <Label htmlFor={`warranty-${w}`} className="text-sm font-normal cursor-pointer">
                                                        {w}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}

                        {/* Connectivity (Electronics) */}
                        {categoryConfig?.connectivity && categoryConfig.connectivity.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Connectivity</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.connectivity.map((conn) => (
                                                <div key={conn} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`connectivity-${conn}`}
                                                        checked={filters.connectivity.includes(conn)}
                                                        onCheckedChange={() => toggleArrayFilter('connectivity', conn)}
                                                    />
                                                    <Label htmlFor={`connectivity-${conn}`} className="text-sm font-normal cursor-pointer">
                                                        {conn}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}

                        {/* Room Type (Home-Living) */}
                        {categoryConfig?.roomType && categoryConfig.roomType.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Room Type</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.roomType.map((room) => (
                                                <div key={room} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`room-${room}`}
                                                        checked={filters.roomType.includes(room)}
                                                        onCheckedChange={() => toggleArrayFilter('roomType', room)}
                                                    />
                                                    <Label htmlFor={`room-${room}`} className="text-sm font-normal cursor-pointer">
                                                        {room}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}
                        <Separator />

                        {/* Price Range */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-sm">Price Range</h3>
                                <span className="text-xs text-muted-foreground">
                                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                                </span>
                            </div>
                            {/* Local state to allow smooth dragging while committing on release */}
                            <PriceRangeSlider
                                value={filters.priceRange}
                                onCommit={(value) => updateFilter('priceRange', value)}
                                min={defaultPriceMin}
                                max={defaultPriceMax}
                                step={10}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>${defaultPriceMin}</span>
                                <span>${defaultPriceMax}</span>
                            </div>
                        </div>


                        {/* Ratings */}
                        <div className="space-y-3">
                            <Collapsible className="space-y-1.5" defaultOpen>
                                <CollapsibleTrigger className="w-full group">
                                    <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                        <span className="font-medium text-sm text-left">Ratings</span>
                                        <ChevronDown
                                            className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="space-y-2">
                                        {ratings.map((rating) => (
                                            <div key={rating} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`rating-${rating}`}
                                                    checked={filters.ratings.includes(rating)}
                                                    onCheckedChange={() => toggleArrayFilter('ratings', rating)}
                                                />
                                                <Label
                                                    htmlFor={`rating-${rating}`}
                                                    className="text-sm font-normal cursor-pointer flex items-center gap-1"
                                                >
                                                    <span className="flex items-center text-amber-400">
                                                        {Array.from({ length: rating }).map((_, i) => (
                                                            <svg key={i} viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                                                                <path fill="currentColor" d="m12 17.27l4.15 2.51q.675.41 1.413-.177t.547-1.423l-1.1-4.71l3.69-3.2q.725-.63.36-1.56t-1.32-.92l-4.85-.41l-1.89-4.31q-.38-.86-1.41-.86t-1.41.86L7.11 7.373l-4.85.41q-.95.08-1.316.923t.355 1.557l3.69 3.2l-1.1 4.71q-.2.95.538 1.535t1.423.065z" />
                                                            </svg>
                                                        ))}
                                                    </span>
                                                    <span className="text-muted-foreground">& up</span>
                                                </Label>
                                            </div>
                                        ))}
                                        {filters.warranty.map((w) => (
                                            <Badge key={w} variant="secondary" className="gap-1">
                                                {w}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('warranty', w)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.connectivity.map((conn) => (
                                            <Badge key={conn} variant="secondary" className="gap-1">
                                                {conn}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('connectivity', conn)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.roomType.map((room) => (
                                            <Badge key={room} variant="secondary" className="gap-1">
                                                {room}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('roomType', room)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>


                        {/* Brands */}
                        {displayBrands.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5" defaultOpen>
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Brands</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {displayBrands.map((brand) => (
                                                <div key={brand} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`brand-${brand}`}
                                                        checked={filters.brands.includes(brand)}
                                                        onCheckedChange={() => toggleArrayFilter('brands', brand)}
                                                    />
                                                    <Label
                                                        htmlFor={`brand-${brand}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {brand}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}


                        {/* Sizes */}
                        {categoryConfig?.sizes && categoryConfig.sizes.length > 0 && (
                            <Collapsible className="space-y-1.5">
                                <CollapsibleTrigger className="w-full group">
                                    <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                        <span className="font-medium text-sm text-left">Sizes</span>
                                        <ChevronDown
                                            className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="space-y-2">
                                        {categoryConfig.sizes.map((size) => (
                                            <div key={size} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`size-${size}`}
                                                    checked={filters.sizes.includes(size)}
                                                    onCheckedChange={() => toggleArrayFilter('sizes', size)}
                                                />
                                                <Label
                                                    htmlFor={`size-${size}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {size}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        )}


                        {/* Colors */}
                        {categoryConfig?.colors && categoryConfig.colors.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Colors</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.colors.map((color) => (
                                                <div key={color} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`color-${color}`}
                                                        checked={filters.colors.includes(color)}
                                                        onCheckedChange={() => toggleArrayFilter('colors', color)}
                                                    />
                                                    <Label
                                                        htmlFor={`color-${color}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {color}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}


                        {/* Materials */}
                        {categoryConfig?.materials && categoryConfig.materials.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Materials</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.materials.map((material) => (
                                                <div key={material} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`material-${material}`}
                                                        checked={filters.materials.includes(material)}
                                                        onCheckedChange={() => toggleArrayFilter('materials', material)}
                                                    />
                                                    <Label
                                                        htmlFor={`material-${material}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {material}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}


                        {/* Fit Types */}
                        {categoryConfig?.fitTypes && categoryConfig.fitTypes.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Fit Type</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.fitTypes.map((fit) => (
                                                <div key={fit} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`fit-${fit}`}
                                                        checked={filters.fitTypes.includes(fit)}
                                                        onCheckedChange={() => toggleArrayFilter('fitTypes', fit)}
                                                    />
                                                    <Label
                                                        htmlFor={`fit-${fit}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {fit}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}


                        {/* Patterns */}
                        {categoryConfig?.patterns && categoryConfig.patterns.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Pattern</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.patterns.map((pattern) => (
                                                <div key={pattern} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`pattern-${pattern}`}
                                                        checked={filters.patterns.includes(pattern)}
                                                        onCheckedChange={() => toggleArrayFilter('patterns', pattern)}
                                                    />
                                                    <Label
                                                        htmlFor={`pattern-${pattern}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {pattern}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}


                        {/* Lifestyle */}
                        {categoryConfig?.lifestyle && categoryConfig.lifestyle.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Lifestyle</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.lifestyle.map((life) => (
                                                <div key={life} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`lifestyle-${life}`}
                                                        checked={filters.lifestyle.includes(life)}
                                                        onCheckedChange={() => toggleArrayFilter('lifestyle', life)}
                                                    />
                                                    <Label
                                                        htmlFor={`lifestyle-${life}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {life}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}


                        {/* Activity Type */}
                        {categoryConfig?.activityType && categoryConfig.activityType.length > 0 && (
                            <div className="space-y-3">
                                <Collapsible className="space-y-1.5">
                                    <CollapsibleTrigger className="w-full group">
                                        <div className="h-9 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-full flex items-center justify-between px-0 rounded-none">
                                            <span className="font-medium text-sm text-left">Activity</span>
                                            <ChevronDown
                                                className="size-4 ml-auto transition-transform text-muted-foreground group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="space-y-2">
                                            {categoryConfig.activityType.map((activity) => (
                                                <div key={activity} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`activity-${activity}`}
                                                        checked={filters.activityType.includes(activity)}
                                                        onCheckedChange={() => toggleArrayFilter('activityType', activity)}
                                                    />
                                                    <Label
                                                        htmlFor={`activity-${activity}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {activity}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        )}



                        {/* Active Filters Pills */}
                        {activeFiltersCount > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <h3 className="font-medium text-sm">Active Filters</h3>
                                    <div className="flex flex-wrap gap-2">

                                        <Badge variant="secondary" className="gap-1">
                                            {category}
                                            <X
                                                className="size-3 cursor-pointer"
                                                onClick={() => toggleArrayFilter('cat', category || '')}
                                            />
                                        </Badge>

                                        {filters.subCat.map((subCat) => (
                                            <Badge key={subCat} variant="secondary" className="gap-1">
                                                {subCat}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('subCat', subCat)}
                                                />
                                            </Badge>
                                        ))}

                                        {filters.brands.map((brand) => (
                                            <Badge key={brand} variant="secondary" className="gap-1">
                                                {brand}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('brands', brand)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.ratings.map((rating) => (
                                            <Badge key={rating} variant="secondary" className="gap-1">
                                                {rating}★+
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('ratings', rating)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.sizes.map((size) => (
                                            <Badge key={size} variant="secondary" className="gap-1">
                                                Size: {size}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('sizes', size)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.colors.map((color) => (
                                            <Badge key={color} variant="secondary" className="gap-1">
                                                {color}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('colors', color)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.materials.map((material) => (
                                            <Badge key={material} variant="secondary" className="gap-1">
                                                {material}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('materials', material)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.fitTypes.map((fit) => (
                                            <Badge key={fit} variant="secondary" className="gap-1">
                                                {fit}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('fitTypes', fit)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.patterns.map((pattern) => (
                                            <Badge key={pattern} variant="secondary" className="gap-1">
                                                {pattern}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('patterns', pattern)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.lifestyle.map((life) => (
                                            <Badge key={life} variant="secondary" className="gap-1">
                                                {life}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('lifestyle', life)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.activityType.map((activity) => (
                                            <Badge key={activity} variant="secondary" className="gap-1">
                                                {activity}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => toggleArrayFilter('activityType', activity)}
                                                />
                                            </Badge>
                                        ))}
                                        {filters.freeShipping && (
                                            <Badge variant="secondary" className="gap-1">
                                                Free Shipping
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => updateFilter('freeShipping', false)}
                                                />
                                            </Badge>
                                        )}
                                        {(filters.priceRange[0] !== defaultPriceMin || filters.priceRange[1] !== defaultPriceMax) && (
                                            <Badge variant="secondary" className="gap-1">
                                                ${filters.priceRange[0]}-${filters.priceRange[1]}
                                                <X
                                                    className="size-3 cursor-pointer"
                                                    onClick={() => updateFilter('priceRange', null)}
                                                />
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </aside>
    )
}
