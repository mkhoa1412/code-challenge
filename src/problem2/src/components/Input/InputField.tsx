import { TextField } from "@radix-ui/themes";
import { cn } from "@utils/helpers";
import * as React from "react";

type ExtendedTextFieldProps = React.ComponentProps<typeof TextField.Root> & {
  className?: string;
};

const InputField: React.FunctionComponent<ExtendedTextFieldProps> = ({
  className,
  ...rest
}) => {
  return (
    <TextField.Root
      {...rest}
      className={cn("w-full !outline-none", className)}
    />
  );
};

export default InputField;
