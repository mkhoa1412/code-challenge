import * as React from "react";
import DropdownMenuBar from "./DropdownMenuBar";
import Logo from "./Logo";

interface IHeaderDesktopProps {}

const HeaderDesktop: React.FunctionComponent<IHeaderDesktopProps> = (props) => {
  return (
    <div className="p-4 px-[40px] flex items-center justify-between w-full h-full">
      <Logo />
      <DropdownMenuBar />
    </div>
  );
};

export default HeaderDesktop;
