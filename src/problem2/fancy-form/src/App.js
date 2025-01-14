import logo from './logo.svg';
import './App.css';
import SwapForm from "./SwapForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SwapForm />
      </header>
    </div>
  );
}

export default App;
