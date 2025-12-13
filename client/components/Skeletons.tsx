import { Skeleton } from "./ui/skeleton";

export function ProductSkeletonGrid() {
    return (
        <div className="flex-1">
            {/* <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Skeleton className="h-4 w-30 mt-1.5" />
                </div>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border bg-white">
                        <Skeleton className="h-52 " />

                        <div className="p-4 space-y-3">
                            <Skeleton className="h-4 w-1/5" />
                            <Skeleton className="h-4" />
                            <Skeleton className="h-3 w-3/4 " />

                            <div className="flex gap-2 pt-2">
                                <Skeleton className=" size-3 rounded-full" />
                                <Skeleton className=" size-3 rounded-full" />
                                <Skeleton className=" size-3 rounded-full" />
                                <Skeleton className=" size-3 rounded-full" />
                                <Skeleton className=" size-3 rounded-full" />

                            </div>
                            <div className="flex justify-between">
                                <Skeleton className=" size-4 rounded w-1/4 mt-3" />
                                <Skeleton className=" size-4 rounded w-1/4 mt-3" />
                            </div>
                            <Skeleton className="h-10 w-full mt-3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}