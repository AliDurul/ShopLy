'use client';

import { useState } from 'react';
import {
    Search,
    MoreHorizontal,
    Eye,
    Mail,
    Ban,
    UserCheck,
    Users,
    UserPlus,
    ShoppingBag,
    DollarSign,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

interface Customer {
    id: string;
    name: string;
    email: string;
    avatar: string;
    phone: string;
    orders: number;
    totalSpent: number;
    status: 'active' | 'inactive' | 'blocked';
    joinDate: string;
    lastOrder: string;
}

// Demo customers data
const demoCustomers: Customer[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '',
        phone: '+1 (555) 123-4567',
        orders: 24,
        totalSpent: 2456.89,
        status: 'active',
        joinDate: '2024-03-15',
        lastOrder: '2026-01-02',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: '',
        phone: '+1 (555) 234-5678',
        orders: 18,
        totalSpent: 1890.50,
        status: 'active',
        joinDate: '2024-05-20',
        lastOrder: '2026-01-01',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        avatar: '',
        phone: '+1 (555) 345-6789',
        orders: 7,
        totalSpent: 567.25,
        status: 'active',
        joinDate: '2025-01-10',
        lastOrder: '2025-12-28',
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.w@example.com',
        avatar: '',
        phone: '+1 (555) 456-7890',
        orders: 42,
        totalSpent: 4521.00,
        status: 'active',
        joinDate: '2023-11-05',
        lastOrder: '2025-12-30',
    },
    {
        id: '5',
        name: 'Tom Brown',
        email: 'tom.brown@example.com',
        avatar: '',
        phone: '+1 (555) 567-8901',
        orders: 3,
        totalSpent: 189.99,
        status: 'inactive',
        joinDate: '2025-06-15',
        lastOrder: '2025-08-20',
    },
    {
        id: '6',
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        avatar: '',
        phone: '+1 (555) 678-9012',
        orders: 0,
        totalSpent: 0,
        status: 'blocked',
        joinDate: '2025-09-01',
        lastOrder: '-',
    },
    {
        id: '7',
        name: 'Chris Lee',
        email: 'chris.lee@example.com',
        avatar: '',
        phone: '+1 (555) 789-0123',
        orders: 15,
        totalSpent: 1234.56,
        status: 'active',
        joinDate: '2024-07-22',
        lastOrder: '2025-12-25',
    },
    {
        id: '8',
        name: 'Amanda White',
        email: 'amanda.w@example.com',
        avatar: '',
        phone: '+1 (555) 890-1234',
        orders: 9,
        totalSpent: 876.43,
        status: 'active',
        joinDate: '2024-12-01',
        lastOrder: '2025-12-15',
    },
];

const statusConfig: Record<string, { label: string; className: string }> = {
    active: { label: 'Active', className: 'bg-green-100 text-green-800' },
    inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800' },
    blocked: { label: 'Blocked', className: 'bg-red-100 text-red-800' },
};

export default function AdminCustomersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const filteredCustomers = demoCustomers
        .filter((customer) => {
            const matchesSearch =
                customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.phone.includes(searchQuery);
            const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
                case 'oldest':
                    return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
                case 'most-orders':
                    return b.orders - a.orders;
                case 'highest-spent':
                    return b.totalSpent - a.totalSpent;
                default:
                    return 0;
            }
        });

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const totalCustomers = demoCustomers.length;
    const activeCustomers = demoCustomers.filter(c => c.status === 'active').length;
    const totalRevenue = demoCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue = totalRevenue / demoCustomers.reduce((sum, c) => sum + c.orders, 0) || 0;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="size-8 text-primary" />
                        Customers
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your customer base
                    </p>
                </div>
                <Button>
                    <UserPlus className="size-4 mr-2" />
                    Add Customer
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Customers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{totalCustomers}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Customers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-green-600">{activeCustomers}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">${totalRevenue.toLocaleString()}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg. Order Value
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</span>
                    </CardContent>
                </Card>
            </div>

            {/* Customers Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search customers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="blocked">Blocked</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="most-orders">Most Orders</SelectItem>
                                    <SelectItem value="highest-spent">Highest Spent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Total Spent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Last Order</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCustomers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            No customers found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-10">
                                                        <AvatarImage src={customer.avatar} />
                                                        <AvatarFallback>
                                                            {getInitials(customer.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{customer.name}</p>
                                                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {customer.phone}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <ShoppingBag className="size-4 text-muted-foreground" />
                                                    {customer.orders}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 font-medium">
                                                    <DollarSign className="size-4 text-muted-foreground" />
                                                    {customer.totalSpent.toLocaleString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={statusConfig[customer.status].className} variant="secondary">
                                                    {statusConfig[customer.status].label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(customer.joinDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {customer.lastOrder === '-' ? '-' : new Date(customer.lastOrder).toLocaleDateString()}
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
                                                            View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Mail className="mr-2 size-4" />
                                                            Send Email
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ShoppingBag className="mr-2 size-4" />
                                                            View Orders
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        {customer.status === 'blocked' ? (
                                                            <DropdownMenuItem>
                                                                <UserCheck className="mr-2 size-4" />
                                                                Unblock Customer
                                                            </DropdownMenuItem>
                                                        ) : (
                                                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                                <Ban className="mr-2 size-4" />
                                                                Block Customer
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredCustomers.length} of {demoCustomers.length} customers
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
                </CardContent>
            </Card>
        </div>
    );
}
