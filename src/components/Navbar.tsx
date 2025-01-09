'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsArrowUpRight } from "react-icons/bs";
import woman2 from '@/assets/beautiful-african-female-florist-smiling-making-bouquet-flowers.jpg'
import Woman1 from '@/assets/asian-woman-holding-flowers-present-studio-shot-inspired-japanese-woman-with-eustoma-bouquet-isolated-beige.jpg'
import flower from '@/assets/bouquet-variety-flowers-with-rich-colors-leaves-hands-bride-wall.jpg'
import delivery from '@/assets/woman-with-fruit-bouquet-christmas.jpg'
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="w-full bg-white sticky top-0 z-50 border-b">

            <div className="flex items-center justify-between px-4 py-5">

                <button onClick={toggleMenu} className="text-[#d24b78] flex ml-20 text-2xl">
                    <FiMenu />
                </button>

                <Link href='/'>
                <h1 className="text-5xl font-semibold font-Tangerine ml-32 text-[#d24b78] tracking-wide text-center">Blooming</h1>
                </Link>

                <div className="flex items-center mr-20 space-x-10">
                    <Link href='/auth/signin'>
                    <div className="flex">
                        <RiAccountPinCircleLine className="text-[#d24b78] text-xl cursor-pointer" />
                        <p className="text-[#d24b78] text-sm font-semibold translate-y-[1px] mx-2 font-Montserrat">Account</p>
                    </div>
                    </Link>
                    <Link href='/Cart'>
                    <div className="flex relative">
                        <div className="size-3 absolute right-11 top-[-3px] flex justify-center items-center rounded-full bg-pink-400 text-white text-[8px]">1</div>
                        <RiShoppingCartLine className=" text-[#d24b78] text-xl cursor-pointer" />
                        <p className="text-[#d24b78] text-sm font-semibold translate-y-[1px] mx-2 font-Montserrat">Cart</p>
                    </div>
                    </Link>
                </div>
            </div>


            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 ${menuOpen ? "block" : "hidden"
                    }`}
                onClick={toggleMenu}
            ></div>
            <div
                className={`fixed top-0 left-0 w-[600px] bg-white overflow-scroll h-full z-30 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300`}
            >
                
                <button onClick={toggleMenu} className="text-[#e7588f]  absolute top-5 right-5 text-xl">
                    <AiOutlineClose />
                </button>
                <div className="pt-20 px-16 ">
                    <h2 className="font-Cinzel text-2xl text-[#d35ba5] font-normal">Explore</h2>
                    <div className="flex gap-5 py-10 ">
                        <Link href='#'>
                            <div className="h-60 w-56 relative">
                                <Image
                                    src={Woman1}
                                    alt="woman1"
                                    className="object-cover w-full h-full rounded-xl z-10"
                                />
                                
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-900 via-transparent to-transparent rounded-b-xl z-15"></div>
                                
                                <p className="absolute bottom-2 text-white font-Cinzel left-[50%] tracking-wide -translate-x-1/2 z-20">
                                    Moments
                                </p>
                            </div>
                        </Link>
                        <Link href='#'>
                            <div className="h-60 w-56 relative ">
                                <Image src={flower} alt="flower" className="object-cover w-full h-full rounded-xl"></Image>
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-900 via-transparent to-transparent rounded-b-xl z-15"></div>
                                <p className="absolute bottom-1 text-white font-Cinzel left-[50%] tracking-wide -translate-x-1/2  z-20">Recipients</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <Link href='#'>
                <div className="mb-5">
                    <div className="w-[80%] flex  items-center text-[#e7588f] py-5 pl-3 font-semibold font-Cinzel border rounded-xl border-[#e7588f] mx-auto">
                        <p>Flower and Plants</p>
                        <BsArrowUpRight className="rotate-[45deg] ml-2 text-xs" />

                    </div>
                </div>
                </Link>
                <Link href='#'>
                <div>
                    <div className="w-[80%] flex items-center text-[#e7588f] py-5 pl-3 font-Cinzel font-semibold rounded-xl border border-[#e7588f] mx-auto">
                        <p>Flowers and Gifts</p>
                        <BsArrowUpRight className="rotate-[45deg] ml-2 text-xs" />
                    </div>
                </div>
                </Link>
                <div className=" px-16">
                    <div className="flex gap-5 py-10">
                        <Link href='#'>
                            <div className="h-60 w-56 relative">
                                <Image
                                    src={delivery}
                                    alt="woman1"
                                    className="object-cover w-full h-full rounded-xl z-10"
                                />
                                
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-900 via-transparent to-transparent rounded-b-xl z-15"></div>
                                
                                <p className="absolute bottom-2 text-white font-Cinzel left-[50%] tracking-wide -translate-x-1/2 z-20">
                                   A Delivery
                                </p>
                            </div>
                        </Link>
                        <Link href='#'>
                            <div className="h-60 w-56 relative ">
                                <Image src={woman2} alt="flower" className="object-cover w-full h-full rounded-xl"></Image>
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-900 via-transparent to-transparent rounded-b-xl z-15"></div>
                                <p className="absolute bottom-1 text-white font-Cinzel left-[50%] tracking-wide -translate-x-1/2  z-20">Subscriptions</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
