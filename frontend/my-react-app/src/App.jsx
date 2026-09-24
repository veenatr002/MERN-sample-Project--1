import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Datapage from "./Datapage"
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Formpage from './Formpage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
<nav className="bg-blue-600 text-white p-4 flex gap-6 justify-center" >
<Link to="/" className="hover:text-gray-200">
Home</Link>
{ "|" }

<Link to="/data" className="hover:text-gray-200">Data View</Link>
</nav>

    <Routes>
      <Route path="/" element={<Formpage/>}/>
      <Route path = "/data" element={<Datapage/>}/>


    </Routes>
    
    </BrowserRouter>
    

    
      
      
    
    </>
  )
}

export default App
