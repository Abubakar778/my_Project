import React,{useEffect, useState} from 'react'
import { useAppSelector } from '../app/hook'
import { loginSelector } from '../features/LoginSlice'
import { useNavigate } from 'react-router-dom'
import Heading from '../components/Heading'
import { Event } from '../utilities/interfacess'

const MyBooking = () => {
const {userData} = useAppSelector(loginSelector)
const navigate = useNavigate()

    useEffect(() => {
      if(!userData){
        navigate('/login?redirect=/booking')
      }
      fetchevet()
    }, [navigate,userData])
    
   
  
const [bookedEventss, setbookedEvents] = useState<Event[]>([])
const [titleCancle, settitleCancle] = useState<string>('')
const [first, setfirst] = useState<string | null>(null)
  const [isOPen, setisOPen] = useState<boolean>(false)
  const [deletee, setdeletee] = useState<boolean>(false)
  const [itemdeleteid, setitemdeleteid] = useState<string>('')
  const [errorr, seterror] = useState<string | null>(null)


 const fetchevet = async() =>{
    const obj = {
    query :  `
 query{
  singleUser(userid:"${userData?._id}"){
    
    bookedEvents{
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
    const result = await responce.json()
    try{
      const {bookedEvents} = result.data.singleUser;
      console.log(bookedEvents)
      setbookedEvents(bookedEvents);
      return bookedEventss;

    }catch(error){
     const {message} = result.errors[0] ;
      seterror(message);
      console.log(errorr)
    }
  }

  const cancelEvent = async(eventid : string , userid : string) =>{
    const obj = {
      query : `
      mutation{
  cancelBooking(eventid:"${eventid}", userid:"${userid}"){
    _id
    title
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
    const result = await responce.json()
    try{
      const {_id,title} = result.data.cancelBooking;
      settitleCancle(_id)
      return _id

    }catch(error){
      console.log(error)
        const {message} = result.errors[0];
        console.log(message)
        return errorr
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
  const cancleHandle = (eventid:string , userid:string) =>{
    
        cancelEvent(eventid,userid).then((res)=>{
            // console.log(titleCancle)
           const filter =  bookedEventss.filter((item)=>item._id !== eventid)
           setbookedEvents(filter)
           setitemdeleteid('');
           setdeletee(false);
           
        })
    
  }


  return (
    
    <>
     {deletee && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
   
    <Heading title='My Booking' showButton = {true} />
    {
      deletee && (<>
     <div className='fixed inset-0 flex justify-center items-center z-50 '>
             <div className='bg-white font-serif flex flex-col rounded  py-2 px-10 text-violet-300 w-96 dark:text-black'>
      <p>Are you sure! You want to cancel booking of this Event</p>
      <div className='flex flex-row justify-between mt-5'>
          <button className='bg-red-500 rounded py-1 px-4 hover:bg-red-600 text-white font-bold' onClick={()=>userData &&cancleHandle(itemdeleteid,userData._id)}>
            Yes
          </button>
          <button className=' bg-yellow-400 hover:bg-yellow-500 text-white font-bold p-2 rounded' onClick={()=>setdeletee(false)}>Cancel</button>
      </div>

    </div>
     </div>
      </>)
    }

    <div className='  container grid md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 pb-10 mx-auto md:px-2 px-5'>

    {
      bookedEventss.length >=1 ? (<>
        {
          bookedEventss.map((item)=>{
            const isSelected = item._id === first;
            return (<>
            
              <div key={item._id} onClick={()=>toogler(item._id)}>
                  <div className=' bg-zinc-500 p-2 shadow-md shadow-gray-700 hover:shadow-lg hover:shadow-gray-600 flex flex-col text-white rounded relative font-serif dark:shadow-md dark:shadow-slate-950 dark:hover:shadow-lg dark:bg-[#282A3A] dark:text-slate-100 dark:hover:shadow-slate-950'>
                  
                        <h1 className=' uppercase text-white font-bold'>{item.title}</h1>
                    
                      <p>RS {item.price}/--</p>
                      <div className='flex flex-row justify-between'>

                      <button  className='rounded p-1 bg-gray-300  hover:bg-green-300 font-bold dark:bg-gray-600 dark:hover:bg-gray-700' >Detail</button>
                      
                    
                      
                        <p className='mt-auto'>Offerd by {item.creator.name}</p>
                      </div>
                      
                        
                      
                    </div>
                    {
                      isSelected && isOPen && (<>
                      <div className='bg-white rounded mt-2 p-2 text-violet-300  z-20 absolute md:w-96 sm:w-5/6 flex flex-col  font-serif shadow-md shadow-zinc-700 dark:bg-slate-600 dark:text-slate-50 dark:shadow-md dark:shadow-slate-950'  >
                        <div>
                            <button className='bg-red-700 text-white font-bold py-1 px-2  float-right hover:bg-red-900' onClick={()=>setisOPen(false)}>X</button>
                        </div>
                        <a href={`mailto:${item.creator.email}`} className='hover:text-blue-300 hover:cursor-pointer'>
                        {item.creator.email}
                        </a>
                        
                        <p >
                          {
                              item.description
                            }
                        </p>
                        <div className='pt-10 text-center'>
                          <button className='rounded p-1 bg-green-400 w-24 hover:bg-green-500 font-bold mx-auto text-white' onClick={()=>{setdeletee(true); setitemdeleteid(item._id)}} >Delete</button>
                        </div>
                    </div>
                      </>)
                    }
                    
              </div>
                
                  
                    

                  
                    
                  

              
              
            </>)
          })
        }
      
      </>):(<><p className='text-center text-2xl text-violet-400'>You have't booked any event yet</p> </>)
    }
    </div>
    
    </>
    
  )
}

export default MyBooking
