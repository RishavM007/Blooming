'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  image: {
    altText: string;
    sourceUrl: string;
  };
};

const GRAPHQL_URL = 'https://demo.bixeltek.com/headless/graphql';

export default function Product() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(GRAPHQL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetBouquetProducts {
                productCategories(where: {slug: "chocolates"}) {
                  nodes {
                    products {
                      nodes {
                        name
                        image {
                          altText
                          sourceUrl(size: LARGE)
                        }
                        id
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        const result = await res.json();
        console.log('GraphQL Response:', result);
        const nodes = result?.data?.productCategories?.nodes?.[0]?.products?.nodes || [];
        setData(nodes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl py-10">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our featured items</h2>
        <p className="mt-4 text-base font-normal leading-7 text-gray-600">
          Explore our latest products, carefully curated for you.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
        {data.map((product) => (
          <Link key={product.id} href={`/Products/${product.id}`}>
            <div className="relative group">
              <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <Image
                  className="object-cover w-full h-80 transition-all duration-300 group-hover:scale-125"
                  src={product.image.sourceUrl}
                  width={300}
                  height={300}
                  alt={product.image.altText || 'Product Image'} // Handle missing altText gracefully
                />
              </div>
              <div className="absolute left-3 top-3">
                <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
                  New
                </p>
              </div>
              <div className="flex items-start justify-between mt-4 space-x-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    {product.name}
                    <span className="absolute inset-0" aria-hidden="true"></span>
                  </h3>
                </div>
                <div className="text-right">

                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
