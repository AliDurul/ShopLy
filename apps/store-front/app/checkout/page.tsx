'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ShoppingBag,
    MapPin,
    CreditCard,
    Truck,
    Shield,
    ChevronRight,
    Check,
    Tag,
    Plus,
    Trash2,
    ArrowLeft,
    Lock,
    Package,
    Clock,
    AlertCircle,
    Phone,
    Banknote,
    Smartphone,
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Badge } from '@workspace/ui/components/badge';
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Alert, AlertDescription } from '@workspace/ui/components/alert';
import { useCartItems, useCartHydrating, useCartSubtotal, useCartActions } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';

// Placeholder saved addresses
const savedAddresses = [
    {
        id: '1',
        type: 'Home',
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        phone: '+1 (555) 123-4567',
        isDefault: true,
    },
    {
        id: '2',
        type: 'Work',
        name: 'John Doe',
        street: '456 Business Ave, Suite 100',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'United States',
        phone: '+1 (555) 987-6543',
        isDefault: false,
    },
];

// Shipping options
const shippingOptions = [
    {
        id: 'standard',
        name: 'Standard Shipping',
        description: '5-7 business days',
        price: 5.99,
        icon: Package,
    },
    {
        id: 'express',
        name: 'Express Shipping',
        description: '2-3 business days',
        price: 12.99,
        icon: Truck,
    },
    {
        id: 'overnight',
        name: 'Overnight Shipping',
        description: 'Next business day',
        price: 24.99,
        icon: Clock,
    },
];

// Saved payment methods
const savedPaymentMethods = [
    {
        id: '1',
        type: 'visa',
        last4: '4242',
        expiry: '12/26',
        isDefault: true,
    },
    {
        id: '2',
        type: 'mastercard',
        last4: '8888',
        expiry: '08/25',
        isDefault: false,
    },
];

// Payment type options
const paymentTypes = [
    {
        id: 'cash',
        name: 'Cash on Delivery',
        description: 'Pay when you receive your order',
        icon: Package,
    },
    {
        id: 'airtel',
        name: 'Airtel Money',
        description: 'Pay via Airtel Money mobile wallet',
        icon: Phone,
    },
    {
        id: 'card',
        name: 'Credit/Debit Card',
        description: 'Pay securely with your card',
        icon: CreditCard,
    },
];

