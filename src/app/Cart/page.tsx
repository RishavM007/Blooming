'use client';

import React from 'react';
import { useCart } from '../context/cartContext';
import Image from 'next/image';

const CartPage: React.FC = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        // Add payment gateway integration here.
    };

    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity * 1000, 0);
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty</h1>
                <a href="/" className="text-blue-500 hover:underline">Continue Shopping</a>
            </div>
        );
    }

    return (
        <section className="py-12 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-md"
                            />
                            <div className="flex-grow">
                                <h2 className="font-medium">{item.name}</h2>
                                <p className="text-sm text-gray-600">Price: {item.price * 1000} د.إ</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <p className="font-medium">{1000 * item.price * item.quantity} د.إ</p>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:underline"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                {/* Right: Cart Totals */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Cart Totals</h2>
                    <div className="mb-4">
                        <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                            Add a Coupon
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="coupon"
                                placeholder="Enter coupon code"
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                                Apply
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{calculateSubtotal()} د.إ</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
