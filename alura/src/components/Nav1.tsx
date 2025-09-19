import React from 'react'

const Nav1 = () => {
  return (
    <div className='flex gap-6 items-center ml-12'>
      <a href="" className='flex gap-7'>
        <img src="/logo_bg.png" alt="Logo" className="h-11 w-11 object-contain" />
        <h4 className='font-semibold text-lg py-1.5 mr-3'>Alura</h4>
      </a>
      <a href="#" className='text-gray-500 font-semibold text-[17px]'>Home</a>
      <a href="#" className='text-gray-500 font-semibold text-[17px]'>Mood Journal</a>
      <a href="#" className='text-gray-500 font-semibold text-[17px]'>Safe Talk</a>
      <a href="#" className='text-gray-500 font-semibold text-[17px]'>Annonymous Zone</a>
    </div>
  )
}

export default Nav1
