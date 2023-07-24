import React, {useState,useEffect} from 'react'
import { loginSelector,LoginUser } from '../features/LoginSlice';
import { useAppDispatch,useAppSelector } from '../app/hook';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = (): React.ReactElement  => {
  
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('')
  const {loading,error,userData} = useAppSelector(loginSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

   const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
     dispatch(LoginUser(email,password)) 

  }
  const {search} = useLocation();
  const query = new URLSearchParams(search)
  const redirect = query.get('redirect') === null ? '/' :query.get('redirect');
  console.log(redirect)
  useEffect(() => {
    if(userData?._id){
      if(redirect){

        navigate(redirect)
      }
    }
  }, [userData,navigate,redirect])
  

  return (
    <>
    {/* <div className='flex justify-center '></div> */}
    <div className='py-20 px-10'>
      <div className='flex flex-col space-y-5 sm:w-96  h-[500px]  text-center text-white bg-zinc-300 shadow-md dark:shadow-lg dark:shadow-slate-950 shadow-gray-500 rounded-lg mx-auto dark:bg-[#282A3A] dark:text-slate-100 font-serif'>
        <div className='flex flex-col items-center'>
          <img src={require("../images/login.avif")} alt="image" className='w-40 h-40  mt-10 rounded-full'/>
        </div>
        {
          error?(<>
          <p className='  text-red-300'>{error}</p>

          </>):(<>
          <p className='  text-4xl'>WELLCOME</p>

          </>)
        }
          
          <div>
            <form action="" onSubmit={HandleSubmit} className='flex flex-col space-y-5 p-4 w-72 mx-auto'>
              
                <input type="text" placeholder='email' className='inputClass p-1 rounded pl-5 w-auto focus:outline-none focus:shadow-inner text-violet-500 focus:shadow-gray-500 dark:text-black' required value={email}  onChange={(e)=>setemail(e.target.value)}/>
              
            
                <input type="password" placeholder='password' className='inputClass placeholder-shown:border-gray-500 p-1 rounded pl-5 focus:outline-none focus:shadow-inner focus:shadow-gray-500 text-violet-500  dark:text-black' required value={password}  onChange={(e)=>setpassword(e.target.value)} />

                <button type='submit' className='bg-green-500 w-20 h-10 p-2 mx-auto rounded text-white hover:bg-green-700 hover:outline-2 '>Submit</button>

                <div className='flex felx-row justify-between  font-bold'>
                <p className='hover:text-blue-300 hover:underline hover:cursor-pointer' onClick={()=>navigate('/signup')}>SIGN UP</p>
                <p className=' hover:text-blue-300 hover:underline hover:cursor-pointer'>Forget Password</p>
                </div>
              
            </form>
          </div>
    </div>
    </div>

    
    </>
  )
}

export default Login
