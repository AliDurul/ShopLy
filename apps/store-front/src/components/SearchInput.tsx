'use client';

import { useEffect, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { LuSearch } from "react-icons/lu";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useRouter } from "next/navigation";

export default function SearchInput() {

    const router = useRouter();
    const { searchParams } = useUrlParams();
    const urlQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(urlQuery);

    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery]);

    const handleSearch = () => {
        const trimmed = query.trim();
        const params = new URLSearchParams();
        if (trimmed) {
            params.set("q", trimmed);
        }
        const qs = params.toString();
        router.push(`/products${qs ? `?${qs}` : ""}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='hidden md:flex flex-1 max-w-2xl'>
            <InputGroup>
                <InputGroupInput 
                    onChange={(e) => setQuery(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    value={query} 
                    placeholder="Search..." 
                />
                <InputGroupAddon 
                    onClick={handleSearch}
                    className="cursor-pointer hover:text-primary transition-colors duration-200 "
                    aria-label="Search"
                >
                    <LuSearch />
                </InputGroupAddon>
                {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
            </InputGroup>
        </div>
    )
}
