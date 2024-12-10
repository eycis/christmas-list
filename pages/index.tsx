import React from 'react'
import MainPage from '@/components/MainPage'
import SnowParticles from '@/components/Particles'

const index = () => {
  return (
    <div className='relative w-screen h-screen bg-[#67312a]'>
    <SnowParticles />
    <MainPage/>
    </div>
  )
}

export default index