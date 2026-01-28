'use client';

import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Camera, Edit2, Save, X, Package, Heart, CreditCard, Shield, Bell, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Placeholder user data - replace with actual auth/API data
const initialUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    avatar: '',
    addresses: [
        {
            id: 1,
            type: 'Home',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            isDefault: true,
        },
        {
            id: 2,
            type: 'Work',
            street: '456 Business Ave, Suite 100',
            city: 'New York',
            state: 'NY',
            zipCode: '10002',
            country: 'United States',
            isDefault: false,
        },
    ],
    notifications: {
        orderUpdates: true,
        promotions: false,
        newsletter: true,
        smsAlerts: false,
    },
    stats: {
        totalOrders: 24,
        wishlistItems: 12,
        reviewsWritten: 8,
        memberSince: '2023',
    },
};

export default function MyProfilePage() {
    const [user, setUser] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(initialUserData);
    const [showPassword, setShowPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
        // TODO: API call to save user data
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const handleNotificationChange = (key: keyof typeof user.notifications) => {
        setUser(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key],
            },
        }));
    };

    return (
        <div className="flex-1 min-w-0 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <User className="size-6 text-primary" />
                        My Profile
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your personal information and preferences
                    </p>
                </div>
            </div>

            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-6">
                    {/* Profile Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details here</CardDescription>
                            </div>
                            {!isEditing ? (
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                    <Edit2 className="size-4 mr-2" />
                                    Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handleCancel}>
                                        <X className="size-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button size="sm" onClick={handleSave}>
                                        <Save className="size-4 mr-2" />
                                        Save
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Avatar className="size-24">
                                        <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="absolute -bottom-1 -right-1 size-8 rounded-full"
                                        >
                                            <Camera className="size-4" />
                                        </Button>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                                    <p className="text-muted-foreground">{user.email}</p>
                                    <Badge variant="secondary" className="mt-2">
                                        Member since {user.stats.memberSince}
                                    </Badge>
                                </div>
                            </div>

                            <Separator />

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    {isEditing ? (
                                        <Input
                                            id="firstName"
                                            value={editedUser.firstName}
                                            onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/50">
                                            <User className="size-4 text-muted-foreground" />
                                            <span>{user.firstName}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    {isEditing ? (
                                        <Input
                                            id="lastName"
                                            value={editedUser.lastName}
                                            onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/50">
                                            <User className="size-4 text-muted-foreground" />
                                            <span>{user.lastName}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    {isEditing ? (
                                        <Input
                                            id="email"
                                            type="email"
                                            value={editedUser.email}
                                            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/50">
                                            <Mail className="size-4 text-muted-foreground" />
                                            <span>{user.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    {isEditing ? (
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={editedUser.phone}
                                            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/50">
                                            <Phone className="size-4 text-muted-foreground" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    {isEditing ? (
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={editedUser.dateOfBirth}
                                            onChange={(e) => setEditedUser({ ...editedUser, dateOfBirth: e.target.value })}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/50">
                                            <Calendar className="size-4 text-muted-foreground" />
                                            <span>{new Date(user.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    {isEditing ? (
                                        <Select
                                            value={editedUser.gender}
                                            onValueChange={(value) => setEditedUser({ ...editedUser, gender: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted/50">
                                            <span className="capitalize">{user.gender}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Package className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{user.stats.totalOrders}</p>
                                        <p className="text-xs text-muted-foreground">Total Orders</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <Heart className="size-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{user.stats.wishlistItems}</p>
                                        <p className="text-xs text-muted-foreground">Wishlist Items</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <Edit2 className="size-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{user.stats.reviewsWritten}</p>
                                        <p className="text-xs text-muted-foreground">Reviews</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <CreditCard className="size-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">2</p>
                                        <p className="text-xs text-muted-foreground">Saved Cards</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Addresses Tab */}
                <TabsContent value="addresses" className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Saved Addresses</CardTitle>
                                <CardDescription>Manage your delivery addresses</CardDescription>
                            </div>
                            <Button size="sm">
                                <MapPin className="size-4 mr-2" />
                                Add New Address
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {user.addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-muted rounded-lg h-fit">
                                            <MapPin className="size-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold">{address.type}</h4>
                                                {address.isDefault && (
                                                    <Badge variant="secondary" className="text-xs">Default</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {address.street}<br />
                                                {address.city}, {address.state} {address.zipCode}<br />
                                                {address.country}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password to keep your account secure</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        placeholder="Enter current password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <Button className="mt-4">
                                <Shield className="size-4 mr-2" />
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>Add an extra layer of security to your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <Shield className="size-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Two-Factor Authentication</p>
                                        <p className="text-sm text-muted-foreground">
                                            Secure your account with 2FA
                                        </p>
                                    </div>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive/50">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>Irreversible actions for your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Delete Account</p>
                                    <p className="text-sm text-muted-foreground">
                                        Permanently delete your account and all associated data
                                    </p>
                                </div>
                                <Button variant="destructive">Delete Account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose what notifications you want to receive</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <Package className="size-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Order Updates</p>
                                        <p className="text-sm text-muted-foreground">
                                            Get notified about your order status
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={user.notifications.orderUpdates}
                                    onCheckedChange={() => handleNotificationChange('orderUpdates')}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <Bell className="size-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Promotions & Offers</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive exclusive deals and discounts
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={user.notifications.promotions}
                                    onCheckedChange={() => handleNotificationChange('promotions')}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <Mail className="size-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Newsletter</p>
                                        <p className="text-sm text-muted-foreground">
                                            Weekly updates on new products and trends
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={user.notifications.newsletter}
                                    onCheckedChange={() => handleNotificationChange('newsletter')}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <Phone className="size-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">SMS Alerts</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive important updates via SMS
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={user.notifications.smsAlerts}
                                    onCheckedChange={() => handleNotificationChange('smsAlerts')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
