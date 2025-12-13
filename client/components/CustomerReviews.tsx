'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CustomerReviewsProps {
    product: any;
}

// Mock review data
const mockReviews = [
    {
        id: 1,
        author: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        rating: 5,
        title: 'Excellent Quality!',
        content: 'This product exceeded my expectations. The material is premium and the fit is perfect. Highly recommend!',
        date: '2024-01-15',
        helpful: 24,
        images: [],
    },
    {
        id: 2,
        author: 'Michael Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        rating: 4,
        title: 'Great Product',
        content: 'Very satisfied with this purchase. Delivery was fast and packaging was excellent.',
        date: '2024-01-10',
        helpful: 18,
        images: [],
    },
    {
        id: 3,
        author: 'Emma Davis',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        rating: 5,
        title: 'Love it!',
        content: 'Perfect for everyday use. The quality is outstanding and the customer service was very helpful.',
        date: '2024-01-05',
        helpful: 32,
        images: [],
    },
];

export default function CustomerReviews({ product }: CustomerReviewsProps) {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 5,
        title: '',
        content: '',
    });

    const avgRating = 4.5;
    const ratingDistribution = {
        5: 60,
        4: 25,
        3: 10,
        2: 3,
        1: 2,
    };

    const handleSubmitReview = () => {
        console.log('Review submitted:', newReview);
        setShowReviewForm(false);
        setNewReview({ rating: 5, title: '', content: '' });
    };

    return (
        <div className="space-y-8">
            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Average Rating */}
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-5xl font-bold text-primary mb-2">{avgRating}</div>
                    <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                                key={i}
                                viewBox="0 0 24 24"
                                className={`size-4 ${i < Math.floor(avgRating) ? 'text-amber-400' : 'text-gray-300'}`}
                                fill="currentColor"
                            >
                                <path d="m12 17.27l4.15 2.51q.675.41 1.413-.177t.547-1.423l-1.1-4.71l3.69-3.2q.725-.63.36-1.56t-1.32-.92l-4.85-.41l-1.89-4.31q-.38-.86-1.41-.86t-1.41.86L7.11 7.373l-4.85.41q-.95.08-1.316.923t.355 1.557l3.69 3.2l-1.1 4.71q-.2.95.538 1.535t1.423.065z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Based on {mockReviews.length} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="md:col-span-2 space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm font-medium w-12">{rating}★</span>
                            <Progress
                                value={ratingDistribution[rating as keyof typeof ratingDistribution]}
                                className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground w-12 text-right">
                                {ratingDistribution[rating as keyof typeof ratingDistribution]}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Write Review Button */}
            {!showReviewForm && (
                <Button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full md:w-auto"
                    size="lg"
                >
                    Write a Review
                </Button>
            )}

            {/* Review Form */}
            {showReviewForm && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="text-lg font-semibold">Share Your Review</h3>

                    {/* Rating Selector */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => setNewReview({ ...newReview, rating })}
                                    className="transition-transform hover:scale-110"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className={`size-8 cursor-pointer ${
                                            rating <= newReview.rating
                                                ? 'text-amber-400'
                                                : 'text-gray-300'
                                        }`}
                                        fill="currentColor"
                                    >
                                        <path d="m12 17.27l4.15 2.51q.675.41 1.413-.177t.547-1.423l-1.1-4.71l3.69-3.2q.725-.63.36-1.56t-1.32-.92l-4.85-.41l-1.89-4.31q-.38-.86-1.41-.86t-1.41.86L7.11 7.373l-4.85.41q-.95.08-1.316.923t.355 1.557l3.69 3.2l-1.1 4.71q-.2.95.538 1.535t1.423.065z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Review Title</label>
                        <input
                            type="text"
                            placeholder="Sum up your experience..."
                            value={newReview.title}
                            onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Your Review</label>
                        <Textarea
                            placeholder="Share details about your experience..."
                            value={newReview.content}
                            onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                            rows={4}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button onClick={handleSubmitReview} className="flex-1">
                            Submit Review
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowReviewForm(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                {mockReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 space-y-3">
                        {/* Reviewer Info */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={review.avatar} alt={review.author} />
                                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{review.author}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(review.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        viewBox="0 0 24 24"
                                        className={`size-4 ${
                                            i < review.rating ? 'text-amber-400' : 'text-gray-300'
                                        }`}
                                        fill="currentColor"
                                    >
                                        <path d="m12 17.27l4.15 2.51q.675.41 1.413-.177t.547-1.423l-1.1-4.71l3.69-3.2q.725-.63.36-1.56t-1.32-.92l-4.85-.41l-1.89-4.31q-.38-.86-1.41-.86t-1.41.86L7.11 7.373l-4.85.41q-.95.08-1.316.923t.355 1.557l3.69 3.2l-1.1 4.71q-.2.95.538 1.535t1.423.065z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        {/* Review Content */}
                        <div>
                            <h4 className="font-semibold">{review.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                        </div>

                        {/* Helpful */}
                        <div className="flex items-center gap-2 text-sm">
                            <button className="text-muted-foreground hover:text-primary transition-colors">
                                👍 Helpful ({review.helpful})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
