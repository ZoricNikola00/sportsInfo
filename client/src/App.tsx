import Navbar from "./components/Navbar"
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Creator from "./pages/Creator"

const App = () => {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Navigate to='/posts' replace/>}/>
            <Route path='/posts' element={<Home/>}/>
            <Route path='/posts/search' element={<Home/>}/>
            <Route path="/signIn" element={<Auth/>}/>
            <Route path='/creator/:name' element={<Creator/>}/>
        </Routes>
    </>
  )
}

export default App