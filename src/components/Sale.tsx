import React from 'react'
import woman from '@/assets/woman-elegant-dress-standing-summer-field.jpg'
import flower from '@/assets/fruit-bouqeut-summer-forest.jpg'
import Image from 'next/image'

export default function Sale() {
  return (
    <div className='max-w-[90%] mx-auto my-10'>
      <div className=' flex gap-8 flex-col md:flex-row'>
        <div className='w-1/2 h-auto border relative rounded-xl'>
            <Image src={woman}
             alt='SalePoster1'
             className= 'rounded-t-xl '
             >          
            </Image>
            <p className='absolute font-Cormorant text-8xl text-neutral-100 top-10 right-24 font-extralight '>-50%</p>
            <p className='font-Cormorant px-4 pt-3  text-3xl'>Save up to 50% on flower deals</p>
            <p className='pt-1 px-4 text-sm font-Montserrat'>Our daily and weekly flower deals collection help you save up to 50% off regular price.</p>
            <div className='py-7'>
            <button className='ml-4 border border-neutral-700 px-5 py-1 text-lg rounded-full font-Cormorant hover:bg-pink-700 hover:text-white hover:border-pink-700 transition-all duration-300'>SHOP NOW</button>
            </div>
        </div>
        <div className='w-1/2 h-auto border rounded-xl'>
            <Image src={flower}
             alt='SalePoster1'
             className='rounded-t-xl'
             >          
            </Image>
            
            <p className='font-Cormorant px-4 pt-3  text-3xl'>Flowers for special moments</p>
            <p className='pt-1 px-4 text-sm font-Montserrat'>Our daily and weekly flower deals collection help you save up to 50% off regular price.</p>
            <div className='py-7'>
            <button className='ml-4 border border-neutral-700 px-5 py-1 text-lg rounded-full font-Cormorant hover:bg-pink-700 hover:text-white hover:border-pink-700 transition-all duration-300'>SHOP NOW</button>
            </div>
        </div>    
      </div>
    </div>
  )
}
