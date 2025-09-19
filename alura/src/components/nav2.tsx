import React from 'react'
import Link from 'next/link'
import ThemeToggleButton from './ui/theme-toggle-button'

const Nav2 = () => {
  return (
    <div className="flex">
      <div className="flex items-center gap-8 px-2 mr-24">
        <Link href="/dashboard" className="text-gray-500 font-semibold text-[17px]">
          My growth
        </Link>
        <Link href="/mood-bite" className="text-gray-500 font-semibold text-[17px]">
          Mood bite
        </Link>
      </div>
      <div className="mr-5">
        <ThemeToggleButton />
      </div>
    </div>
  )
}

export default Nav2
