'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
    Package,
    ShoppingBag,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    ChevronRight,
    Search,
    Filter,
    Calendar,
    MapPin,
    Eye,
    RotateCcw,
    Download,
    Star,
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Input } from '@workspace/ui/components/input';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Separator } from '@workspace/ui/components/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@workspace/ui/components/dialog';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@workspace/ui/components/collapsible';
import { formatCurrency } from '@/lib/utils';

// Order status types
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
}

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    shippingAddress: {
        name: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    deliveredAt?: string;
}

// Demo orders data
const demoOrders: Order[] = [
    {
        id: '1',
        orderNumber: 'ORD-2026-001234',
        date: '2025-12-28',
        status: 'shipped',
        items: [
            { id: 1, name: 'Premium Cotton T-Shirt', image: '/on.jpg', price: 29.99, quantity: 2, size: 'M', color: 'Black' },
            { id: 2, name: 'Slim Fit Jeans', image: '/arka.jpg', price: 59.99, quantity: 1, size: '32', color: 'Blue' },
        ],
        subtotal: 119.97,
        shipping: 5.99,
        tax: 9.60,
        discount: 10.00,
        total: 125.56,
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        paymentMethod: 'Visa ending in 4242',
        trackingNumber: 'TRK9876543210',
        estimatedDelivery: '2026-01-05',
    },
    {
        id: '2',
        orderNumber: 'ORD-2026-001198',
        date: '2025-12-20',
        status: 'delivered',
        items: [
            { id: 3, name: 'Wireless Bluetooth Headphones', image: '/on.jpg', price: 149.99, quantity: 1 },
        ],
        subtotal: 149.99,
        shipping: 0,
        tax: 12.00,
        discount: 0,
        total: 161.99,
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        paymentMethod: 'Mastercard ending in 8888',
        deliveredAt: '2025-12-24',
    },
    {
        id: '3',
        orderNumber: 'ORD-2026-001156',
        date: '2025-12-15',
        status: 'delivered',
        items: [
            { id: 4, name: 'Running Shoes Pro', image: '/arka.jpg', price: 129.99, quantity: 1, size: '10', color: 'White' },
            { id: 5, name: 'Sports Socks (3-Pack)', image: '/on.jpg', price: 19.99, quantity: 2 },
        ],
        subtotal: 169.97,
        shipping: 5.99,
        tax: 13.60,
        discount: 20.00,
        total: 169.56,
        shippingAddress: {
            name: 'John Doe',
            street: '456 Work Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10002',
            country: 'United States',
        },
        paymentMethod: 'Cash on Delivery',
        deliveredAt: '2025-12-19',
    },
    {
        id: '4',
        orderNumber: 'ORD-2026-001089',
        date: '2025-12-10',
        status: 'cancelled',
        items: [
            { id: 6, name: 'Smart Watch Series 5', image: '/on.jpg', price: 299.99, quantity: 1 },
        ],
        subtotal: 299.99,
        shipping: 0,
        tax: 24.00,
        discount: 0,
        total: 323.99,
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        paymentMethod: 'Visa ending in 4242',
    },
    {
        id: '5',
        orderNumber: 'ORD-2026-001345',
        date: '2025-12-30',
        status: 'processing',
        items: [
            { id: 7, name: 'Winter Jacket', image: '/arka.jpg', price: 189.99, quantity: 1, size: 'L', color: 'Navy' },
        ],
        subtotal: 189.99,
        shipping: 9.99,
        tax: 15.20,
        discount: 0,
        total: 215.18,
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        paymentMethod: 'Airtel Money',
        estimatedDelivery: '2026-01-08',
    },
    {
        id: '6',
        orderNumber: 'ORD-2026-001400',
        date: '2026-01-02',
        status: 'pending',
        items: [
            { id: 8, name: 'Leather Wallet', image: '/on.jpg', price: 49.99, quantity: 1, color: 'Brown' },
            { id: 9, name: 'Leather Belt', image: '/arka.jpg', price: 39.99, quantity: 1, size: '34', color: 'Brown' },
        ],
        subtotal: 89.98,
        shipping: 4.99,
        tax: 7.20,
        discount: 0,
        total: 102.17,
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        paymentMethod: 'Cash on Delivery',
    },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType; bgColor: string }> = {
    pending: { label: 'Pending', color: 'text-yellow-600', icon: Clock, bgColor: 'bg-yellow-100' },
    processing: { label: 'Processing', color: 'text-blue-600', icon: Package, bgColor: 'bg-blue-100' },
    shipped: { label: 'Shipped', color: 'text-purple-600', icon: Truck, bgColor: 'bg-purple-100' },
    delivered: { label: 'Delivered', color: 'text-green-600', icon: CheckCircle, bgColor: 'bg-green-100' },
    cancelled: { label: 'Cancelled', color: 'text-red-600', icon: XCircle, bgColor: 'bg-red-100' },
};

