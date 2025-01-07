import React from 'react';
import { CiLocationArrow1 } from "react-icons/ci";
import { HiMiniGift } from "react-icons/hi2";
import { AiOutlineTruck } from "react-icons/ai";

export default function UpperNav() {
  return (
    <div className="w-full bg-[#fcf6f5] text-sm text-gray-700">
      <div className="flex justify-between items-center px-4 py-2">
        
        <div className="flex items-center pl-16 py-2 space-x-6">
          <div className="flex items-center space-x-1">
            <AiOutlineTruck className='text-[#d24b78] text-lg' />
            <span className='font-semibold text-[#d24b78] text-xs font-Montserrat'>Express Delivery</span>
          </div>
          <div className="flex items-center space-x-1">
            <CiLocationArrow1 className="text-[#d24b78] text-lg" />
            <span className='font-semibold text-[#d24b78] text-xs font-Montserrat'>No Address Hassle</span>
          </div>
          <div className="flex items-center space-x-1">
            <HiMiniGift className="text-[#d24b78] text-lg" />
            <span className='font-semibold text-[#d24b78] text-xs font-Montserrat'>Premium Flowers & Gifts</span>
          </div>
        </div>

        
        <div className="flex items-center border px-2 py-1 bg-[#fdfafa] rounded-full mr-20 space-x-2">
          <span className='font-Montserrat font-normal text-xs text-[#d24b78]' >Delivery to</span>
          <span className="font-bold font-Montserrat text-xs text-[#d24b78]">Abu Dhabi</span>
        </div>
      </div>
    </div>
  );
}
