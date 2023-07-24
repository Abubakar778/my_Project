import React from 'react'
import { useNavigate } from 'react-router-dom'

interface HeadingProps  {
    title : string,
    showButton? : boolean 
}
const Heading:React.FC<HeadingProps> = ({title,showButton}) => {
    const navigate = useNavigate();
  return (
    <div className='py-10'>
      <div className='flex justify-center'>
        <div className='flex flex-row justify-between w-3/4 sm:w-4/5 bg-green-400  items-center py-2 md:px-3 px-1 dark:bg-[#282A3A]'>
            <h1 className=' text-violet-200 font-bold  first-line:uppercase sm:first-letter:text-9xl 
            first-letter:text-4xl first-letter:text-white dark:first-letter:text-slate-100 md:first-letter:ml-3 first-line:tracking-widest md:p-3 dark:text-slate-100'>{title}</h1>
            {showButton && <button className='sm:p-2 px-1  dark:bg-gray-600 dark:hover:bg-gray-700 bg-violet-600 text-white md:font-bold hover:bg-violet-700  rounded' onClick={()=>navigate('/postevet')}>Post Event</button>}
        </div>
      
    </div>
    </div>
  )
}

export default Heading
