import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import * as React from "react";
import { MENU_LIST } from "../utils";

interface IDropdownMenuBarProps {}

const DropdownMenuBar: React.FunctionComponent<IDropdownMenuBarProps> = (
  props
) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="soft" color="indigo" className="!cursor-pointer">
          <DotsHorizontalIcon width="18" height="18" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-[150px] ">
        {MENU_LIST.map((elm) => {
          return (
            <DropdownMenu.Item key={elm.id}>{elm.title}</DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuBar;
