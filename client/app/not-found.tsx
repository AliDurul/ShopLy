import Link from 'next/link';
import { FileQuestion, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <main className="max-w-7xl mx-auto p-5 min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="flex justify-center">
                    <div className="rounded-full bg-muted p-6">
                        <FileQuestion className="size-16 text-muted-foreground" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button asChild variant="default">
                        <Link href="/products">
                            <Search className="size-4 mr-2" />
                            Browse Products
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft className="size-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
