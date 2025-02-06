import { CounterClockwiseClockIcon, ExitIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { isMobile } from "@utils/helpers";
import * as React from "react";

interface IWalletInfoProps {}

const WalletInfo: React.FunctionComponent<IWalletInfoProps> = (props) => {
  return (
    <>
      {" "}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="indigo" variant="soft" size={isMobile ? "1" : "2"}>
            <CounterClockwiseClockIcon />
            <span className="font-bold">0xc2cC...868f</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="min-w-[120px] !p-0">
          <DropdownMenu.Item>
            Disconnect <ExitIcon />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default WalletInfo;
