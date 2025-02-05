import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dialog, IconButton } from "@radix-ui/themes";
import * as React from "react";
import Logo from "./Logo";
import { MENU_LIST } from "../utils";

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="pt-2">
          <IconButton variant="ghost" color="gray">
            <HamburgerMenuIcon width="18" height="18" />
          </IconButton>
        </div>
      </Dialog.Trigger>
      <Dialog.Content
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          maxWidth: "100%",
          borderRadius: 0,
        }}
      >
        <div className="flex justify-between">
          <Dialog.Title>
            <Logo hasTitle={false} />
          </Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost" color="gray">
              <Cross1Icon width="18" height="18" />
            </IconButton>
          </Dialog.Close>
        </div>
        <Dialog.Description size="2" mb="4">
          {MENU_LIST.map((elm) => {
            return (
              <div className="py-2 text-gray-400 font-bold" key={elm.id}>
                {elm.title}
              </div>
            );
          })}
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Sidebar;
