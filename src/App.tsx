import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {count}
    </div>
  )
}

export default App
