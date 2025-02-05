import * as React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

interface IHeaderMobileProps {}

const HeaderMobile: React.FunctionComponent<IHeaderMobileProps> = (props) => {
  return (
    <div className="p-4 flex items-center justify-between w-full h-full">
      <Logo />
      <Sidebar />
    </div>
  );
};

export default HeaderMobile;
