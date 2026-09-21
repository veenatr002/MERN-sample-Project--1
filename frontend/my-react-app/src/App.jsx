import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <form action="http://localhost:5000/data" method="POST">
      <input type="text"  name="username" placeholder="Email Here"/>
      <input type="number" name="number" placeholder="Enter Number" />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default App
