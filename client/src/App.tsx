import Navbar from "./components/Navbar"
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import Auth from "./pages/Auth"

const App = () => {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/signIn" element={<Auth/>}/>
        </Routes>
    </>
  )
}

export default App