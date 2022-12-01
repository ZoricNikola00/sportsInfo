import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaBars } from 'react-icons/fa'


const SearchBtn=()=>{
    return <FaSearch className='text-4xl mr-4 w-[50px] py-1 hover:border-b-[2px] hover:border-blue-500 cursor-pointer transition-all hover:text-blue-300'/>
}
const user=false
const Navbar = () => {
  return (
    <nav className="w-[95%] md:w-[80%] text-blue-500 font-bold italic flex items-center justify-between p-4 rounded mx-auto my-4 bg-slate-100 cShadow">
        <div>
            <Link to='/'><h1 className='text-4xl'>SportsInfo</h1></Link>
        </div>
        {user?
        <div className='flex items-center h-full'>
            <SearchBtn/>
            <img alt='photo' className='rounded-xl h-[50px]'/>
            <h1 className='mx-4 text-lg text-black'>Name</h1>
            <Link to='/' className='bg-red-500 hover:bg-white text-white hover:text-red-500 transition-colors p-2 rounded font-bold cursor-pointer'>
                Logout
            </Link>
        </div>
            :
        <div className='flex items-center'>
            <SearchBtn/>
            <Link to='signIn' className='w-fit cBtn'>Sign In</Link>
        </div>
        }
    </nav>
  )
}

export default Navbar