export default function CheckoutPage() {
    const router = useRouter();
    const items = useCartItems();
    const isHydrating = useCartHydrating();
    const subtotal = useCartSubtotal();
    const { removeCart, updateCart } = useCartActions();

    // Form states
    const [selectedAddress, setSelectedAddress] = useState(savedAddresses.find(a => a.isDefault)?.id || '');
    const [showNewAddress, setShowNewAddress] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState('standard');
    const [selectedPaymentType, setSelectedPaymentType] = useState<'cash' | 'airtel' | 'card'>('cash');
    const [selectedCard, setSelectedCard] = useState(savedPaymentMethods.find(p => p.isDefault)?.id || '');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showNewPayment, setShowNewPayment] = useState(false);
    const [airtelNumber, setAirtelNumber] = useState('');
    const [airtelConfirmed, setAirtelConfirmed] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
    const [promoError, setPromoError] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Check if payment is valid/confirmed
    const isPaymentValid = 
        selectedPaymentType === 'cash' || 
        (selectedPaymentType === 'airtel' && airtelConfirmed) || 
        (selectedPaymentType === 'card' && selectedCard);

    // Get current payment method display info
    const getPaymentSummary = () => {
        switch (selectedPaymentType) {
            case 'cash':
                return { icon: Banknote, title: 'Cash on Delivery', subtitle: 'Pay when you receive your order' };
            case 'airtel':
                return { icon: Smartphone, title: 'Airtel Money', subtitle: airtelConfirmed ? airtelNumber : 'Number not confirmed' };
            case 'card':
                const card = savedPaymentMethods.find(m => m.id === selectedCard);
                return { icon: CreditCard, title: card ? `${card.type} •••• ${card.last4}` : 'No card selected', subtitle: card ? `Expires ${card.expiry}` : '' };
            default:
                return { icon: CreditCard, title: 'Select payment method', subtitle: '' };
        }
    };

    // New address form
    const [newAddress, setNewAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
    });

    // New payment form
    const [newPayment, setNewPayment] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
    });

    // Calculations
    const shippingCost = shippingOptions.find(s => s.id === selectedShipping)?.price || 0;
    const taxRate = 0.08; // 8% tax
    const taxAmount = subtotal * taxRate;
    const discountAmount = appliedPromo?.discount || 0;
    const total = subtotal + shippingCost + taxAmount - discountAmount;

    const handleApplyPromo = () => {
        setPromoError('');
        // Demo promo codes
        if (promoCode.toUpperCase() === 'SAVE10') {
            setAppliedPromo({ code: 'SAVE10', discount: subtotal * 0.1 });
        } else if (promoCode.toUpperCase() === 'FLAT20') {
            setAppliedPromo({ code: 'FLAT20', discount: 20 });
        } else {
            setPromoError('Invalid promo code');
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
    };

    const handlePlaceOrder = async () => {
        if (!agreeToTerms) return;

        setIsProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        // TODO: Implement actual order placement
        setIsProcessing(false);
        // router.push('/order-confirmation');
    };

    // Loading state
    if (isHydrating) {
        return (
            <main className="max-w-[1400px]  mx-auto px-4 sm:px-6 lg:px-10 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </main>
        );
    }

    // Empty cart state
    if (items.length === 0) {
        return (
            <main className="max-w-[1400px]  mx-auto px-4 sm:px-6 lg:px-10 py-16">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                        <ShoppingBag className="size-12 text-muted-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        Add some items to your cart before proceeding to checkout.
                    </p>
                    <Button asChild>
                        <Link href="/products">
                            <ShoppingBag className="size-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-[1400px]  mx-auto px-4 sm:px-6 lg:px-10 py-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/products">
                        <ArrowLeft className="size-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Checkout</h1>
                    <p className="text-muted-foreground text-sm">Complete your order</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="size-5 text-primary" />
                                Shipping Address
                            </CardTitle>
                            <CardDescription>Select or add a delivery address</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!showNewAddress ? (
                                <>
                                    <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                                        {savedAddresses.map((address) => (
                                            <div
                                                key={address.id}
                                                className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddress === address.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                                                    }`}
                                                onClick={() => setSelectedAddress(address.id)}
                                            >
                                                <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium">{address.name}</span>
                                                        <Badge variant="secondary" className="text-xs">{address.type}</Badge>
                                                        {address.isDefault && (
                                                            <Badge variant="outline" className="text-xs">Default</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {address.street}<br />
                                                        {address.city}, {address.state} {address.zipCode}<br />
                                                        {address.country}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground mt-1">{address.phone}</p>
                                                </div>
                                                {selectedAddress === address.id && (
                                                    <Check className="size-5 text-primary" />
                                                )}
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setShowNewAddress(true)}
                                    >
                                        <Plus className="size-4 mr-2" />
                                        Add New Address
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={newAddress.name}
                                                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                value={newAddress.phone}
                                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="street">Street Address</Label>
                                        <Input
                                            id="street"
                                            value={newAddress.street}
                                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                            placeholder="123 Main Street, Apt 4B"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input
                                                id="state"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                placeholder="NY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zipCode">ZIP Code</Label>
                                            <Input
                                                id="zipCode"
                                                value={newAddress.zipCode}
                                                onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                                                placeholder="10001"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Select
                                                value={newAddress.country}
                                                onValueChange={(value) => setNewAddress({ ...newAddress, country: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="United States">United States</SelectItem>
                                                    <SelectItem value="Canada">Canada</SelectItem>
                                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" onClick={() => setShowNewAddress(false)}>
                                            Cancel
                                        </Button>
                                        <Button>Save Address</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Shipping Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="size-5 text-primary" />
                                Shipping Method
                            </CardTitle>
                            <CardDescription>Choose your preferred delivery speed</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                                {shippingOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <div
                                            key={option.id}
                                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${selectedShipping === option.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                                                }`}
                                            onClick={() => setSelectedShipping(option.id)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <RadioGroupItem value={option.id} id={option.id} />
                                                <div className="p-2 bg-muted rounded-lg">
                                                    <Icon className="size-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{option.name}</p>
                                                    <p className="text-sm text-muted-foreground">{option.description}</p>
                                                </div>
                                            </div>
                                            <span className="font-semibold">{formatCurrency(option.price)}</span>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="size-5 text-primary" />
                                    Payment Method
                                </CardTitle>
                                <CardDescription>Choose how you want to pay</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Selected Payment Summary */}
                            {!showPaymentOptions && (
                                <>
                                    {(() => {
                                        const summary = getPaymentSummary();
                                        const Icon = summary.icon;
                                        return (
                                            <div className={`flex items-center justify-between p-4 border rounded-lg ${isPaymentValid ? 'border-primary bg-primary/5' : 'border-amber-300 bg-amber-50'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-lg ${isPaymentValid ? 'bg-primary/10' : 'bg-amber-100'}`}>
                                                        <Icon className={`size-5 ${isPaymentValid ? 'text-primary' : 'text-amber-600'}`} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium capitalize">{summary.title}</p>
                                                        <p className="text-sm text-muted-foreground">{summary.subtitle}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {isPaymentValid && <Check className="size-5 text-primary" />}
                                                    {!isPaymentValid && (
                                                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                                                            Incomplete
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setShowPaymentOptions(true)}
                                    >
                                        <CreditCard className="size-4 mr-2" />
                                        Change Payment Method
                                    </Button>
                                </>
                            )}

                            {/* Payment Options */}
                            {showPaymentOptions && (
                                <>
                                    {/* Payment Type Selection */}
                                    <RadioGroup
                                        value={selectedPaymentType}
                                        onValueChange={(value: 'cash' | 'airtel' | 'card') => {
                                            setSelectedPaymentType(value);
                                            setAirtelConfirmed(false);
                                            setShowNewPayment(false);
                                        }}
                                    >
                                        {paymentTypes.map((type) => {
                                            const Icon = type.icon;
                                            return (
                                                <div
                                                    key={type.id}
                                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${selectedPaymentType === type.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                                                        }`}
                                                    onClick={() => {
                                                        setSelectedPaymentType(type.id as 'cash' | 'airtel' | 'card');
                                                        setAirtelConfirmed(false);
                                                        setShowNewPayment(false);
                                                    }}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <RadioGroupItem value={type.id} id={`type-${type.id}`} />
                                                        <div className="p-2 bg-muted rounded-lg">
                                                            <Icon className="size-5 text-muted-foreground" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{type.name}</p>
                                                            <p className="text-sm text-muted-foreground">{type.description}</p>
                                                        </div>
                                                    </div>
                                                    {selectedPaymentType === type.id && (
                                                        <Check className="size-5 text-primary" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>

                                    {/* Cash on Delivery Info */}
                                    {selectedPaymentType === 'cash' && (
                                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <Banknote className="size-5 text-amber-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-amber-800">Cash on Delivery</p>
                                                    <p className="text-sm text-amber-700 mt-1">
                                                        Pay with cash when your order is delivered. Please have the exact amount ready.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Airtel Money Section */}
                                    {selectedPaymentType === 'airtel' && (
                                        <div className="space-y-4">
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <Smartphone className="size-5 text-red-600 mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-red-800">Airtel Money</p>
                                                        <p className="text-sm text-red-700 mt-1">
                                                            Enter your Airtel Money number to receive a payment prompt.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="airtelNumber">Airtel Money Number</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        id="airtelNumber"
                                                        value={airtelNumber}
                                                        onChange={(e) => {
                                                            setAirtelNumber(e.target.value);
                                                            setAirtelConfirmed(false);
                                                        }}
                                                        placeholder="e.g., 075XXXXXXX"
                                                        maxLength={10}
                                                        disabled={airtelConfirmed}
                                                    />
                                                    {!airtelConfirmed ? (
                                                        <Button
                                                            onClick={() => setAirtelConfirmed(true)}
                                                            disabled={airtelNumber.length < 10}
                                                        >
                                                            Confirm
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setAirtelConfirmed(false)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    )}
                                                </div>
                                                {airtelConfirmed && (
                                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                                        <Check className="size-4" />
                                                        <span>Number confirmed: {airtelNumber}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Card Payment Section */}
                                    {selectedPaymentType === 'card' && (
                                        <div className="space-y-4">
                                            <Separator />

                                            {!showNewPayment ? (
                                                <>
                                                    <RadioGroup value={selectedCard} onValueChange={setSelectedCard}>
                                                        {savedPaymentMethods.map((method) => (
                                                            <div
                                                                key={method.id}
                                                                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${selectedCard === method.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                                                                    }`}
                                                                onClick={() => setSelectedCard(method.id)}
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <RadioGroupItem value={method.id} id={`card-${method.id}`} />
                                                                    <div className="p-2 bg-muted rounded-lg">
                                                                        <CreditCard className="size-5 text-muted-foreground" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium capitalize">
                                                                            {method.type} •••• {method.last4}
                                                                        </p>
                                                                        <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    {method.isDefault && (
                                                                        <Badge variant="outline" className="text-xs">Default</Badge>
                                                                    )}
                                                                    {selectedCard === method.id && (
                                                                        <Check className="size-5 text-primary" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => setShowNewPayment(true)}
                                                    >
                                                        <Plus className="size-4 mr-2" />
                                                        Add New Card
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardNumber">Card Number</Label>
                                                        <Input
                                                            id="cardNumber"
                                                            value={newPayment.cardNumber}
                                                            onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                                                            placeholder="1234 5678 9012 3456"
                                                            maxLength={19}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardName">Name on Card</Label>
                                                        <Input
                                                            id="cardName"
                                                            value={newPayment.cardName}
                                                            onChange={(e) => setNewPayment({ ...newPayment, cardName: e.target.value })}
                                                            placeholder="JOHN DOE"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="expiry">Expiry Date</Label>
                                                            <Input
                                                                id="expiry"
                                                                value={newPayment.expiry}
                                                                onChange={(e) => setNewPayment({ ...newPayment, expiry: e.target.value })}
                                                                placeholder="MM/YY"
                                                                maxLength={5}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="cvv">CVV</Label>
                                                            <Input
                                                                id="cvv"
                                                                value={newPayment.cvv}
                                                                onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                                                                placeholder="123"
                                                                maxLength={4}
                                                                type="password"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <Button variant="outline" onClick={() => setShowNewPayment(false)}>
                                                            Cancel
                                                        </Button>
                                                        <Button>Save Card</Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Confirm Selection Button */}
                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowPaymentOptions(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            onClick={() => setShowPaymentOptions(false)}
                                            disabled={!isPaymentValid}
                                        >
                                            <Check className="size-4 mr-2" />
                                            Confirm Selection
                                        </Button>
                                    </div>
                                </>
                            )}

                            {/* Security Note */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                <Lock className="size-4" />
                                <span>Your payment information is encrypted and secure</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-28 space-y-6">
                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <ShoppingBag className="size-5 text-primary" />
                                        Order Summary
                                    </span>
                                    <Badge variant="secondary">{items.length} items</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Items List */}
                                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="relative size-16 shrink-0 rounded-md overflow-hidden bg-muted">
                                                {item.images ? (
                                                    <Image
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover object-top"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{item.name}</p>
                                                {(item.size || item.color) && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.size}{item.size && item.color ? ' / ' : ''}{item.color}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                                    <span className="text-sm font-medium">
                                                        {formatCurrency((item.discountPrice || item.price) * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                {/* Promo Code */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Tag className="size-4" />
                                        Promo Code
                                    </Label>
                                    {appliedPromo ? (
                                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Check className="size-4 text-green-600" />
                                                <span className="font-medium text-green-700">{appliedPromo.code}</span>
                                                <span className="text-sm text-green-600">
                                                    (-{formatCurrency(appliedPromo.discount)})
                                                </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-6 text-green-600 hover:text-red-500"
                                                onClick={handleRemovePromo}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Enter code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button variant="outline" onClick={handleApplyPromo} disabled={!promoCode}>
                                                Apply
                                            </Button>
                                        </div>
                                    )}
                                    {promoError && (
                                        <p className="text-sm text-destructive flex items-center gap-1">
                                            <AlertCircle className="size-3" />
                                            {promoError}
                                        </p>
                                    )}
                                </div>

                                <Separator />

                                {/* Price Breakdown */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{formatCurrency(shippingCost)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (8%)</span>
                                        <span>{formatCurrency(taxAmount)}</span>
                                    </div>
                                    {appliedPromo && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount</span>
                                            <span>-{formatCurrency(discountAmount)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                <Separator />

                                {/* Terms Agreement */}
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="terms"
                                        checked={agreeToTerms}
                                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                                    />
                                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                                        {' '}and{' '}
                                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                    </Label>
                                </div>

                                {/* Place Order Button */}
                                <Button
                                    className="w-full h-12 text-base"
                                    size="lg"
                                    onClick={handlePlaceOrder}
                                    disabled={
                                        !agreeToTerms ||
                                        !selectedAddress ||
                                        isProcessing ||
                                        !isPaymentValid
                                    }
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="size-4 mr-2" />
                                            Place Order • {formatCurrency(total)}
                                        </>
                                    )}
                                </Button>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 pt-2">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Shield className="size-3" />
                                        <span>Secure</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Truck className="size-3" />
                                        <span>Fast Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Package className="size-3" />
                                        <span>Easy Returns</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Help Card */}
                        <Card className="bg-muted/50">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Shield className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Need Help?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Contact our support team at{' '}
                                            <a href="mailto:support@shoply.com" className="text-primary hover:underline">
                                                support@shoply.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
