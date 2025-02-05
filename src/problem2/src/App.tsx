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
    <Theme
      accentColor="gray"
      grayColor="gray"
      scaling="100%"
      radius="full"
      panelBackground="translucent"
    >
      <Header />
      <ExchangeForm />
    </Theme>
  );
};

export default App;
