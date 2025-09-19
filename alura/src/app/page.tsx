import HeroContent from '@/components/landingPage/HeroContent'
import Page2 from '@/components/landingPage/Page2'
import Page3 from '@/components/landingPage/Page3'
import Page4 from '@/components/landingPage/Page4'
import Preloader from '@/components/landingPage/PreLoader'
// import Page5 from '@/components/landingPage/Page5'
import Navbar from '@/components/ui/Navbar'
// import { Loader } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='overflow-x-hidden'>
      
      <Navbar/>
      <HeroContent/>
      <Page2/>
      <Page3/>
      <Page4/>
      {/* <Page5/> may be later */}
      <Preloader/>
    </div>
  )
}

export default page
