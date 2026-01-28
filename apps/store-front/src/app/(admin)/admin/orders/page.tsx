'use client';

import { useState } from 'react';
import {
    Search,
    MoreHorizontal,
    Eye,
    Printer,
    Truck,
    XCircle,
    CheckCircle,
    Clock,
    Package,
    ShoppingCart,
    Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
    id: string;
    orderNumber: string;
    customer: {
        name: string;
        email: string;
        avatar: string;
    };
    items: number;
    total: number;
    status: OrderStatus;
    paymentMethod: string;
    date: string;
}

// Demo orders data
const demoOrders: Order[] = [
    {
        id: '1',
        orderNumber: 'ORD-2026-001234',
        customer: { name: 'John Doe', email: 'john@example.com', avatar: '' },
        items: 3,
        total: 125.56,
        status: 'pending',
        paymentMethod: 'Credit Card',
        date: '2026-01-03',
    },
    {
        id: '2',
        orderNumber: 'ORD-2026-001233',
        customer: { name: 'Jane Smith', email: 'jane@example.com', avatar: '' },
        items: 1,
        total: 249.99,
        status: 'processing',
        paymentMethod: 'PayPal',
        date: '2026-01-03',
    },
    {
        id: '3',
        orderNumber: 'ORD-2026-001232',
        customer: { name: 'Mike Johnson', email: 'mike@example.com', avatar: '' },
        items: 2,
        total: 89.98,
        status: 'shipped',
        paymentMethod: 'Credit Card',
        date: '2026-01-02',
    },
    {
        id: '4',
        orderNumber: 'ORD-2026-001231',
        customer: { name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '' },
        items: 5,
        total: 399.95,
        status: 'delivered',
        paymentMethod: 'Credit Card',
        date: '2026-01-01',
    },
    {
        id: '5',
        orderNumber: 'ORD-2026-001230',
        customer: { name: 'Tom Brown', email: 'tom@example.com', avatar: '' },
        items: 1,
        total: 299.99,
        status: 'cancelled',
        paymentMethod: 'PayPal',
        date: '2025-12-31',
    },
    {
        id: '6',
        orderNumber: 'ORD-2026-001229',
        customer: { name: 'Emily Davis', email: 'emily@example.com', avatar: '' },
        items: 2,
        total: 159.98,
        status: 'delivered',
        paymentMethod: 'Credit Card',
        date: '2025-12-30',
    },
    {
        id: '7',
        orderNumber: 'ORD-2026-001228',
        customer: { name: 'Chris Lee', email: 'chris@example.com', avatar: '' },
        items: 4,
        total: 219.96,
        status: 'shipped',
        paymentMethod: 'Cash on Delivery',
        date: '2025-12-29',
    },
    {
        id: '8',
        orderNumber: 'ORD-2026-001227',
        customer: { name: 'Amanda White', email: 'amanda@example.com', avatar: '' },
        items: 1,
        total: 79.99,
        status: 'processing',
        paymentMethod: 'Credit Card',
        date: '2025-12-28',
    },
];

const statusConfig: Record<OrderStatus, { label: string; className: string; icon: React.ElementType }> = {
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
    processing: { label: 'Processing', className: 'bg-blue-100 text-blue-800', icon: Package },
    shipped: { label: 'Shipped', className: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function AdminOrdersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const filteredOrders = demoOrders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = selectedTab === 'all' || order.status === selectedTab;
        return matchesSearch && matchesTab;
    });

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const statusCounts = {
        all: demoOrders.length,
        pending: demoOrders.filter(o => o.status === 'pending').length,
        processing: demoOrders.filter(o => o.status === 'processing').length,
        shipped: demoOrders.filter(o => o.status === 'shipped').length,
        delivered: demoOrders.filter(o => o.status === 'delivered').length,
        cancelled: demoOrders.filter(o => o.status === 'cancelled').length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <ShoppingCart className="size-8 text-primary" />
                        Orders
                    </h1>
                    <p className="text-muted-foreground">
                        Manage and track customer orders
                    </p>
                </div>
                <Button variant="outline">
                    <Filter className="size-4 mr-2" />
                    Export Orders
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{demoOrders.length}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Processing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-blue-600">{statusCounts.processing}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Shipped
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-purple-600">{statusCounts.shipped}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Delivered
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-green-600">{statusCounts.delivered}</span>
                    </CardContent>
                </Card>
            </div>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Date Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                        <TabsList className="mb-4">
                            <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
                            <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
                            <TabsTrigger value="processing">Processing ({statusCounts.processing})</TabsTrigger>
                            <TabsTrigger value="shipped">Shipped ({statusCounts.shipped})</TabsTrigger>
                            <TabsTrigger value="delivered">Delivered ({statusCounts.delivered})</TabsTrigger>
                        </TabsList>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                                No orders found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredOrders.map((order) => {
                                            const StatusIcon = statusConfig[order.status].icon;
                                            return (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">
                                                        {order.orderNumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="size-8">
                                                                <AvatarImage src={order.customer.avatar} />
                                                                <AvatarFallback className="text-xs">
                                                                    {getInitials(order.customer.name)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-sm font-medium">{order.customer.name}</p>
                                                                <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{order.items}</TableCell>
                                                    <TableCell className="font-medium">
                                                        ${order.total.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={statusConfig[order.status].className} variant="secondary">
                                                            <StatusIcon className="size-3 mr-1" />
                                                            {statusConfig[order.status].label}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {order.paymentMethod}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {new Date(order.date).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="size-8">
                                                                    <MoreHorizontal className="size-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <Eye className="mr-2 size-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Printer className="mr-2 size-4" />
                                                                    Print Invoice
                                                                </DropdownMenuItem>
                                                                {order.status === 'pending' && (
                                                                    <DropdownMenuItem>
                                                                        <Package className="mr-2 size-4" />
                                                                        Process Order
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {order.status === 'processing' && (
                                                                    <DropdownMenuItem>
                                                                        <Truck className="mr-2 size-4" />
                                                                        Mark as Shipped
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {(order.status === 'pending' || order.status === 'processing') && (
                                                                    <>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                                            <XCircle className="mr-2 size-4" />
                                                                            Cancel Order
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-muted-foreground">
                                Showing {filteredOrders.length} of {demoOrders.length} orders
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
