'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/cartContext';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import icons

const GRAPHQL_URL = 'https://demo.bixeltek.com/headless/graphql';

interface Product {
    name: string;
    image: {
        altText: string;
        sourceUrl: string;
    };
    id: string;
    description: string;
    regularPrice?: string;
    salePrice?: string;
}

async function getProductData(id: string): Promise<Product | null> {
    if (!id) {
        console.error('Product ID is missing!');
        return null;
    }

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query GetProduct($id: ID!) {
                product(id: $id, idType: ID) { 
                    name
                    image {
                        altText
                        sourceUrl(size: LARGE)
                    }
                    id
                    description
                    ... on SimpleProduct {
                        regularPrice
                        salePrice
                    }
                    ... on VariableProduct {
                        regularPrice
                        salePrice
                    }
                }
            }
            `,
            variables: { id },
        }),
    });

    const result = await response.json();
    console.log('GraphQL Response:', result);
    return result.data?.product || null;
}

const ProductPage: React.FC = () => {
    const { addToCart } = useCart(); // Access the addToCart function from context
    const params = useParams();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Product ID is missing.');
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const productData = await getProductData(id);
                setProduct(productData);
            } catch (e) {
                console.error(e);
                setError('Failed to fetch product data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const cleanNumber = (value: string | undefined): number | null => {
        if (!value) return null; 
        const cleanedValue = parseFloat(value.replace(/[^0-9.-]+/g, '')); 
        return isNaN(cleanedValue) ? null : cleanedValue;
    };
    

    const handleAddToCart = () => {
        // const saleprice = Number(product?.salePrice)
        // const regularPrice = Number(product?.regularPrice)
        if (!product) return;
        addToCart({
            id: product.id,
            name: product.name,
            price: cleanNumber(product.salePrice)||cleanNumber(product.regularPrice) || 0,
            image: product.image.sourceUrl,
            quantity: 1,
        });
        alert(`${product.name} has been added to your cart.`);
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (!product) return <p className="text-center text-gray-600">No product found.</p>;

    return (
        <section className="py-12 sm:py-16 bg-gray-50">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10 px-4">
                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <div className="w-full lg:w-auto">
                        <nav className="flex text-sm text-gray-600 mb-8">
                            <ol role="list" className="flex items-center space-x-2">
                                <li>
                                    <Link href="/" className="hover:text-gray-800">Home</Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link href="/" className="hover:text-gray-800">Products</Link>
                                </li>
                                <li>/</li>
                                <li className="font-medium text-gray-900">{product.name}</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="flex flex-col items-center lg:items-start w-full lg:w-3/5">
                        <div className="mb-6">
                            <Image
                                src={product.image.sourceUrl}
                                alt={product.image.altText || 'Product Image'}
                                width={500}
                                height={500}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button className="w-20 h-20 rounded-lg border-2 border-gray-300 hover:border-gray-500">
                                <Image
                                    src={product.image.sourceUrl}
                                    alt={product.image.altText || 'Thumbnail'}
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>

                    <div className="flex items-center mb-5">
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                i < 4 ? (
                                    <FaStar key={i} className="w-5 h-5" />
                                ) : (
                                    <FaStarHalfAlt key={i} className="w-5 h-5" />
                                )
                            ))}
                        </div>
                        <p className="ml-2 text-sm">4.5/5 Rating</p>
                    </div>

                    <div className="text-xl font-semibold text-gray-900 mb-5">
                        {product.salePrice ? (
                            <>
                                <span className="text-lg line-through text-gray-500 mr-4">{product.regularPrice}</span>
                                <span className="text-xl text-red-600">{product.salePrice}</span>
                            </>
                        ) : (
                            <span>{product.regularPrice}</span>
                        )}
                    </div>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <button
                        className="bg-black text-white py-2 px-6 rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
