import React from 'react'
import img from '../assets/bg-2.png'
import { Link } from 'react-router-dom'
import img4 from '../assets/a1.png'
import img5 from '../assets/a2.png'
import img6 from '../assets/a3.png'

function Home() {
  return (
    <div className="main flex justify-center items-center w-screen h-screen">

<img src={img4} alt="" className='absolute w-[15%] left-[20%] bottom-[60%] opacity-10' />
<img src={img5} alt="" className='absolute w-[15%] left-[20%] bottom-[8%] opacity-10' />
<img src={img6} alt="" className='absolute w-[15%] left-[-7%] top-[0%] opacity-10' />
        <div className="main-front max grid grid-cols-2 w-full h-full items-center">




        <div className="front-left  h-[90%] flex justify-center items-start flex-col">
            <h2 className="text-[6rem]  leading-[7rem] w-[50%] text-slate-600 heading-one">Quick and Simple Payments
            </h2>
        
          <button className="btn-1 px-4 py-2 rounded-lg mt-6 "><Link to={"/login"}>Start now</Link></button>            
        </div>

        <div className="front-right h-[90%] rounded-3xl relative">
            <img src={img} className='absolute left-[-40%] w-[94%] top-[50px]' alt="" />
          </div>


        </div>

    </div>
  )
}

export default Home
