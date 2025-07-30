import React from 'react'
import SwapForm from './components/SwapForm'

function App() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-3 text-shadow">
          Token Swap
        </h1>
        <p className="text-gray-400 text-lg">
          Exchange your tokens with real-time prices
        </p>
      </header>

      <main>
        <SwapForm />
      </main>
    </div>
  )
}

export default App