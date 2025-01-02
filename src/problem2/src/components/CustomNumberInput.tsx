import { NumberInput, NumberInputProps } from "@mantine/core";

const CustomNumberInput = ({ ...props }: NumberInputProps) => {
  return (
    <NumberInput
      {...props}
      thousandSeparator=","
      styles={(theme) => ({
        input: {
          fontWeight: 800,
          border: "none",
          fontSize: 24,
          background: "none",
          padding: 0,
          outline: "none",
          color: theme.colors.dark[0],
          textAlign: "end",
          width: "100%",
        },
      })}
      ta="end"
      rightSection={<></>}
      placeholder="0.00"
    />
  );
};

export default CustomNumberInput;
