import { Converter } from "@components/Converter";

const App = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-10 text-6xl font-medium">Crypto Converter</h1>

      <Converter />
    </div>
  );
};

export default App;
