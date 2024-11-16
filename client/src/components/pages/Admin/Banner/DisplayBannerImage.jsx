import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

export default function DisplayBannerImage({imageName,onClose}) {
  return (
    <div className='fixed bg-slate-500 bg-opacity-60 bottom-0 top-0 right-0 left-0 flex justify-center items-center overflow-hidden'>
        <div className='relative'>
            <div className=' bg-white shadow-lg rounded-md max-w-7xl mx-auto p-4 overflow-y-scroll'>
                    <div className='absolute top-3 right-5 w-fit ml-auto text-2xl hover:text-pink-900 cursor-pointer' onClick={onClose}>
                        <IoIosCloseCircle/>
                    </div>

                <div className=' flex justify-center max-w-[85vh] p-4 '>
                    <img src={`http://localhost:7800/Banners/`+imageName} className='w-full h-full' alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
