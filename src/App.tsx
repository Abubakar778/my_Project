import React from 'react';
import {Route,Routes} from 'react-router-dom'
import {useEffect} from 'react'
import Home from './screens/home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Postevet from './screens/Postevet';
import MyBooking from './screens/MyBooking';
import Events from './screens/Events';
import { useAppDispatch, useAppSelector } from './app/hook';
import { LogoutUser, loginSelector } from './features/LoginSlice';
import { isSessionExpired } from './utilities/expiretime';


function App() {
  const dispatch = useAppDispatch();
  const {userData} = useAppSelector(loginSelector)

  useEffect(() => {
    // console.log(typeof(userData?.expireTime))
    // console.log(userData?.expireTime)
    const checkInterval = setInterval(() => {
      if (isSessionExpired(userData?.expireTime)) {
        console.log("User session has expired. Logging out...");
        dispatch(LogoutUser)
      
      }
    }, 60000); 

    
    return () => clearInterval(checkInterval);
  }, [userData,dispatch])
  

  return (
    <>
    
      
    <Navbar />
    <main className='main-height text-[Poppines] bg-slate-200 dark:bg-[#1a1a1a]'>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/postevet' element={<Postevet/>} />
      <Route path='/booking' element={<MyBooking/>} />
      <Route path='/events' element={<Events/>} />
      





    </Routes>
    </main>
    <Footer />
    
    </>
  );
}

export default App;
