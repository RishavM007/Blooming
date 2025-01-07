'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: string;
  regularPrice?: string | null;
  salePrice?: string | null;
  productId: string;
  name: string;
  image: {
    altText: string;
    sourceUrl: string;
  };
};

const GRAPHQL_URL = 'https://demo.bixeltek.com/headless/graphql';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(GRAPHQL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetProducts {
                products {
                  nodes {
                    name
                    image {
                      altText
                      sourceUrl(size: LARGE)
                    }
                    id
                    productId
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
              }
            `,
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch products');

        const result = await response.json();
        setProducts(result?.data?.products?.nodes || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="rounded-t-3xl py-20">
      <div className="max-w-[90%] mx-auto px-6 text-left">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-normal font-Cormorant text-[#9f3357] mb-6">
            Unwrap the Joy of a Bright New Year!
          </h2>
          <button className="bg-white text-[#9f3357] rounded-full border-2 border-[#9f3357] font-Montserrat font-normal text-sm py-1 px-2 mb-3">
            Choose Gifts Now
          </button>
        </div>
        {loading ? (
          <div className="text-xl text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div key={product.productId} className="p-4 flex flex-col h-full">
                <Link href={`/products/${product.id}`}>
                  <div className="relative mb-4 w-[300px] h-[300px]">
                    <Image
                      src={product.image.sourceUrl}
                      alt={product.image.altText || product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-[#a02344] font-extralight font-anton mb-2">
                    {product.regularPrice || 'N/A'}
                  </p>
                  <h3 className="text-sm font-medium text-[#a02344] mb-2 font-Montserrat flex-grow">
                    {product.name}
                  </h3>
                  
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
