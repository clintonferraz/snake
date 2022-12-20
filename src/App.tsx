import { useState } from 'react'
import './styles/app.sass'
import { Board } from './components/Board'
import { Field } from './components/field'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="App">
      <Field />
    </div>
  )
}

export default App
