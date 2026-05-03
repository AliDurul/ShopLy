"use client";
import React from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Tag, Truck, BadgeDollarSign, Boxes, RotateCcw } from "lucide-react";

interface FeatureItem {
    id: number;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    accent?: string;
}

const FEATURES: FeatureItem[] = [
    {
        id: 1,
        title: "Best prices & offers",
        subtitle: "Orders $50 or more",
        icon: <Tag className="size-6" />,
        accent: "bg-primary/10 text-primary",
    },
    {
        id: 2,
        title: "Free delivery",
        subtitle: "Orders $50 or more",
        icon: <Truck className="size-6" />,
        accent: "bg-secondary/10 text-secondary",
    },
    {
        id: 3,
        title: "Great daily deal",
        subtitle: "Orders $50 or more",
        icon: <BadgeDollarSign className="size-6" />,
        accent: "bg-accent/10 text-accent-foreground",
    },
    {
        id: 4,
        title: "Wide assortment",
        subtitle: "Orders $50 or more",
        icon: <Boxes className="size-6" />,
        accent: "bg-primary/10 text-primary",
    },
    {
        id: 5,
        title: "Easy returns",
        subtitle: "Orders $50 or more",
        icon: <RotateCcw className="size-6" />,
        accent: "bg-secondary/10 text-secondary",
    },
];

export function FeatureStrip() {
    return (
        <section
            aria-labelledby="benefits-heading"
            className="w-full px-10 mx-auto  max-w-7xl "
        >
            <h2 id="benefits-heading" className="sr-only">
                Shopping benefits
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {FEATURES.map((f) => (
                    <Card
                        key={f.id}
                        className="group relative overflow-hidden border border-neutral-200/60 bg-background/60 backdrop-blur-sm transition-colors hover:border-primary/40"
                    >
                        <CardContent className="flex items-start gap-4 p-4">
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-lg shadow-inner ${f.accent} group-hover:scale-105 transition-transform`}
                                aria-hidden="true"
                            >
                                {f.icon}
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-sm md:text-base tracking-tight">
                                    {f.title}
                                </p>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    {f.subtitle}
                                </p>
                            </div>
                        </CardContent>
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10" />
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default FeatureStrip;