'use client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@workspace/ui/components/pagination"
import { useUrlParams } from "@/hooks/useUrlParams";

export function PaginationBtn() {

    const { getParam, searchParams } = useUrlParams();
    const currentPageStr = getParam('p', '1')
    const currentPage = Number(currentPageStr) || 1

    const baseQuery = Object.fromEntries(searchParams.entries())
    const pageHref = (p: number) => {
        const params = new URLSearchParams({ ...baseQuery, p: String(p) })
        return `/products?${params.toString()}`
    }

    // Dummy pagination data
    const totalPages = 12
    const clampedPage = Math.min(Math.max(1, currentPage), totalPages)
    const isFirstPage = clampedPage === 1
    const isLastPage = clampedPage === totalPages
    const windowSize = 5
    const half = Math.floor(windowSize / 2)
    const start = Math.max(1, clampedPage - half)
    const end = Math.min(totalPages, start + windowSize - 1)
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)


    return (
        <Pagination className="py-7">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={pageHref(Math.max(1, clampedPage - 1))} className={isFirstPage ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>

                {start > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink href={pageHref(1)} isActive={clampedPage === 1}>1</PaginationLink>
                        </PaginationItem>
                        {start > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {pages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink href={pageHref(p)} isActive={clampedPage === p}>{p}</PaginationLink>
                    </PaginationItem>
                ))}

                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink href={pageHref(totalPages)} isActive={clampedPage === totalPages}>{totalPages}</PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext href={pageHref(Math.min(totalPages, clampedPage + 1))} className={isLastPage ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
