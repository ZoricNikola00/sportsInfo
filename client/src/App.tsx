import Navbar from "./components/Navbar"
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/Home"
import Auth from "./pages/Auth"

const App = () => {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Navigate to='/posts' replace/>}/>
            <Route path='/posts' element={<Home/>}/>
            <Route path='/posts/search' element={<Home/>}/>
            <Route path="/signIn" element={<Auth/>}/>
            
        </Routes>
    </>
  )
}

export default App