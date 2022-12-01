import {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaBars } from 'react-icons/fa'
import Search from './Search'


const SearchBtn=()=>{
    return <FaSearch className='text-4xl mr-4 w-[50px] py-1 hover:border-b-[2px] hover:border-blue-500 cursor-pointer transition-all hover:text-blue-300'/>
}
const user=false
const Navbar = () => {
    const [searchModal,setSearchModal]=useState(false)
    const [sidebar, setSidebar]=useState(false)


    window.addEventListener('click',(e:any)=>{
        if(e.target.dataset.attribute==='modal'){
            setSearchModal(false)
            setSidebar(false)
        }
    })
  return (
    <nav className="w-[95%] md:w-[80%] text-blue-500 font-bold italic flex items-center justify-between p-4 rounded mx-auto my-4 bg-slate-100 cShadow">
        <div data-attribute='modal' className={`flex justify-center items-center fixed top-0 left-0 w-full h-full text-black bg-blue-600/90 transition-all transition-500 ${searchModal?'opacity-100 z-30':'opacity-0 -z-30'}`}>
            <Search/>
        </div>
        <div>
            <Link to='/'><h1 className='text-4xl'>SportsInfo</h1></Link>
        </div>
        {user?
        <div className='hidden md:flex items-center h-full'>
            <FaSearch className='searchBtn' onClick={_=>setSearchModal(true)} />
            <img alt='photo' className='rounded-xl h-[50px]'/>
            <h1 className='mx-4 text-lg text-black'>Name</h1>
            <Link to='/' className='bg-red-500 hover:bg-white text-white hover:text-red-500 transition-colors p-2 rounded font-bold cursor-pointer'>
                Logout
            </Link>
        </div>
            :
        <div className='hidden md:flex items-center'>
            <FaSearch className='searchBtn' onClick={_=>setSearchModal(true)} />
            <Link to='signIn' onClick={_=>{setSearchModal(false);setSidebar(false)}} className='w-fit cBtn'>Sign In</Link>
        </div>
        }
        <div className='text-4xl cursor-pointer flex items-center md:hidden'>
            <FaSearch className='searchBtn' onClick={_=>setSearchModal(true)} />
            <FaBars onClick={_=>setSidebar(true)} className='hover:rotate-90 transition-transform'/>
        </div>
        <div data-attribute='modal' className={`flex justify-center items-center fixed top-0 left-0 w-full h-full text-black bg-blue-600/90 transition-all transition-500 ${sidebar?'opacity-100 z-30':'opacity-0 -z-30'}`}>
            <div className={`flex flex-col fixed top-0 left-0 w-[200px] h-full bg-white transition-all transiton-500 ${sidebar?'translate-x-0 z-30':'translate-x-[-100%] -z-30'}`}>
            {user?
            <div className='flex items-center flex-col h-full'>
                <img alt='photo' className='rounded-xl h-[50px]'/>
                <h1 className='mx-4 text-lg text-black'>Name</h1>
                <Link to='/' className='bg-red-500 hover:bg-white text-white hover:text-red-500 transition-colors p-2 rounded font-bold cursor-pointer'>
                    Logout
                </Link>
            </div>
                :
            <div className='flex items-center flex-col h-full'>
                <Link to='signIn' onClick={_=>{setSearchModal(false);setSidebar(false)}} className='w-fit cBtn'>Sign In</Link>
            </div>
            }
            </div>
        </div>
    </nav>
  )
}

export default Navbar