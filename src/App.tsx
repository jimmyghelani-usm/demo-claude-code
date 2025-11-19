import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Vite + React + TypeScript</h1>
        <p>A modern development setup with best practices</p>
      </header>

      <main className="app-main">
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p className="hint">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <div className="features">
          <h2>Configured with:</h2>
          <ul>
            <li>Vite for lightning-fast builds</li>
            <li>React 18 with TypeScript</li>
            <li>ESLint for code quality</li>
            <li>Prettier for code formatting</li>
            <li>Vitest for unit testing</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
