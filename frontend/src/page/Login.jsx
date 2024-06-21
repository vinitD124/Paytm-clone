import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import Oauth from '../components/Oauth';
import img4 from '../assets/a1.png'
import img5 from '../assets/a2.png'
import img6 from '../assets/a3.png'

function Login() {

  // ONLY GOOGLE AUTH WORK 
  
  const { register, handleSubmit } = useForm();


  return (
    <div className='login-main'>

<img src={img4} alt="" className='absolute w-[20%] left-[20%] top-[10%] opacity-5' />
<img src={img5} alt="" className='absolute w-[15%] left-[70%] bottom-[8%] opacity-5' />
<img src={img6} alt="" className='absolute w-[15%] left-[20%] bottom-[-20%] opacity-5' />

        <div className='absolute text-7xl text-slate-400 w-[25%] top-[300px] left-[50px]'>
            <h1 className='heading-4'>Sign in to get <span className='text-slate-600'>Started</span></h1>
        </div>
      <div className="w-[400px] login-form absolute right-[100px] top-[130px]">
        <div
        
          className="rounded-lg  overflow-hidden"
        >
          <div className="p-8 login-inside">
            <h2 className="text-center text-3xl font-extrabold text-grey-500 text-[#37006b]">
              Welcome Back
            </h2>
            <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input
                    {...register('email')}
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-indigo-300 bg-white text-black rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-800 focus:z-10 sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input
                    {...register('password')}
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-indigo-300 bg-white text-black rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-800 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </div>

            

              <div>
                <button
                  className="sign-btn bg-[#4461F2] w-full p-3 text-white rounded-md"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
      <Oauth/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
