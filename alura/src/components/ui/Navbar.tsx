import React from 'react'
import Nav1 from '../Nav1'
import Nav2 from '../nav2'

const Navbar = () => {
  return (
    <div className='flex justify-between item-center py-3 px-3'>
      <Nav1/>
      <Nav2/>
    </div>
  )
}

export default Navbar
