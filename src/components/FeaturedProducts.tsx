'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ProductNode = {
  name: string;
  image: {
    altText: string;
    sourceUrl: string;
  };
  id: string;
  productId: string;
  regularPrice?: string | null;
  salePrice?: string | null;
};

type ProductCategory = {
  name: string;
  slug: string;
  products: {
    nodes: ProductNode[];
  };
};

type GraphQLResponse = {
  data: {
    products: {
      nodes: ProductNode[];
    };
    productCategories: {
      nodes: ProductCategory[];
    };
  };
};

type Product = ProductNode & { category: string };

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
  productCategories {
    nodes {
      name
      slug
      products {
        nodes {
          name
          image {
            altText
            sourceUrl
          }
          productId
          ... on SimpleProduct {
            regularPrice
            salePrice
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

        if (!response.ok) throw new Error('Failed to fetch products');

        const result: GraphQLResponse = await response.json();
        console.log('GraphQL Result:', result);
        const bouquetProducts =
          result.data.productCategories.nodes.find((category) => category.slug === 'bouquet')
            ?.products.nodes || [];
        const chocolateProducts =
          result.data.productCategories.nodes.find((category) => category.slug === 'chocolates')
            ?.products.nodes || [];

        setProducts([
          ...bouquetProducts.map((product) => ({ ...product, category: 'Bouquet' })),
          ...chocolateProducts.map((product) => ({ ...product, category: 'Chocolates' })),
        ]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const bouquetProducts = products.filter((product) => product.category === 'Bouquet');
  const chocolateProducts = products.filter((product) => product.category === 'Chocolates');

  bouquetProducts.map(product =>{
    console.log(product.productId)
    console.log(product.id)
  })

  return (
    <div className="rounded-t-3xl py-20">
      <div className="max-w-[90%] mx-auto px-6 text-left">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-normal font-Cormorant text-[#9f3357] mb-6">
            Unwrap the Joy of a Bright New Year!
          </h2>
          <Link href="/Products/Bouquets">
            <button className="bg-white text-[#9f3357] rounded-full border-2 border-[#9f3357] font-Montserrat font-normal text-sm py-1 px-2 mb-3">
              Choose Gifts Now
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-xl text-gray-500">Loading products...</div>
        ) : (
          <>
            {/* Bouquet Section */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {bouquetProducts.map((product) => (
                  <div key={product.productId} className="p-4 flex flex-col h-full">
                    <Link href={`/Products/${product.id}`}>
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
            </div>

            {/* Chocolates Section */}
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <h3 className="text-4xl font-normal font-Cormorant text-[#9f3357] mb-4">
                  Our Delights
                </h3>
                <Link href="/Products/Chocolates">
                  <button className="bg-white text-[#9f3357] rounded-full border-2 border-[#9f3357] font-Montserrat font-normal text-sm py-1 px-2 mb-3">
                    Choose Gifts Now
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {chocolateProducts.map((product) => (
                  <div key={product.productId} className="p-4 flex flex-col h-full">
                    <Link href={`/Products/${product.id}`}>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
