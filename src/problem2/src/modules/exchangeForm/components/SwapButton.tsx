import { ArrowDownIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import * as React from "react";

interface ISwapButtonProps {}

const SwapButton: React.FunctionComponent<ISwapButtonProps> = (props) => {
  return (
    <>
      <IconButton variant="soft" color="gray">
        <ArrowDownIcon width="18" height="18" />
      </IconButton>
    </>
  );
};

export default SwapButton;
