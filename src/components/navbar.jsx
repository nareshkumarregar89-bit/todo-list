import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-800 my-0 py-2'>
        <div className="logo mx-11 cursor-pointer" >
            <span className='text-white font-bold text-xl'>iTask</span>
        </div>
        <ul className='flex gap-4 mx-10 text-white'>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Tasks</li>

        </ul>
    </nav>
    
  )
}

export default navbar
