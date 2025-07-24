import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './components/UserList'

function App() {
  const [count, setCount] = useState(0)
  const [showDemo, setShowDemo] = useState(false)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Go Backend</h1>
      
      <div className="card">
        <button onClick={() => setShowDemo(!showDemo)}>
          {showDemo ? '隐藏' : '显示'} 前后端交互演示
        </button>
        
        <div style={{ margin: '20px 0' }}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {showDemo && <UserList />}
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
