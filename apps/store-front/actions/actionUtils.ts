'use server';
import qs from 'query-string';

const BASE_URL = 'localhost' + '/';


const dummyProducts: IProduct[] = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        slug: "classic-cotton-tshirt",
        price: 29.99,
        isDiscounted: true,
        discountPrice: 19.99,
        images: [
            "https://picsum.photos/seed/10/800",
            "https://picsum.photos/seed/11/800",
            "https://picsum.photos/seed/12/800"
        ],
        quantity: 150,
        ratings: 4.5,
        category: "men",
        size: "M",
        color: "Blue",
        brand: "Nike",
        description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear with breathable fabric and modern design.",
        specifications: {
            "Material": "100% Cotton",
            "Fit": "Regular",
            "Care": "Machine washable",
            "Weight": "180 GSM",
            "Origin": "Made in USA"
        },
        availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
        availableColors: ["Blue", "Black", "White", "Gray", "Red"]
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        slug: "slim-fit-denim-jeans",
        price: 79.99,
        isDiscounted: true,
        discountPrice: 59.99,
        images: [
            "https://picsum.photos/seed/20/800",
            "https://picsum.photos/seed/21/800",
            "https://picsum.photos/seed/22/800"
        ],
        quantity: 85,
        ratings: 4.7,
        category: "men",
        size: "32",
        color: "Blue",
        brand: "Levi's",
        description: "Classic slim fit jeans with stretch denim for ultimate comfort. Features five-pocket styling and button fly.",
        specifications: {
            "Material": "98% Cotton, 2% Elastane",
            "Fit": "Slim",
            "Rise": "Mid Rise",
            "Care": "Machine washable cold",
            "Origin": "Made in Bangladesh"
        },
        availableSizes: ["28", "30", "32", "34", "36", "38"],
        availableColors: ["Blue", "Black", "Gray"]
    },
    {
        id: 3,
        name: "Women's Summer Dress",
        slug: "womens-summer-dress",
        price: 89.99,
        isDiscounted: true,
        discountPrice: 69.99,
        images: [
            "https://picsum.photos/seed/30/800",
            "https://picsum.photos/seed/31/800",
            "https://picsum.photos/seed/32/800"
        ],
        quantity: 60,
        ratings: 4.8,
        category: "women",
        size: "M",
        color: "Pink",
        brand: "Zara",
        description: "Elegant summer dress with floral pattern. Lightweight and breathable fabric perfect for warm weather occasions.",
        specifications: {
            "Material": "100% Polyester",
            "Fit": "Regular",
            "Length": "Midi",
            "Care": "Hand wash recommended",
            "Origin": "Made in India"
        },
        availableSizes: ["XS", "S", "M", "L", "XL"],
        availableColors: ["Pink", "Blue", "White", "Black"]
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        slug: "leather-crossbody-bag",
        price: 149.99,
        isDiscounted: false,
        images: [
            "https://picsum.photos/seed/40/800",
            "https://picsum.photos/seed/41/800",
            "https://picsum.photos/seed/42/800"
        ],
        quantity: 35,
        ratings: 4.6,
        category: "women",
        size: "One Size",
        color: "Brown",
        brand: "Michael Kors",
        description: "Premium leather crossbody bag with adjustable strap. Multiple compartments for organized storage.",
        specifications: {
            "Material": "Genuine Leather",
            "Dimensions": "9\" x 7\" x 3\"",
            "Strap": "Adjustable, 45\" max",
            "Care": "Wipe with dry cloth",
            "Origin": "Made in Italy"
        },
        availableSizes: ["One Size"],
        availableColors: ["Brown", "Black", "Tan", "Red"]
    },
    {
        id: 5,
        name: "Kids Graphic Hoodie",
        slug: "kids-graphic-hoodie",
        price: 39.99,
        isDiscounted: true,
        discountPrice: 29.99,
        images: [
            "https://picsum.photos/seed/10/800",
            "https://picsum.photos/seed/11/800",
            "https://picsum.photos/seed/12/800"
        ],
        quantity: 120,
        ratings: 4.4,
        category: "kids",
        size: "8-10Y",
        color: "Red",
        brand: "Gap Kids",
        description: "Comfortable hoodie with fun graphic print. Soft fleece lining keeps kids warm and cozy.",
        specifications: {
            "Material": "80% Cotton, 20% Polyester",
            "Fit": "Regular",
            "Features": "Kangaroo pocket, drawstring hood",
            "Care": "Machine washable",
            "Origin": "Made in Vietnam"
        },
        availableSizes: ["4-6Y", "6-8Y", "8-10Y", "10-12Y", "12-14Y"],
        availableColors: ["Red", "Blue", "Gray", "Black", "Green"]
    },
    {
        id: 6,
        name: "Wireless Bluetooth Headphones",
        slug: "wireless-bluetooth-headphones",
        price: 199.99,
        isDiscounted: true,
        discountPrice: 149.99,
        images: [
            "https://picsum.photos/seed/60/800",
            "https://picsum.photos/seed/61/800",
            "https://picsum.photos/seed/62/800"
        ],
        quantity: 45,
        ratings: 4.9,
        category: "electronics",
        size: "One Size",
        color: "Black",
        brand: "Sony",
        description: "Premium wireless headphones with active noise cancellation. 30-hour battery life and superior sound quality.",
        specifications: {
            "Connectivity": "Bluetooth 5.0",
            "Battery": "30 hours playback",
            "Charging": "USB-C fast charge",
            "Features": "ANC, Voice Assistant",
            "Warranty": "2 years"
        },
        availableSizes: ["One Size"],
        availableColors: ["Black", "Silver", "White", "Blue"]
    },
    {
        id: 7,
        name: "Smart Fitness Watch",
        slug: "smart-fitness-watch",
        price: 299.99,
        isDiscounted: false,
        images: [
            "https://picsum.photos/seed/50/800",
            "https://picsum.photos/seed/51/800",
            "https://picsum.photos/seed/52/800"
        ],
        quantity: 30,
        ratings: 4.7,
        category: "electronics",
        size: "42mm",
        color: "Gray",
        brand: "Apple",
        description: "Advanced fitness tracking with heart rate monitor, GPS, and sleep analysis. Water resistant up to 50m.",
        specifications: {
            "Display": "AMOLED Retina",
            "Battery": "18 hours",
            "Sensors": "Heart rate, GPS, Gyroscope",
            "Compatibility": "iOS 14+",
            "Warranty": "1 year"
        },
        availableSizes: ["38mm", "42mm", "44mm"],
        availableColors: ["Gray", "Silver", "Gold"]
    },
    {
        id: 8,
        slug: "modern-floor-lamp",
        name: "Modern Floor Lamp",
        price: 129.99,
        isDiscounted: true,
        discountPrice: 99.99,
        images: [
            "https://picsum.photos/seed/70/800",
            "https://picsum.photos/seed/71/800",
            "https://picsum.photos/seed/72/800"
        ],
        quantity: 25,
        ratings: 4.5,
        category: "home",
        size: "60\" Height",
        color: "Silver",
        brand: "West Elm",
        description: "Contemporary floor lamp with adjustable head. Energy-efficient LED bulb included for bright, warm lighting.",
        specifications: {
            "Height": "60 inches",
            "Base": "10\" diameter weighted",
            "Bulb": "LED 15W included",
            "Switch": "Foot pedal on/off",
            "Assembly": "Minimal required"
        },
        availableSizes: ["60\" Height"],
        availableColors: ["Silver", "Black", "Gold", "White"]
    },
    {
        id: 9,
        slug: "ceramic-coffee-mug-set",
        name: "Ceramic Coffee Mug Set",
        price: 34.99,
        isDiscounted: false,
        images: [
            "https://picsum.photos/seed/80/800",
            "https://picsum.photos/seed/81/800",
            "https://picsum.photos/seed/82/800"
        ],
        quantity: 80,
        ratings: 4.3,
        category: "home",
        size: "12 oz",
        color: "White",
        brand: "Crate & Barrel",
        description: "Set of 4 elegant ceramic mugs. Microwave and dishwasher safe with comfortable handles.",
        specifications: {
            "Capacity": "12 oz each",
            "Material": "High-fired ceramic",
            "Care": "Dishwasher & microwave safe",
            "Set": "4 mugs included",
            "Origin": "Made in Portugal"
        },
        availableSizes: ["12 oz"],
        availableColors: ["White", "Gray", "Blue", "Green"]
    },
    {
        id: 10,
        name: "Running Shoes - Trail Edition",
        slug: "running-shoes-trail-edition",
        price: 119.99,
        isDiscounted: true,
        discountPrice: 89.99,
        images: [
            "https://picsum.photos/seed/90/800",
            "https://picsum.photos/seed/91/800",
            "https://picsum.photos/seed/92/800"
        ],
        quantity: 65,
        ratings: 4.8,
        category: "sports",
        size: "US 10",
        color: "Orange",
        brand: "Adidas",
        description: "High-performance trail running shoes with superior grip and cushioning. Waterproof and breathable mesh upper.",
        specifications: {
            "Upper": "Waterproof mesh",
            "Sole": "Continental rubber grip",
            "Drop": "8mm heel-to-toe",
            "Weight": "10.5 oz (size 9)",
            "Activity": "Trail running, hiking"
        },
        availableSizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
        availableColors: ["Orange", "Black", "Blue", "Green"]
    }
];

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

        return { success: true, message: "Data fetched successfully", data: dummyProducts.find((p) => p.slug === url) };

    } catch (error: unknown) {
        if (error instanceof Error)
            return { success: false, message: error.message || "Something went wrong, Please try again!" };
    }
};

interface GetAllDataParams extends QueryParams { url: string; }
export const getAllData = async ({ url, searchQueries, filterQueries, sortQueries, customQuery }: GetAllDataParams) => {

    if (!url) return { success: false, error: 'URL parameter is required' };

    // console.log(searchQueries, filterQueries, sortQueries, customQuery);

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

    // eslint-disable-next-line no-useless-catch
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
