import { Center } from "@mantine/core";
import { IconCurrencyBitcoin } from "@tabler/icons-react";

interface IProps {
  size?: number;
}

const PlaceholderTokenImage = ({ size = 40 }: IProps) => (
  <Center
    sx={(theme) => ({
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: theme.colors.dark[5],
    })}
  >
    <IconCurrencyBitcoin size={24} />
  </Center>
);

export default PlaceholderTokenImage;
