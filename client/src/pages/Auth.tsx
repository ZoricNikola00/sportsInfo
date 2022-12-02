import {FaEye} from 'react-icons/fa'
import {useState,useEffect} from 'react'

const Auth = () => {
  const [signedUp,setSignedUp]=useState(true)
  const [showPassword,setShowPassword]=useState(false)
  const styleEye='absolute top-[50%] translate-y-[-50%] text-gray-300 cursor-pointer hover:text-gray-500 right-5'

  return (
    <div className='w-[90%] md:w-[80%] mx-auto'>
      <form className='flex flex-col justify-center items-center w-[300px] md:w-[400px] mx-auto bg-slate-100 cShadow rounded-lg p-4'>
        <h1 className='text-3xl mb-2'>{signedUp?'Sign In' : 'Sign Up '}</h1>
        {signedUp?
          <>
            <input name='email' className='cInput' placeholder='Email'></input>
            <div className='w-full relative'>
              <input name='password' className='cInput' type={showPassword?'text':'password'} placeholder='Password'/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
            <div className='w-full relative'>
              <input name='confirmPassword' className='cInput' type={showPassword?'text':'password'} placeholder='Confirm Password'/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
          </>
          :
          <>
            <div className='flex justify-between'>
              <input name='firstName' className='w-[49%] cInput' placeholder='First Name'/>
              <input name='lastName' className='w-[49%] cInput' placeholder='Last Name'/>
            </div>
            <input name='email' className='cInput' placeholder='Email'/>
            <div className='w-full relative'>
              <input name='password' className='cInput' type={showPassword?'text':'password'} placeholder='Password'/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
            <div className='w-full relative'>
              <input name='confirmPassword' className='cInput' type={showPassword?'text':'password'} placeholder='Confirm Password'/>
              <FaEye onClick={_=>setShowPassword(p=>!p)} className={styleEye}/>
            </div>
          </>
        }
      </form>
    </div>
  )
}

export default Auth