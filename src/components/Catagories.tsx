'use client';
import React, { useRef } from 'react';
import flower from '@/assets/bouquet.png'
import vase from '@/assets/vase.png'
import teddy from '@/assets/teddy.png'
import horse from '@/assets/red-1405199_1280-removebg-preview.png'
import cake from '@/assets/cake.png'
import Image from 'next/image';

export default function Categories() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
  
    const categories = [
      { id: 1, name: 'HappyBithday', img: cake },
      { id: 2, name: 'I love you', img: flower },
      { id: 3, name: 'Get Well Soon', img: teddy },
      { id: 4, name: 'New Born Baby', img: horse },
      { id: 5, name: 'Congratulations', img: vase },
      { id: 6, name: 'Wedding', img: flower },
      { id: 7, name: 'Aniversary', img: flower },
      { id: 8, name: 'House Warming', img: flower },
      { id: 9, name: 'Graduation', img: flower },
      { id: 10, name: 'Thank You', img: flower },
    ];
  
    return (
        <div className="py-8 max-w-[90%] mx-auto px-4 overflow-scroll">
        <h2 className="text-center text-2xl mb-8 font-Cinzel font-semibold text-[#c03e70]">Gifts for every moment</h2>
        <div
          className="flex gap-20 overflow-x-auto scroll-smooth py-4 px-2"
          ref={scrollContainerRef}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 w-44 text-center bg-transparent rounded-lg cursor-pointer transition-shadow"
            >
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-pink-100 rounded-full transform scale-75 translate-y-7 -z-10 skew-y-6 skew-x-2 "></div>
                <Image
                  src={category.img}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-base font-semibold font-Cinzel text-[#792746]">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  