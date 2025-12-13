import { getAllData } from "@/actions/actionUtils"
import { FilterSidebar } from "@/components/FilterSidebar"
import ProductsGrid from "@/components/ProductsGrid";
import { ProductSkeletonGrid } from "@/components/Skeletons";
import { Suspense } from "react";
import SortBtn from "@/components/SortBtn";
import { PaginationBtn } from "@/components/PaginationBtn";



export default async function ProductsPage({ searchParams }: IPageSearchParams) {

  const params = await searchParams;
  const query = params.q || '';
  const page = params.p || '1';
  const limit = params.pl || '20';
  const sortBy = params.sb || 'price';
  const sort = params.s || 'desc';
  const category = params.cat || '';

  const parseList = (value?: string) => value ? value.split(',').filter(Boolean) : [];
  const parseNumberList = (value?: string) => parseList(value).map(item => Number(item)).filter(item => !Number.isNaN(item));
  const parsePriceRange = (value?: string) => {
    if (!value) return null;
    const [minRaw, maxRaw] = value.split(',');
    const min = Number(minRaw);
    const max = Number(maxRaw);
    const safeMin = Number.isFinite(min) ? min : null;
    const safeMax = Number.isFinite(max) ? max : null;
    if (safeMin === null || safeMax === null) return null;
    return [safeMin, safeMax] as [number, number];
  };

  const filters = {
    categories: parseList(params.categories),
    brands: parseList(params.brands),
    ratings: parseNumberList(params.ratings),
    sizes: parseList(params.sizes),
    colors: parseList(params.colors),
    materials: parseList(params.materials),
    fitTypes: parseList(params.fitTypes),
    patterns: parseList(params.patterns),
    lifestyle: parseList(params.lifestyle),
    activityType: parseList(params.activityType),
    freeShipping: params.freeShipping === 'true',
    priceRange: parsePriceRange(params.priceRange)
  };

  const filterQueries: Record<string, string | number | boolean> = {};

  if (category) filterQueries.category = category;
  if (filters.categories.length) filterQueries.categories = filters.categories.join(',');
  if (filters.brands.length) filterQueries.brands = filters.brands.join(',');
  if (filters.ratings.length) filterQueries.ratings = filters.ratings.join(',');
  if (filters.sizes.length) filterQueries.sizes = filters.sizes.join(',');
  if (filters.colors.length) filterQueries.colors = filters.colors.join(',');
  if (filters.materials.length) filterQueries.materials = filters.materials.join(',');
  if (filters.fitTypes.length) filterQueries.fitTypes = filters.fitTypes.join(',');
  if (filters.patterns.length) filterQueries.patterns = filters.patterns.join(',');
  if (filters.lifestyle.length) filterQueries.lifestyle = filters.lifestyle.join(',');
  if (filters.activityType.length) filterQueries.activityType = filters.activityType.join(',');
  if (filters.freeShipping) filterQueries.freeShipping = true;
  if (filters.priceRange) {
    filterQueries.priceMin = filters.priceRange[0];
    filterQueries.priceMax = filters.priceRange[1];
  }

  const productsPromise = getAllData({
    url: 'products',
    searchQueries: { 'name': query },
    filterQueries,
    sortQueries: { [sortBy]: sort },
    customQuery: { page, limit }
  });

  // Create a key from all query params - changes on any filter/search update
  const queryKey = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return (
    <main className="max-w-700 mx-auto p-5">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Left Sidebar - Filters */}
        <Suspense>
          <FilterSidebar />
        </Suspense>

        {/* Right Side - Product Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {/* {products.length} {products.length === 1 ? 'product' : 'products'} found */}
                x products found
              </p>
            </div>

            <Suspense>
              <SortBtn />
            </Suspense>
          </div>

          <Suspense key={queryKey} fallback={<ProductSkeletonGrid />}>
            <ProductsGrid productsPromise={productsPromise} />
          </Suspense>
        </div>
      </div>
      <PaginationBtn />
    </main>
  )
}
