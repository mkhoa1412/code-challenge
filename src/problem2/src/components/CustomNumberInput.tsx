import { NumberInput, NumberInputProps } from "@mantine/core";

const CustomNumberInput = ({ ...props }: NumberInputProps) => {
  return (
    <NumberInput
      {...props}
      thousandSeparator=","
      styles={{
        input: {
          textAlign: "right",
          fontWeight: 800,
          border: "none",
          fontSize: 24,
          background: "none",
        },
      }}
      ta="right"
      rightSection={<></>}
      placeholder="0.00"
    />
  );
};

export default CustomNumberInput;
