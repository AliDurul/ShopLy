'use client';

import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Eye,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import Link from 'next/link';

// Demo stats data
const statsData = [
    {
        title: 'Total Revenue',
        value: '$45,231.89',
        change: '+20.1%',
        trend: 'up',
        icon: DollarSign,
        description: 'from last month',
    },
    {
        title: 'Orders',
        value: '2,350',
        change: '+15.2%',
        trend: 'up',
        icon: ShoppingCart,
        description: 'from last month',
    },
    {
        title: 'Customers',
        value: '12,234',
        change: '+4.5%',
        trend: 'up',
        icon: Users,
        description: 'from last month',
    },
    {
        title: 'Products',
        value: '573',
        change: '-2.4%',
        trend: 'down',
        icon: Package,
        description: 'from last month',
    },
];

// Demo recent orders
const recentOrders = [
    {
        id: 'ORD-001',
        customer: { name: 'John Doe', email: 'john@example.com', avatar: '' },
        product: 'Premium T-Shirt',
        amount: '$129.99',
        status: 'completed',
        date: '2 min ago',
    },
    {
        id: 'ORD-002',
        customer: { name: 'Jane Smith', email: 'jane@example.com', avatar: '' },
        product: 'Wireless Headphones',
        amount: '$249.99',
        status: 'processing',
        date: '15 min ago',
    },
    {
        id: 'ORD-003',
        customer: { name: 'Mike Johnson', email: 'mike@example.com', avatar: '' },
        product: 'Running Shoes',
        amount: '$189.99',
        status: 'pending',
        date: '1 hour ago',
    },
    {
        id: 'ORD-004',
        customer: { name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '' },
        product: 'Smart Watch',
        amount: '$399.99',
        status: 'shipped',
        date: '2 hours ago',
    },
    {
        id: 'ORD-005',
        customer: { name: 'Tom Brown', email: 'tom@example.com', avatar: '' },
        product: 'Leather Jacket',
        amount: '$299.99',
        status: 'completed',
        date: '3 hours ago',
    },
];

// Demo top products
const topProducts = [
    { name: 'Premium Cotton T-Shirt', sales: 1234, revenue: '$12,340', image: '/on.jpg' },
    { name: 'Wireless Bluetooth Headphones', sales: 987, revenue: '$98,700', image: '/arka.jpg' },
    { name: 'Running Shoes Pro', sales: 765, revenue: '$76,500', image: '/on.jpg' },
    { name: 'Smart Watch Series 5', sales: 543, revenue: '$54,300', image: '/arka.jpg' },
    { name: 'Leather Wallet', sales: 432, revenue: '$21,600', image: '/on.jpg' },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function AdminDashboardPage() {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here&apos;s an overview of your store.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat) => {
                    const Icon = stat.icon;
                    const isUp = stat.trend === 'up';
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Icon className="size-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    {isUp ? (
                                        <ArrowUpRight className="size-3 text-green-500" />
                                    ) : (
                                        <ArrowDownRight className="size-3 text-red-500" />
                                    )}
                                    <span className={isUp ? 'text-green-500' : 'text-red-500'}>
                                        {stat.change}
                                    </span>
                                    <span>{stat.description}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Recent Orders */}
                <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest orders from your store</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/orders">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="hidden sm:table-cell">Product</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-8">
                                                    <AvatarImage src={order.customer.avatar} />
                                                    <AvatarFallback className="text-xs">
                                                        {getInitials(order.customer.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="hidden sm:block">
                                                    <p className="text-sm font-medium">{order.customer.name}</p>
                                                    <p className="text-xs text-muted-foreground">{order.id}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <span className="text-sm">{order.product}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={statusColors[order.status]} variant="secondary">
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {order.amount}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 size-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Top Products */}
                <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Top Products</CardTitle>
                            <CardDescription>Best selling products this month</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/products">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div key={product.name} className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-muted-foreground w-4">
                                        {index + 1}
                                    </span>
                                    <Avatar className="size-10 rounded-lg">
                                        <AvatarImage src={product.image} className="object-cover" />
                                        <AvatarFallback className="rounded-lg">
                                            {product.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {product.sales.toLocaleString()} sales
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{product.revenue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">23</span>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/orders?status=pending">Process</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Low Stock Items
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-orange-500">8</span>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/products?stock=low">Restock</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            New Reviews
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">45</span>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/reviews">Review</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Conversion Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">3.24%</span>
                            <div className="flex items-center text-green-500">
                                <TrendingUp className="size-4" />
                                <span className="text-xs">+0.5%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
