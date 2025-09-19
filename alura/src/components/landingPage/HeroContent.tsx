import React from 'react'
import RightHero from './RightHero'
import LeftHero from './LeftHero'
import { Loader } from 'lucide-react'

const HeroContent = () => {
  return (
    <div className='flex'>
      {/* <Loader/> */}
      <RightHero/>
      <LeftHero/>
    </div>
  )
}

export default HeroContent
