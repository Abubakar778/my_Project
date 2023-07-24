// import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useAppDispatch,useAppSelector } from '../app/hook'
import { LoginUser,loginSelector } from '../features/LoginSlice'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
const [name, setname] = useState<string>('')
const [emaill, setemail] = useState<string>('')
const [passwordd, setpassword] = useState<string>('')

const dispatch = useAppDispatch()
const navigate = useNavigate()
const {userData} = useAppSelector(loginSelector)

const HandleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
  event.preventDefault();
  const obj = {
query :`mutation{
  createUser(userInput:{name:"${name}",email:"${emaill}",password:"${passwordd}"}){
    email
    password
  }
}`
  }

  const responce = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-Type": "application/json",
      },
    });
    
     const result = await responce.json();
     const {email} = result.data.createUser
   await dispatch(LoginUser(email,passwordd));


}
useEffect(() => {
  if(userData){
    navigate(-1)
  }
}, [userData,navigate])


  return (
    <>
    {/* <div className='flex justify-center '></div> */}
    <div className='py-10 px-10'>
      <div className='flex flex-col space-y-5 sm:w-96 text-center bg-zinc-300 shadow-md shadow-gray-500 mt-[30px] rounded-lg mx-auto  dark:bg-[#282A3A] dark:shadow-lg dark:shadow-slate-950'>
        <div className='flex flex-col items-center'>
          <img src={require("../images/login.avif")} alt="image" className='w-40 h-40  mt-10 rounded-full'/>
        </div>
        
        <p className=' text-4xl text-white font-serif'>WELLCOME</p>
          
          <div>
            <form action="" onSubmit={HandleSubmit} className='flex flex-col space-y-5 p-4 sm:w-72 w-60 mx-auto font-serif'>

                <input type="text" placeholder='First name' className='inputClass p-1 rounded pl-5 focus:outline-none focus:shadow-inner focus:shadow-gray-500 text-violet-500 dark:text-black' />
              
                <input type="text" placeholder='Last name' className='inputClass p-1 rounded pl-5 focus:outline-none focus:shadow-inner text-violet-500 focus:shadow-gray-500  dark:text-black' required value={name}  onChange={(e)=>setname(e.target.value)}/>

                <input type="text" placeholder='example123@gmail.com' className='inputClass p-1 rounded pl-5 focus:outline-none focus:shadow-inner text-violet-500 focus:shadow-gray-500  dark:text-black' required value={emaill}  onChange={(e)=>setemail(e.target.value)}/>
              
            
                <input type="password" placeholder='password' className='inputClass placeholder-shown:border-gray-500 p-1 rounded pl-5 text-violet-500 focus:outline-none focus:shadow-inner focus:shadow-gray-500 dark:text-black' required value={passwordd}  onChange={(e)=>setpassword(e.target.value)} />
                <p className=' hover:text-blue-300 hover:underline hover:cursor-pointer font-serif font-bold text-white' onClick={()=>navigate('/login')}>already have an account Login</p>

                <button type='submit' className='bg-green-500 w-20 h-10 p-2 mx-auto rounded text-white hover:bg-green-700 hover:outline-2 '>Submit</button>

                
              
            </form>
          </div>
    </div>
    </div>
    </>
  )
}

export default Signup
