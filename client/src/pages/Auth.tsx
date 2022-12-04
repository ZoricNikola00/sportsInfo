import {FaEye, FaGoogle} from 'react-icons/fa'
import React, {useState,useEffect} from 'react'
import {GoogleLogin} from 'react-google-login'
import { useGlobalContext } from '../context'

const Auth = () => {
  const [signedUp,setSignedUp]=useState(true)
  const {signIn,signUp}=useGlobalContext()
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({firstName:'', lastName:'', password:'', confirmPassword:'', email:''})
  const styleEye='absolute top-[50%] translate-y-[-50%] text-gray-300 cursor-pointer hover:text-gray-500 right-5'

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    if(signedUp){
      signIn(formData)
    }else{
      signUp(formData)
    }
    
  }

  const change=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const value=e.target.name;
    setFormData(p=>({...p,[value]:e.target.value}))
  }

  const googleSuccess=async()=>{

  }
  const googleFail=()=>{

  }
  return (
    <div className='w-[90%] md:w-[80%] mx-auto'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-[300px] md:w-[400px] mx-auto bg-slate-100 cShadow rounded-lg p-4'>
        <h1 className='text-3xl mb-2'>{signedUp?'Sign In' : 'Sign Up '}</h1>
        {signedUp?
          <>
            <input name='email' className='cInput' placeholder='Email' onChange={change}/>
            <div className='w-full relative'>
              <input name='password' className='cInput' type={showPassword?'text':'password'} placeholder='Password' onChange={change}/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
            <div className='w-full relative'>
              <input name='confirmPassword' className='cInput' type={showPassword?'text':'password'} placeholder='Confirm Password' onChange={change}/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
          </>
          :
          <>
            <div className='flex justify-between'>
              <input name='firstName' className='w-[49%] cInput' placeholder='First Name' onChange={change}/>
              <input name='lastName' className='w-[49%] cInput' placeholder='Last Name' onChange={change}/>
            </div>
            <input name='email' className='cInput' placeholder='Email' onChange={change}/>
            <div className='w-full relative'>
              <input name='password' className='cInput' type={showPassword?'text':'password'} placeholder='Password' onChange={change}/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
            <div className='w-full relative'>
              <input name='confirmPassword' className='cInput' type={showPassword?'text':'password'} placeholder='Confirm Password' onChange={change}/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
          </>
        }
        <button className='cBtn'>{signedUp?'Sign In':'Sign Up'}</button>
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          render={(props)=><button onClick={props.onClick} disabled={props.disabled} className='cBtn flex items-center justify-center cursor-pointer'><FaGoogle className='mr-1'/>Sign In With Google</button>}
          onSuccess={googleSuccess}
          onFailure={googleFail}
          cookiePolicy='single_host_origin'
        />
          <p className='w-full text-sm text-gray-600'>{!signedUp? 'Already have an account?':"Don't have an account?"}<span onClick={_=>setSignedUp(p=>!p)} className='ml-2 cursor-pointer hover:text-gray-400 text-base'>{signedUp?'Sign In':'Sign Up'}</span></p>
      </form>
    </div>
  )
}

export default Auth