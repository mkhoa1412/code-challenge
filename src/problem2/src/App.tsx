import ExchangeForm from "@modules/exchangeForm/ExchangeForm";
import Header from "@modules/header/Header";
import { Theme } from "@radix-ui/themes";
import * as React from "react";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  React.useEffect(() => {
    const handlePopState = (event) => {
      window.location.reload();
    };
    window.addEventListener("popstate", handlePopState);
    screen.orientation?.addEventListener("change", handlePopState);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
      screen.orientation?.removeEventListener("change", handlePopState);
    };
  }, []);

  return (
    <Theme accentColor="blue" grayColor="olive" scaling="100%" radius="full">
      <div className="min-h-screen bg-linear-to-r from-blue-100 to-white from-10% flex flex-col pt-3 md:pt-[20px]">
        <Header />
        <ExchangeForm />{" "}
      </div>
    </Theme>
  );
};

export default App;
