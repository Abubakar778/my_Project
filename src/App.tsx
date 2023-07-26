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
    const checkInterval = setInterval(() => {
      console.log('this is expire time' + userData?.expireTime);
      if (isSessionExpired(userData?.expireTime)) {
        dispatch(LogoutUser)
      
      }
    }, 60000); 

    
    return () => clearInterval(checkInterval);
  }, [userData,dispatch])
  

  return (
    <>
    
      
    <Navbar />
    <main className='main-height text-[Poppines] dark:bg-gradient-to-t dark:from-gray-700 dark:to-gray-600 bg-gradient-to-t from-blue-200  to-violet-200 '>

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
