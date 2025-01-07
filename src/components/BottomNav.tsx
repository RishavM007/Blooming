'use client';

import React from 'react'
import { AiOutlineClockCircle, AiOutlinePhone } from 'react-icons/ai';
import { CiStar } from "react-icons/ci";
import { MdLocationOn, MdMessage } from 'react-icons/md';

export default function BottomNav() {
  return (
    <>
   <div className="w-[85%] mx-auto p-4 my-5 bg-[#f8edeb] rounded-lg  flex items-center justify-between text-sm md:text-base space-x-4">
      {/* Same Day Delivery */}
      <div className="flex items-center space-x-2">
        <AiOutlineClockCircle className="text-pink-800 text-2xl " />
        <div>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">Same day delivery</p>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">for order before 11:00h!</p>
        </div>
      </div>

      {/* Free Pick Up */}
      <div className="flex items-center space-x-2">
        <MdLocationOn className="text-2xl text-pink-800" />
        <div>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">Free pick up from</p>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">1000S 8th Avenue, NY!</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        <CiStar className="text-3xl text-pink-800 " />
        <div>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">Rating 4.8/5!</p>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">from verified users</p>
        </div>
      </div>

      {/* Call Us */}
      <div className="flex items-center space-x-2">
        <AiOutlinePhone className="text-2xl text-pink-800" />
        <div>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">Call us in 09:00-16:00h</p>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">18003568933</p>
        </div>
      </div>

      {/* Message Us */}
      <div className="flex items-center space-x-2">
        <MdMessage className="text-2xl text-pink-800" />
        <div>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">Message us,</p>
          <p className="font-Cinzel text-xs text-pink-800 font-semibold">respond same day!</p>
        </div>
      </div>
    </div>
    </>
  )
}
