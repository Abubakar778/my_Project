import React,{useState,useEffect} from 'react'
import { useAppSelector } from '../app/hook'
import { loginSelector } from '../features/LoginSlice'
import { useNavigate } from 'react-router-dom'
import Heading from '../components/Heading'
import { Event } from '../utilities/interfacess'

const Events = () => {
    const {userData} = useAppSelector(loginSelector)
    const navigate = useNavigate();

    useEffect(() => {
      if(!userData){
        navigate('/login?redirect=/events')
      }
      fetchevet()
    }, [navigate,userData])
    
   

    const [bookedEventss, setbookedEvents] = useState<Event[]>([])
const [first, setfirst] = useState<string | null>(null)
const [isOPen,setisOPen] = useState<boolean>(false)



    const fetchevet = async() =>{
    const obj = {
    query :  `
 query{
  singleUser(userid:"${userData?._id}"){
    
    createdEvents{
      _id
      title
      description
      price
      date
      creator{
        name
        email
      }
    }
  }
}
  `
    }
    const responce = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-Type": "application/json",
        "Authorization" : `Bearer ${userData?.token}`
      },
    });
    try{
      const result = await responce.json()
      const {createdEvents} = result.data.singleUser;
      setbookedEvents(createdEvents);
      return bookedEventss;

    }catch(error){
        return error
    }
  }

  
  const toogler = (id : string) =>{
    if(first === id){
      setfirst(null)
      setisOPen(false)
    }else{
      setfirst(id)
      setisOPen(true)

    }
  }

  return (
    <>
     <Heading title='My Events' showButton = {true} />

    <div className=' container grid md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 pb-10 mx-auto md:px-2 px-5'>

    {
      bookedEventss.length >=1 ? (<>
        {
          bookedEventss.map((item)=>{
            const isSelected = item._id === first;
            return (<>
            
              <div key={item._id} onClick={()=>toogler(item._id)}>
                  <div className='  bg-[#FF9B9B] p-2 shadow-md dark:bg-[#282A3A] shadow-gray-700 hover:shadow-lg hover:shadow-gray-600 flex flex-col  text-white dark:text-slate-100 rounded relative font-serif dark:shadow-md dark:shadow-slate-950 dark:hover:shadow-lg dark:hover:shadow-slate-950'>
                    
                        <h1 className=' uppercase text-white font-bold'>{item.title}</h1>
                    
                      <p>RS {item.price}/--</p>
                      <div className='flex flex-row justify-between'>

                        <button  className='rounded p-2 bg-[#FF6969]  hover:bg-red-500 font-bold dark:bg-gray-600 dark:hover:bg-gray-700' >Detail</button>
                      
                    
                      
                        <p className='mt-auto'>Offerd by {item.creator.name}</p>
                      </div>
                      
                        
                      
                    </div>
                    {
                      isSelected && isOPen && (<>
                      <div className='bg-white rounded mt-2 p-2 text-violet-300  z-20 absolute md:w-96 sm:w-5/6 flex flex-col  font-serif shadow-md shadow-zinc-700 dark:bg-slate-600 dark:text-slate-50 dark:shadow-md dark:shadow-slate-950' >
                        <div>
                            <button className='bg-red-700 text-white font-bold py-1 px-2  float-right hover:bg-red-900' onClick={()=>setisOPen(false)}>X</button>
                        </div>
                        <p>
                          {
                              item.title
                            }
                        </p>
                        <a href={`mailto:${item.creator.email}`} className='hover:text-blue-300 hover:cursor-pointer'>
                        {item.creator.email}
                        </a>
                        
                        <p>
                          {
                              item.description
                            }
                        </p>
                        {/* <div className='pt-10 text-center'>
                          <button className='rounded p-1 bg-green-400 w-24 hover:bg-green-500 font-bold mx-auto text-white' onClick={()=>{setdeletee(true); setitemdeleteid(item._id)}} >Delete</button>
                        </div> */}
                    </div>
                      </>)
                    }
                    
              </div>
                
                  
                    

                  
                    
                  

              
              
            </>)
          })
        }
      
      </>):(<><p className='text-center text-2xl text-violet-400'>You have't created any event yet</p> </>)
    }
    </div>


    
    </>
  )
}

export default Events
