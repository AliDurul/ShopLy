'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Button } from '@workspace/ui/components/button';
import React from 'react';
import { useUrlParams } from '@/hooks/useUrlParams';

const sortOptions = [
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'name:asc', label: 'Name: A to Z' },
    { value: 'name:desc', label: 'Name: Z to A' },
    { value: 'rating:asc', label: 'Rating: Low to High' },
    { value: 'rating:desc', label: 'Rating: High to Low' },
];

export default function SortBtn() {

    const { updateUrlParams, getParam } = useUrlParams();
    const sortBy = getParam('sb', 'price');
    const sort = getParam('s', 'desc');

    const initialSortValue = `${sortBy}:${sort}`;

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort by: {sortOptions.find(option => option.value === initialSortValue)?.label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuRadioGroup value={initialSortValue} onValueChange={(value)=> {
                    const [sortBy, sort] = value.split(':');
                    updateUrlParams({ sb: sortBy, s: sort });
                }} >
                    {
                        sortOptions.map((option) => (
                            <DropdownMenuRadioItem key={option.value} value={option.value} className='pr-7'>{option.label}</DropdownMenuRadioItem>
                        ))
                    }
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
