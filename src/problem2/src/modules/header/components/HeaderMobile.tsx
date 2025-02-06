import * as React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import SwapHistory from "./SwapHistory";
import WalletInfo from "./WalletInfo";

interface IHeaderMobileProps {}

const HeaderMobile: React.FunctionComponent<IHeaderMobileProps> = (props) => {
  return (
    <div className="p-4 flex items-center justify-between w-full h-full">
      <Logo />
      <div className="flex gap-2 items-center">
        <SwapHistory />
        <WalletInfo />
        <Sidebar />
      </div>
    </div>
  );
};

export default HeaderMobile;
