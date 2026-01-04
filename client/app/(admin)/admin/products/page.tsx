'use client';

import { useState } from 'react';
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Eye,
    Copy,
    ArrowUpDown,
    Package,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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

// Demo products data
const demoProducts = [
    {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        sku: 'TSH-001',
        image: '/on.jpg',
        price: 29.99,
        stock: 150,
        category: 'Clothing',
        status: 'active',
        sales: 234,
    },
    {
        id: 2,
        name: 'Wireless Bluetooth Headphones',
        sku: 'HDP-002',
        image: '/arka.jpg',
        price: 149.99,
        stock: 45,
        category: 'Electronics',
        status: 'active',
        sales: 189,
    },
    {
        id: 3,
        name: 'Running Shoes Pro',
        sku: 'SHO-003',
        image: '/on.jpg',
        price: 129.99,
        stock: 8,
        category: 'Footwear',
        status: 'low-stock',
        sales: 156,
    },
    {
        id: 4,
        name: 'Smart Watch Series 5',
        sku: 'WAT-004',
        image: '/arka.jpg',
        price: 299.99,
        stock: 0,
        category: 'Electronics',
        status: 'out-of-stock',
        sales: 98,
    },
    {
        id: 5,
        name: 'Leather Wallet',
        sku: 'WAL-005',
        image: '/on.jpg',
        price: 49.99,
        stock: 200,
        category: 'Accessories',
        status: 'active',
        sales: 312,
    },
    {
        id: 6,
        name: 'Slim Fit Jeans',
        sku: 'JNS-006',
        image: '/arka.jpg',
        price: 59.99,
        stock: 75,
        category: 'Clothing',
        status: 'active',
        sales: 267,
    },
    {
        id: 7,
        name: 'Laptop Backpack',
        sku: 'BAG-007',
        image: '/on.jpg',
        price: 79.99,
        stock: 3,
        category: 'Accessories',
        status: 'low-stock',
        sales: 145,
    },
    {
        id: 8,
        name: 'Winter Jacket',
        sku: 'JKT-008',
        image: '/arka.jpg',
        price: 189.99,
        stock: 25,
        category: 'Clothing',
        status: 'draft',
        sales: 0,
    },
];

const statusConfig: Record<string, { label: string; className: string }> = {
    active: { label: 'Active', className: 'bg-green-100 text-green-800' },
    draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
    'low-stock': { label: 'Low Stock', className: 'bg-orange-100 text-orange-800' },
    'out-of-stock': { label: 'Out of Stock', className: 'bg-red-100 text-red-800' },
};

export default function AdminProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const filteredProducts = demoProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const toggleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map(p => p.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedProducts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const categories = [...new Set(demoProducts.map(p => p.category))];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Package className="size-8 text-primary" />
                        Products
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your product inventory
                    </p>
                </div>
                <Button>
                    <Plus className="size-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{demoProducts.length}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-green-600">
                            {demoProducts.filter(p => p.status === 'active').length}
                        </span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Low Stock
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-orange-600">
                            {demoProducts.filter(p => p.status === 'low-stock').length}
                        </span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Out of Stock
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold text-red-600">
                            {demoProducts.filter(p => p.status === 'out-of-stock').length}
                        </span>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Search */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
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
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="low-stock">Low Stock</SelectItem>
                                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Bulk Actions */}
                    {selectedProducts.length > 0 && (
                        <div className="flex items-center gap-2 mb-4 p-2 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">
                                {selectedProducts.length} selected
                            </span>
                            <Button variant="outline" size="sm">
                                Bulk Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                                Delete Selected
                            </Button>
                        </div>
                    )}

                    {/* Products Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>
                                        <Button variant="ghost" size="sm" className="-ml-3">
                                            Price
                                            <ArrowUpDown className="ml-1 size-3" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button variant="ghost" size="sm" className="-ml-3">
                                            Stock
                                            <ArrowUpDown className="ml-1 size-3" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Sales</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedProducts.includes(product.id)}
                                                onCheckedChange={() => toggleSelect(product.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-10 rounded-lg">
                                                    <AvatarImage src={product.image} className="object-cover" />
                                                    <AvatarFallback className="rounded-lg">
                                                        {product.name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{product.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {product.sku}
                                        </TableCell>
                                        <TableCell>${product.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <span className={product.stock <= 10 ? 'text-red-600 font-medium' : ''}>
                                                {product.stock}
                                            </span>
                                        </TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <Badge className={statusConfig[product.status].className} variant="secondary">
                                                {statusConfig[product.status].label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{product.sales}</TableCell>
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
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Pencil className="mr-2 size-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Copy className="mr-2 size-4" />
                                                        Duplicate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                        <Trash2 className="mr-2 size-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination placeholder */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredProducts.length} of {demoProducts.length} products
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
