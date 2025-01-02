import {
  Box,
  BoxProps,
  Flex,
  Image,
  Loader,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { ReactNode } from "react";
import PlaceholderTokenImage from "./PlaceholderTokenImage";

interface IToken extends IPrice {
  image: string;
}

interface IProps extends BoxProps {
  token: IToken;
  label: string;
  estimatedValue: string | number | null;
  onTokenSelect: () => void;
  children: ReactNode;
  isSelected?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  isValueLoading?: boolean;
}

const TokenBox = ({
  label,
  onTokenSelect,
  token,
  children,
  estimatedValue,
  isSelected,
  hasError,
  isLoading = false,
  isValueLoading,
  ...props
}: IProps) => {
  return (
    <Box {...props}>
      <Text fw={600} fz="xs" c="dark.2" mb="xs">
        {label}
      </Text>
      <Paper
        bg="dark.7"
        p="sm"
        display="flex"
        radius="lg"
        sx={(theme) => ({
          justifyContent: "space-between",
          alignItems: "center",
          outline: hasError
            ? `3px solid ${theme.colors.red[8]}`
            : isSelected
            ? `3px solid ${theme.colors.lime[8]}`
            : "none",
        })}
      >
        <Box>
          <Skeleton visible={isLoading}>
            <Paper
              w="max-content"
              radius="lg"
              onClick={onTokenSelect}
              px={12}
              py={8}
              sx={(theme) => ({
                cursor: "pointer",
                display: "flex",
                gap: "12px",
                alignItems: "center",
                ":hover": {
                  backgroundColor: theme.colors.dark[8],
                },
              })}
            >
              {token?.image ? (
                <Image src={token?.image} width={45} height={45} />
              ) : (
                <PlaceholderTokenImage size={45} />
              )}
              <Flex align="center" gap={6}>
                <Text fw={700} fz="lg">
                  {token?.currency}
                </Text>
                <IconChevronDown size={18} stroke={3} />
              </Flex>
            </Paper>
          </Skeleton>
        </Box>
        <Box>
          {children}
          {isValueLoading ? (
            <Flex justify="end" pr={24}>
              <Loader size={16} color="dark.2" />
            </Flex>
          ) : (
            <>
              {!!estimatedValue && (
                <Text
                  truncate="end"
                  c="dark.2"
                  fw={600}
                  mt={-2}
                  ta="right"
                  fz="sm"
                >
                  ⁓{estimatedValue} USD
                </Text>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TokenBox;
