import * as React from "react";

import { isMobile } from "@utils/helpers";
import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className="h-[56px] md:h-[64px] w-full bg-none">
      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
    </div>
  );
};

export default Header;
