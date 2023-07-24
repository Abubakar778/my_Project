import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='mt-auto bg-red-400'>
      <p className='text-center  dark:bg-[#282A3A] p-2 text-white font-[Poppines] text-1xl font-bold'>Made by  <Link to={"https://www.linkedin.com/in/awan-abubakar-a2905326a/"}>AbuBakar</Link> in 2023</p>
    </div>
  )
}

export default Footer
