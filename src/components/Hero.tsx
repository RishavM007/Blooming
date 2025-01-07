'use client';

import React, { useState, useEffect } from "react";
import flower1 from '@/assets/potted-viola-plant.jpg';
import Link from "next/link";

import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // 3 slides in total
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1)); // 3 slides in total
    };

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="max-w-[95%] mx-auto">
            <div className="relative overflow-hidden shadow-lg">
                <div className="relative h-80 md:h-[560px]">
                    {/* Slide 1 */}
                    <Link href='#' className="">
                        <div
                            className={`absolute inset-0 transition-opacity bg-[#ffd7ba] duration-700 ${activeIndex === 0 ? "opacity-100" : "opacity-0"
                                }`}
                        >

                            <Image
                                src={flower1}
                                alt="Slide 3"
                                className="w-full h-auto absolute left-0 top-0"
                                style={{ transform: "translateY(0%)" }} // Adjust percentage for better control
                            />
                            <div className="absolute inset-0 flex flex-col bg-gradient-to-t from-black/50 via-black/30 to-transparent">
                                <h1 className="text-white text-4xl mt-40 ml-16 md:text-7xl font-Cinzel">
                                    Blossom with Beauty
                                </h1>
                                <p className="text-white font-Cinzel text-sm mt-5 max-w-sm ml-16 md:text-2xl">
                                    Discover the freshest flowers for every occasion.
                                </p>
                                <div className="mt-5">
                                    <button className="px-6 z-20 mt-10 py-1 ml-16 font-Cinzel text-lg font-normal text-pink-500 border border-pink-500 w-40 rounded-md cursor-pointer hover:bg-pink-900 transition">
                                        Shop Now
                                    </button>
                                </div>
                            </div>



                        </div>
                        </Link>
                        {/* Slide 2 */}
                        <div
                            className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === 1 ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                                alt="Slide 2"
                                className="object-cover w-full h-full absolute inset-0"
                            />
                            <span className="absolute bottom-5 right-5 text-right text-xl font-semibold text-white md:text-2xl">
                                Second Slide
                            </span>
                            <span className="absolute bottom-20 right-5 text-right text-md font-normal text-white md:text-lg">
                                This is the description for the second slide.
                            </span>
                        </div>

                        {/* Slide 3 */}
                        <div
                            className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === 2 ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                                alt="Slide 3"
                                className="object-cover w-full h-full absolute inset-0"
                            />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl font-semibold text-white md:text-2xl">
                                Third Slide
                            </span>
                            <span className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-md font-normal text-white md:text-lg">
                                This is the description for the third slide.
                            </span>
                        </div>
                </div>

                {/* Indicators */}
                <div className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2">
                    <button
                        type="button"
                        className={`w-5 h-[2px] transition ${activeIndex === 0 ? "bg-gray-800" : "bg-gray-300"
                            }`}
                        onClick={() => goToSlide(0)}
                        aria-label="Go to slide 1"
                    ></button>
                    <button
                        type="button"
                        className={`w-5 h-[2px] transition ${activeIndex === 1 ? "bg-gray-800" : "bg-gray-300"
                            }`}
                        onClick={() => goToSlide(1)}
                        aria-label="Go to slide 2"
                    ></button>
                    <button
                        type="button"
                        className={`w-5 h-[2px] transition ${activeIndex === 2 ? "bg-gray-800" : "bg-gray-300"
                            }`}
                        onClick={() => goToSlide(2)}
                        aria-label="Go to slide 3"
                    ></button>
                </div>

                {/* Navigation Buttons */}
                <button
                    type="button"
                    className="flex absolute top-1/2 left-3 z-10 items-center justify-center w-10 h-10 bg-transparent rounded-full transition"
                    onClick={handlePrev}
                    aria-label="Previous Slide"
                >
                    <FiChevronLeft className="w-6 h-6 text-gray-100" />
                </button>
                <button
                    type="button"
                    className="flex absolute top-1/2 right-3 z-10 items-center justify-center w-10 h-10 bg-transparent rounded-full transition"
                    onClick={handleNext}
                    aria-label="Next Slide"
                >
                    <FiChevronRight className="w-6 h-6 text-gray-100" />
                </button>
            </div>
        </div>
    );
}
