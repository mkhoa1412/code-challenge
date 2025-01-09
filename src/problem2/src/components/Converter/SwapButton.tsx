import { ArrowLeftRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface IProps {
  onClick: () => void;
}

export const SwapButton = ({ onClick }: IProps) => {
  return (
    <Button type="button" variant="outline" size="icon" onClick={onClick}>
      <ArrowLeftRight />
    </Button>
  );
};
