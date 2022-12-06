import { useState } from 'react'
import './App.css'
import MatchPage from './Components/MatchPage/MatchPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MatchPage/>
    </div>
  )
}

export default App
