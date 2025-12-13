import { Suspense } from "react";
import ProdCarauselLinks from "./ProdCarauselLinks";
import ProdCarauselList from "./ProdCarauselList";



interface ProductCarauselProps {
    title: string;
    subTitle?: string;
    categories?: string[];
    products: unknown[];
}


export default function ProductCarausel({ title, subTitle, categories, products }: ProductCarauselProps) {

    return (
        <section className='bg-background px-10 w-full space-y-5'>
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className='min-w-fit'>
                    <h2 className='text-xl font-semibold capitalize items-start'>{title}</h2>
                    <p className='text-gray-400 text-base/normal'>{subTitle}</p>
                </div>
                {categories && <Suspense><ProdCarauselLinks categories={categories} /></Suspense>}
            </div>
            <ProdCarauselList products={products} />
        </section>
    )
}
