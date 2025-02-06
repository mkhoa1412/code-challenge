import * as React from "react";
import DropdownMenuBar from "./DropdownMenuBar";
import Logo from "./Logo";
import SwapHistory from "./SwapHistory";
import WalletInfo from "./WalletInfo";

interface IHeaderDesktopProps {}

const HeaderDesktop: React.FunctionComponent<IHeaderDesktopProps> = (props) => {
  return (
    <div className="p-4 px-[40px] flex items-center justify-between w-full h-full">
      <Logo />
      <div className="flex gap-2 items-center">
        <SwapHistory />
        <WalletInfo />
        <DropdownMenuBar />
      </div>
    </div>
  );
};

export default HeaderDesktop;
