

import React from 'react'

export default function Heading({text}) {
  return (
    <div id={text} className='pb-10'>
        <h2 className='text-2xl lg:text-5xl capitalize text-center Marck font-semibold pt-4 pb-3'>{text}</h2>
        <div className='flex justify-center items-center'><img className='w-36' src={horizontal} alt="" /></div>
        </div>
  )
}
