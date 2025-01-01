import {
  Box,
  BoxProps,
  Flex,
  Image,
  Loader,
  NumberFormatter,
  Paper,
  Skeleton,
  Text,
  useMantineTheme,
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
  const {
    colors: { dark },
  } = useMantineTheme();
  return (
    <Box {...props}>
      <Text fw={600} fz="xs" c="dark.2" mb="xs">
        {label}
      </Text>
      <Paper
        bg="dark.7"
        pl="sm"
        py="sm"
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
        <Skeleton visible={isLoading} w={160}>
          <Paper
            miw="max-content"
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
        <div>
          {children}
          {isValueLoading ? (
            <Flex justify="end" pr={24}>
              <Loader size={16} color="dark.2" />
            </Flex>
          ) : (
            <>
              {!!estimatedValue && (
                <NumberFormatter
                  value={estimatedValue}
                  thousandSeparator
                  prefix="⁓"
                  suffix=" USD"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    fontSize: 14,
                    paddingRight: 24,
                    marginTop: -4,
                    color: dark[2],
                    fontWeight: 600,
                  }}
                />
              )}
            </>
          )}
        </div>
      </Paper>
    </Box>
  );
};

export default TokenBox;
