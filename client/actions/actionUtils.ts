'use server';
import qs from 'query-string';

const BASE_URL = 'localhost' + '/';

interface GetAllDataParams extends QueryParams { url: string; }

const dummyProducts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Premium Product ${i + 1}`,
    slug: `premium-product-${i + 1}`,
    brand: ['Nike', 'Adidas', 'Zara', 'H&M', 'Samsung', 'Apple'][i % 6],
    price: 99.99 + (i * 10),
    discountPrice: 69.99 + (i * 7),
    ratings: Math.floor(Math.random() * 2) + 4,
    images: [
        'https://picsum.photos/seed/' + (i * 10) + '/480/224',
        'https://picsum.photos/seed/' + (i * 10 + 1) + '/480/224'
    ],
    category: ['Men\'s Fashion', 'Women\'s Fashion', 'Electronics', 'Sports & Outdoors'][i % 4],
    freeShipping: i % 3 === 0
}))

export const getData = async (url: string) => {

    await wait(2000);

    try {
        // const headers = await authConfig();
        // const response = await fetch(BASE_URL + url, {
        //     headers,
        //     next: { tags: [url] }
        // });

        // const data = await response.json();

        // if (!response.ok) {
        //     throw new Error(data.message || "Something went wrong, Please try again!");
        // }
        // return data;
        console.log(dummyProducts.find(p=> p.slug === url));

        return { success: true, message: "Data fetched successfully", data: dummyProducts.find((p) => p.slug === url) };

    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong, Please try again!" };
    }
};

export const getAllData = async ({ url, searchQueries, filterQueries, sortQueries, customQuery }: GetAllDataParams) => {

    if (!url) return { success: false, error: 'URL parameter is required' };

    console.log(searchQueries, filterQueries, sortQueries, customQuery);

    const queryObject = buildQueryParams({
        searchQueries,
        filterQueries,
        sortQueries,
        customQuery
    });

    const finalUrl = qs.stringifyUrl(
        {
            url: BASE_URL + url,
            query: queryObject
        },
        {
            encode: false,
            skipNull: true,
            skipEmptyString: true,
            arrayFormat: 'bracket'
        }
    );

    console.log(finalUrl);

    try {
        // const headers = await authConfig();

        // const response = await fetch(finalUrl, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     // headers,
        //     next: { tags: [url] }
        // });

        // const data = await response.json();

        // if (!response.ok && !data.success) throw new Error(data.message || "Something went wrong, Please try again!");

        await wait(1000)
        const data = { message: 'Data fetched successfully', success: true, data: dummyProducts };

        return data

    } catch (error: Error | unknown) {
        throw error
        // return { message: (error as Error).message, success: false };
    }
};

interface QueryParams {
    searchQueries?: Record<string, string | undefined>;
    filterQueries?: Record<string, string | number | boolean>;
    sortQueries?: Record<string, string | undefined>;
    customQuery?: Record<string, string | number | boolean | undefined>;
}

// Utility  clean and build query parameters
const buildQueryParams = (params: QueryParams): Record<string, string> => {
    const queryObject: Record<string, string> = {};

    // Helper function to process query entries
    const processEntries = (
        entries: Record<string, unknown> | undefined,
        prefix?: string
    ) => {
        if (!entries) return;

        Object.entries(entries)
            .filter(([, value]) => value !== undefined && value !== '' && value !== null)
            .forEach(([key, value]) => {
                const finalKey = prefix ? `${prefix}[${key}]` : key;
                queryObject[finalKey] = String(value);
            });
    };

    // Process different query types
    processEntries(params.searchQueries, 'search');
    processEntries(params.filterQueries, 'filter');
    processEntries(params.sortQueries, 'sort');
    processEntries(params.customQuery);

    return queryObject;
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
