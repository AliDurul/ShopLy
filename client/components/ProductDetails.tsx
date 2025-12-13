'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductDetailsProps {
    product: any;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            {/* Description Tab */}
            <TabsContent value="description" className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {product.description ||
                            `Experience premium quality with our ${product.name}. Designed for comfort and style, this product combines modern aesthetics with practical functionality. 
                            
Perfect for everyday wear, this item is crafted from high-quality materials ensuring durability and longevity. The attention to detail in every stitch makes this a versatile choice for any occasion.

Whether you're looking for casual comfort or sophisticated elegance, this ${product.name} delivers on both fronts. Its timeless design ensures it remains a staple in your wardrobe for years to come.`}
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3 mt-6">Key Features</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Premium quality materials for superior comfort and durability</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Modern design that complements any style preference</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Easy care and maintenance for long-lasting wear</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Versatile design suitable for various occasions</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Available in multiple sizes and colors</span>
                        </li>
                    </ul>
                </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specifications" className="space-y-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b">
                                <td className="py-3 font-semibold w-1/3">Product Name</td>
                                <td className="py-3 text-muted-foreground">{product.name}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">Brand</td>
                                <td className="py-3 text-muted-foreground">{product.brand}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">Material</td>
                                <td className="py-3 text-muted-foreground">100% Premium Cotton</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">Available Sizes</td>
                                <td className="py-3 text-muted-foreground">XS, S, M, L, XL, XXL</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">Available Colors</td>
                                <td className="py-3 text-muted-foreground">Black, White, Blue, Gray, Red, Navy</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">Care Instructions</td>
                                <td className="py-3 text-muted-foreground">Machine wash cold, tumble dry low</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">SKU</td>
                                <td className="py-3 text-muted-foreground">SKU-{product.id}</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-semibold">Weight</td>
                                <td className="py-3 text-muted-foreground">Approx. 200g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </TabsContent>

            {/* Shipping & Returns Tab */}
            <TabsContent value="shipping" className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Standard Shipping:</strong> 5-7 business days</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Express Shipping:</strong> 2-3 business days</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Overnight Shipping:</strong> Next business day</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">✓</span>
                            <span><strong>Free Shipping:</strong> On orders over $50</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Return Policy</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we offer a hassle-free return policy.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>30-day return window from the date of purchase</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Items must be unworn, unwashed, and in original condition</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Free return shipping for defective items</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mr-2">•</span>
                            <span>Full refund issued within 5-7 business days of receipt</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Exchange Policy</h3>
                    <p className="text-sm text-muted-foreground">
                        Want a different size or color? We offer free exchanges within 30 days of purchase. Simply contact our customer service team and we'll arrange the swap for you.
                    </p>
                </div>
            </TabsContent>
        </Tabs>
    );
}