export default function MyOrdersPage() {
    const [isLoading] = useState(false);
    const [orders] = useState<Order[]>(demoOrders);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedTab, setSelectedTab] = useState('all');

    // Filter orders based on tab and search
    const filteredOrders = orders
        .filter(order => {
            if (selectedTab !== 'all' && order.status !== selectedTab) return false;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    order.orderNumber.toLowerCase().includes(query) ||
                    order.items.some(item => item.name.toLowerCase().includes(query))
                );
            }
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
            if (sortBy === 'highest') return b.total - a.total;
            if (sortBy === 'lowest') return a.total - b.total;
            return 0;
        });

    // Count orders by status
    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex-1 min-w-0 space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="flex gap-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="p-4">
                            <div className="flex gap-4">
                                <Skeleton className="w-20 h-20 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-1/3" />
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-0 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Package className="size-6 text-primary" />
                        My Orders
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Track and manage your orders
                    </p>
                </div>
                {/* Quick Stats */}
                <div className="flex gap-3">
                    <div className="text-center px-4 py-2 bg-primary/10 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{statusCounts.all}</p>
                        <p className="text-xs text-muted-foreground">Total Orders</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-green-100 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{statusCounts.delivered}</p>
                        <p className="text-xs text-muted-foreground">Delivered</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders by ID or product name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="size-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="highest">Highest Amount</SelectItem>
                        <SelectItem value="lowest">Lowest Amount</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Status Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
                    <TabsTrigger value="all" className="gap-2">
                        All <Badge variant="secondary" className="ml-1">{statusCounts.all}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="gap-2">
                        Pending <Badge variant="secondary" className="ml-1">{statusCounts.pending}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="processing" className="gap-2">
                        Processing <Badge variant="secondary" className="ml-1">{statusCounts.processing}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="shipped" className="gap-2">
                        Shipped <Badge variant="secondary" className="ml-1">{statusCounts.shipped}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="delivered" className="gap-2">
                        Delivered <Badge variant="secondary" className="ml-1">{statusCounts.delivered}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="cancelled" className="gap-2">
                        Cancelled <Badge variant="secondary" className="ml-1">{statusCounts.cancelled}</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="mt-6">
                    {/* Empty State */}
                    {filteredOrders.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="rounded-full bg-muted p-6 mb-4">
                                <Package className="size-12 text-muted-foreground" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">
                                {searchQuery ? 'No orders found' : 'No orders yet'}
                            </h2>
                            <p className="text-muted-foreground mb-6 max-w-md">
                                {searchQuery
                                    ? `We couldn't find any orders matching "${searchQuery}"`
                                    : 'When you place orders, they will appear here.'}
                            </p>
                            <Button asChild>
                                <Link href="/products">
                                    <ShoppingBag className="size-4 mr-2" />
                                    Start Shopping
                                </Link>
                            </Button>
                        </div>
                    )}

                    {/* Orders List */}
                    {filteredOrders.length > 0 && (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Order Card Component
function OrderCard({ order }: { order: Order }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const status = statusConfig[order.status];
    const StatusIcon = status.icon;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Card className="overflow-hidden">
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                {/* Order Header */}
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${status.bgColor}`}>
                                <StatusIcon className={`size-5 ${status.color}`} />
                            </div>
                            <div>
                                <p className="font-semibold">{order.orderNumber}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="size-3" />
                                    <span>{formatDate(order.date)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge className={`${status.bgColor} ${status.color} border-0`}>
                                {status.label}
                            </Badge>
                            <span className="font-bold text-lg">{formatCurrency(order.total)}</span>
                        </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {order.items.slice(0, 3).map((item, index) => (
                                <div
                                    key={item.id}
                                    className="relative w-12 h-12 rounded-lg border-2 border-white overflow-hidden bg-muted"
                                    style={{ zIndex: 3 - index }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            {order.items.length > 3 && (
                                <div className="w-12 h-12 rounded-lg border-2 border-white bg-muted flex items-center justify-center text-sm font-medium">
                                    +{order.items.length - 3}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">
                                {order.items.map(i => i.name).join(', ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                            </p>
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <span className="mr-1">{isExpanded ? 'Less' : 'Details'}</span>
                                <ChevronRight className={`size-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    {/* Tracking Info for Shipped Orders */}
                    {order.status === 'shipped' && order.trackingNumber && (
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Truck className="size-4 text-purple-600" />
                                <span className="text-sm">
                                    Tracking: <span className="font-mono font-medium">{order.trackingNumber}</span>
                                </span>
                            </div>
                            {order.estimatedDelivery && (
                                <span className="text-sm text-muted-foreground">
                                    Est. delivery: {formatDate(order.estimatedDelivery)}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Delivery Info for Delivered Orders */}
                    {order.status === 'delivered' && order.deliveredAt && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                            <CheckCircle className="size-4 text-green-600" />
                            <span className="text-sm text-green-700">
                                Delivered on {formatDate(order.deliveredAt)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Expanded Details */}
                <CollapsibleContent>
                    <Separator />
                    <div className="p-4 sm:p-6 bg-muted/30 space-y-6">
                        {/* Order Items */}
                        <div>
                            <h4 className="font-semibold mb-3">Order Items</h4>
                            <div className="space-y-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 bg-background p-3 rounded-lg">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{item.name}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                {item.size && <span>Size: {item.size}</span>}
                                                {item.color && <span>Color: {item.color}</span>}
                                            </div>
                                            <p className="text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Shipping Address */}
                            <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <MapPin className="size-4" />
                                    Shipping Address
                                </h4>
                                <div className="text-sm text-muted-foreground bg-background p-3 rounded-lg">
                                    <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
                                    <p>{order.shippingAddress.street}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div>
                                <h4 className="font-semibold mb-3">Order Summary</h4>
                                <div className="bg-background p-3 rounded-lg space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatCurrency(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>{formatCurrency(order.tax)}</span>
                                    </div>
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-{formatCurrency(order.discount)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>{formatCurrency(order.total)}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground pt-2">
                                        Paid via {order.paymentMethod}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {order.status === 'delivered' && (
                                <>
                                    <Button variant="outline" size="sm">
                                        <Star className="size-4 mr-2" />
                                        Write Review
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <RotateCcw className="size-4 mr-2" />
                                        Return Items
                                    </Button>
                                </>
                            )}
                            {order.status === 'shipped' && (
                                <Button variant="outline" size="sm">
                                    <Truck className="size-4 mr-2" />
                                    Track Package
                                </Button>
                            )}
                            {(order.status === 'pending' || order.status === 'processing') && (
                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                    <XCircle className="size-4 mr-2" />
                                    Cancel Order
                                </Button>
                            )}
                            <Button variant="outline" size="sm">
                                <Download className="size-4 mr-2" />
                                Download Invoice
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Eye className="size-4 mr-2" />
                                        View Details
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Order {order.orderNumber}</DialogTitle>
                                        <DialogDescription>
                                            Placed on {formatDate(order.date)}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        {/* Full order details in dialog */}
                                        <div className="flex items-center gap-2">
                                            <Badge className={`${status.bgColor} ${status.color} border-0`}>
                                                {status.label}
                                            </Badge>
                                            <span className="text-muted-foreground text-sm">
                                                {order.items.reduce((sum, i) => sum + i.quantity, 0)} items • {formatCurrency(order.total)}
                                            </span>
                                        </div>
                                        <Separator />
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.size && `Size: ${item.size}`} {item.color && `• Color: ${item.color}`}
                                                    </p>
                                                    <p className="text-sm">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                                                </div>
                                                <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                            {order.status === 'delivered' && (
                                <Button size="sm">
                                    <RotateCcw className="size-4 mr-2" />
                                    Buy Again
                                </Button>
                            )}
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}
