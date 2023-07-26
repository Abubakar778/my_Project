import React, { useState , useEffect } from 'react'
import { loginSelector } from '../features/LoginSlice'
import { useAppSelector } from '../app/hook'
import { useNavigate } from 'react-router-dom'
import Heading from '../components/Heading'
import { Event } from '../utilities/interfacess'
const Home = () => {
  
  const [eventss, setevents] = useState<Event[]>([])
  const [first, setfirst] = useState<string | null>(null)
  const [isOPen, setisOPen] = useState<boolean>(false)
  const [title, settitle] = useState<string>('')

 
 
  
  const fetchevet = async() =>{
    const obj = {
    query :  `
      query{
  events{
    _id
    title
    price
    description
    date
    creator{
      name
      email
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
      },
    });
    try{
      const result = await responce.json()
      const {events} = result.data;
      // console.log(events)
      setevents(events);
      return eventss;

    }catch(error){
        return error
    }
  }

  const bookEvent = async(eventid : string , userid : string) =>{
    const obj = {
      query : `
        mutation{
  bookEvent(eventid:"${eventid}" , userid:"${userid}"){
    name
  }
}
      `
    }

    console.log(obj.query)

    const responce = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-Type": "application/json",
        "Authorization": `Bearer ${userData?.token}`,
      },
    });
    try{
      const result = await responce.json()
      const {title} = result.data;
      settitle(title)
      return title;

    }catch(error){
        return error
    }

    
  }
  
  
   useEffect(() => {
    fetchevet()
  }, [])
   const toogler = (id : string) =>{
    if(first === id){
      setfirst(null)
      setisOPen(false)
    }else{
      setfirst(id)
      setisOPen(true)

    }
  }
  const {userData} = useAppSelector(loginSelector)
  const navigate = useNavigate()
  const bookingHandle = (eventid:string , userid:string , eventname:string) =>{
        bookEvent(eventid,userid).then((res)=>alert(` ${eventname} Event booked successfully`)) 
  }
  return (
    <>
    <Heading title = "Event Planner" showButton ={true} />
    
    <div className=' container grid md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 pb-7 mx-auto md:px-2 px-5'>

    {
      eventss && (<>
        {
          eventss.map((item)=>{
            const isSelected = item._id === first;
            return (<>
            
              <div key={item._id} onClick={()=>toogler(item._id)}>
                  <div className=' bg-[#FF9B9B] p-2 shadow-md dark:bg-[#282A3A] shadow-gray-700 hover:shadow-lg hover:shadow-gray-600 flex flex-col  text-white dark:text-slate-100 rounded relative font-serif dark:shadow-md dark:shadow-slate-950 dark:hover:shadow-lg dark:hover:shadow-slate-950'>
                  
                 <div>
                         <h1 className=' uppercase font-bold'>{item.title}</h1>
                 </div>
                    
                      <div>
                        <p>RS {item.price}/--</p>
                      </div>
                      <div className='flex flex-row justify-between'>
                        <button  className='rounded p-2 bg-[#FF6969]  hover:bg-red-500 font-bold dark:bg-gray-600 dark:hover:bg-gray-700' >Detail</button>
                      
                    
                      
                        <p className='pl-5 mt-auto'>Offerd by {item.creator.name}</p>
                      </div>
                        
                      
                    </div>
                    {
                      isSelected && isOPen && (<>
                      <div className=' bg-stone-100 rounded mt-2 p-2 text-violet-300  z-20 absolute md:w-96 sm:w-5/6 flex flex-col  font-serif dark:bg-slate-600 dark:text-slate-50 dark:shadow-md dark:shadow-slate-950'  >
                        <div>
                            <button className='bg-red-700 text-white font-bold py-1 px-2  float-right hover:bg-red-900' onClick={()=>setisOPen(false)}>X</button>
                        </div>
                        <p >
                          {
                              item.title
                            }
                        </p>
                        <a href={`mailto:${item.creator.email}`} className='hover:text-blue-300 hover:cursor-pointer'>
                        {item.creator.email}
                        </a>
                        
                        <p >
                          {
                              item.description
                            }
                        </p>
                        <div className='pt-10 text-center'>
                          <button className='rounded p-1 bg-green-400 w-24 hover:bg-green-500 font-bold mx-auto text-white dark:bg-gray-800 dark:hover:bg-gray-900' onClick={()=>!userData?navigate('/login'):bookingHandle(item._id,userData._id,item.title)} >Book</button>
                        </div>
                    </div>
                      </>)
                    }
                    
              </div>
                
                  
                    

                  
                    
                  

              
              
            </>)
          })
        }
      
      </>)
    }
    </div>
    
    </>
    
    
  )
}

export default Home
