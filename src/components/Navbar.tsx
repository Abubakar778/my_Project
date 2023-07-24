import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { loginSelector } from '../features/LoginSlice'
import { useNavigate } from 'react-router-dom'
import { LogoutUser } from '../features/LoginSlice'




const Navbar = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const ClickHandle = ()=>{
    dispatch(LogoutUser)
    navigate('/')
  }
  const [first, setfirst] = useState<Boolean>(false)
  const {userData} = useAppSelector(loginSelector)
  const [moodeLight, setmoodeLight] = useState<boolean>(false)

  useEffect(() => {
    if(moodeLight){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')

    }
    
  }, [moodeLight])
  

  
  const Toogler = ()=>{
    setfirst(!first)
  }
  const MoodeToogel = () =>{
    setmoodeLight(!moodeLight)
  }
  
  return (
   <>
   <nav className=' bg-transparent absolute z-10 p-5 font-[Poppins] md:flex md:justify-between items-center w-full'>
      <div className='flex justify-between items-center '>
        <span className='text-3xl  cursor-pointer  text-white '>
            <FontAwesomeIcon icon={faCalendarCheck} className='mr-2'/>
            Event
        </span>
        <span className='text-3xl text-white cursor-pointer md:hidden block' >
          <FontAwesomeIcon icon={faBars} onClick={()=>Toogler()}/>
        </span>
      </div>
      <ul className= {`md:flex md:flex-row md:space-x-3  md:items-center hidden`}>
        <li>
          <button className=' bg-red-700 text-white font-serif font-bold p-2 rounded hover:bg-red-900' onClick={()=>MoodeToogel()}>{moodeLight?"Light":"Dark"}</button>
        </li>
        <li >
          <NavLink to={'/'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold'} >Home</NavLink>
        </li>
        
        <li >
          <NavLink to={'/events'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold '}>My Events</NavLink>
        </li>
        <li>
           <NavLink to={'/booking'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold mt-5'}>My Booking</NavLink>
        </li>
        {userData?(<>
          <button className='bg-red-500 hover:bg-red-900 p-2 rounded text-white w-28 font-bold ' onClick={()=>ClickHandle()}>
            Logout
          </button>
        </>):(<>
        <li>
           <NavLink to={'/login'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold'}>Login</NavLink>
        </li>
        </>)}
        
      </ul>
      {first && (<>
      <ul className='flex flex-col items-center space-y-3 transition-all ease-in duration-500 md:hidden '>
        <li>
          <button className=' bg-red-700 text-white font-serif font-bold p-2 rounded hover:bg-red-900' onClick={()=>MoodeToogel()}>{moodeLight?"Light":"Dark"}</button>
        </li>
        <li >
          <NavLink to={'/'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold '}>Home</NavLink>
        </li>
        <li >
          <NavLink to={'/events'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold '}>My Events</NavLink>
        </li>
        <li>
           <NavLink to={'/booking'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold mt-5'}>My Booking</NavLink>
        </li>
        <li>
           {userData?(<>
          <button className='bg-red-500 hover:bg-red-900 p-2 rounded text-white w-28 font-bold ' onClick={()=>ClickHandle}>
            Logout
            <span className='pl-2'>
             
            </span>
          </button>
        </>):(<>
        <li>
           <NavLink to={'/login'} className={'text-1xl cursor-pointer p-2 rounded hover:bg-red-900 duration-500 text-white font-bold'}>Login</NavLink>
        </li>
        </>)}
        </li>
      </ul>
      </>)}
   </nav>
   <div className=' relative w-full md:h-[527px] h-[300px]'>
          <img src={require('../images/event2.jpeg')} alt="" className='w-full md:h-[527px] h-[300px] shadow-sm shadow-slate-200  dark:opacity-100 dark:bg-black dark:inset-0' />
   </div>
            

    </>
  )
}


export default Navbar
