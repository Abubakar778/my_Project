import React,{useEffect, useState} from 'react'
import { useAppSelector } from '../app/hook'
import { loginSelector } from '../features/LoginSlice'
import { useNavigate } from 'react-router-dom'
import Heading from '../components/Heading'
const Postevet = () => {
    const [titlee, settitle] = useState<string>('')
    const [descriptions, setdescriptions] = useState<string>('')
    const [prices, setprices] = useState<string>('')
    const [dates, setdates] = useState<string>('')

    const {userData} = useAppSelector(loginSelector)
    const navigate = useNavigate()

    useEffect(() => {
      if(!userData){
        navigate('/login?redirect=/postevet')
      }
    }, [navigate,userData])


    const HandleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
  event.preventDefault();
  const test = {
    title : titlee,
    description : descriptions,
    price : parseInt(prices),
    date : dates.toString(),
    creators : userData?._id
  }






  const obj = {
query :`mutation{
  createEvent(eventInput:{title:"${test.title}",description:"${test.description}",price:${test.price},date:"${test.date}",creator:"${test.creators}"}){
    title
  }
}
`
  }
  // console.log('this is obj' + ' ' + obj.query)

  const responce = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-Type": "application/json",
        "Authorization":`Bearer ${userData?.token}`
      },
    });
     
    try{
            const result = await responce.json()
            const {title} = result.data.createEvent
            // console.log(" this s  tiltel " + title)
    if(!result.errors){

        alert('Event added successfully')
         navigate('/')
    }else{
        alert(`${result.errors.message}`)


    }
    }catch(error){
            console.log('not added sussfully')
    }
    
    


}
    
  return (
    <>
    
    <Heading title='Share your ideas' />
     <div className='pb-10'>
      <div className='flex flex-col space-y-5 sm:w-96 w-80 text-center bg-zinc-300 shadow-lg shadow-gray-500 mt-[30px] rounded-lg mx-auto dark:bg-[#282A3A] dark:shadow-lg dark:shadow-slate-950 px-10'>
        <div className='flex flex-col items-center'>
          <img src={require("../images/login.avif")} alt="image" className='w-40 h-40  mt-10 rounded-full'/>
        </div>
        
        <p className=' font-serif text-4xl text-white'>ADD EVENT</p>
          
          <div>
            <form action="" onSubmit={HandleSubmit} className='flex flex-col space-y-5 p-4 sm:w-80 w-auto mx-auto justify-center font-serif'>

                
              
                <input type="text" placeholder='title' className='inputClass p-1 rounded pl-5 focus:outline-none focus:shadow-inner focus:shadow-gray-500' required value={titlee}  onChange={(e)=>settitle(e.target.value)}/>

                
              
            
                <input type="number" placeholder='price' className='inputClass placeholder-shown:border-gray-500 p-1 rounded pl-5 focus:outline-none focus:shadow-inner focus:shadow-gray-500' required value={prices}  onChange={(e)=>setprices(e.target.value)} />

                <input type="date" placeholder='First name' className='inputClass p-1 rounded pl-5 focus:outline-none focus:shadow-inner focus:shadow-gray-500' required value={dates}  onChange={(e)=>setdates(e.target.value)} />
                <textarea
                      placeholder='description'
                     className='inputClass p-1 rounded pl-5 focus:outline-none h-36  focus:shadow-inner focus:shadow-gray-500'
                     required
                       value={descriptions}
                     onChange={(e) => setdescriptions(e.target.value)}
                    />

                <button type='submit' className='bg-green-500 w-20 h-10 p-2 mx-auto rounded text-white hover:bg-green-700 hover:outline-2 '>Submit</button>

                
              
            </form>
          </div>
    </div>
    </div>

    </>
  )
}

export default Postevet
