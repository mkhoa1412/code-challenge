import logoImage from "@assets/demex/demex_color.png"; // Use alias if configured
import { Button } from "@radix-ui/themes";
import { Avatar } from "@radix-ui/themes/components/avatar";
import * as React from "react";

interface ILogoProps {
  hasTitle?: boolean;
}

const Logo: React.FunctionComponent<ILogoProps> = ({ hasTitle = true }) => {
  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          window.location.reload();
        }}
      >
        <Avatar size="1" src={logoImage} fallback="A" />
        {hasTitle && <span className="font-bold text-blue-600">DEMEX</span>}
      </Button>
    </div>
  );
};

export default Logo;
