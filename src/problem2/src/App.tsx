import "./App.css";
import SwapForm from "@components/SwapForm";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Currency Swap App</h1>
      <div>
        <SwapForm />
      </div>
    </div>
  );
};

export default App;
