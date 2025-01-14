import logo from './logo.svg';
import './App.css';
import CurrencySwapForm from "./CurrencySwapForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CurrencySwapForm />
      </header>
    </div>
  );
}

export default App;
