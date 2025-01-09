'use client';

import React, { useState } from 'react';
import { useCart } from '../context/cartContext';

const CheckoutPage: React.FC = () => {
    const { cart, calculateSubtotal } = useCart();
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        state: '',
        city: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = () => {
        alert('Order placed successfully!');
        console.log('Shipping Info:', shippingInfo);
        console.log('Cart:', cart);
        // Add payment gateway or backend API integration here.
    };

    return (
        <section className="py-12 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 space-y-8">
                <h1 className="text-3xl font-semibold text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Display Orders */}
                    <div>
                        <h2 className="text-2xl font-medium mb-4">Your Orders</h2>
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="font-bold">{1000*(item.price)*item.quantity} د.إ</p>
                                        <p className='font-semibold'>Quantity : {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
                            <h2 className="text-2xl font-medium">Shipping Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={shippingInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={shippingInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={shippingInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={shippingInfo.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <select
                                    name="country"
                                    value={shippingInfo.country}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    <option value="">Select Country</option>
                                    <option value="UAE">UAE</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                </select>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={shippingInfo.state}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={shippingInfo.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
                            <h2 className="text-2xl font-medium">Order Summary</h2>
                            <div className="space-y-2 mt-4">
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
                            <div className="flex justify-between mt-6 font-semibold text-lg">
                                <span>Total</span>
                                <span>{calculateSubtotal()} د.إ</span>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
