import {
  ActionIcon,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Image,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAlertTriangleFilled,
  IconSearch,
  IconSwitchVertical,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import CustomNumberInput from "./components/CustomNumberInput";
import PlaceholderTokenImage from "./components/PlaceholderTokenImage";
import TokenBox from "./components/TokenBox";
import { priceService } from "./services/price";
import { formatPrice } from "./utils/format";

interface IToken extends IPrice {
  image: string;
}

interface IFormValue {
  searchQuery: string;
  swapDirection: "source" | "destination";
  sourceToken: IToken;
  destinationToken: IToken;
  sourceAmount: number;
  destinationAmount: number;
  isSourceTokenSelected: boolean;
  isDestinationTokenSelected: boolean;
  isSourceChosen: boolean;
  isDestinationChosen: boolean;
}

const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

function App() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isSourceValueLoading, setIsSourceValueLoading] = useState(false);
  const [isDestinationValueLoading, setIsDestinationValueLoading] =
    useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const {
    fontSizes,
    colors: { dark, red },
  } = useMantineTheme();

  const { setFieldValue, values, getInputProps, errors } = useForm<IFormValue>({
    validate: {
      sourceAmount: (value) => value < 0 && "Amount should be greater than 0",
      destinationAmount: (value) =>
        value < 0 && "Amount should be greater than 0",
    },
    validateInputOnChange: true,
  });
  const {
    searchQuery,
    swapDirection,
    sourceToken,
    destinationToken,
    sourceAmount,
    destinationAmount,
    isSourceTokenSelected,
    isDestinationTokenSelected,
    isSourceChosen,
    isDestinationChosen,
  } = values;

  const { data = [], isLoading } = useQuery({
    queryFn: () =>
      priceService.getPrices().then(async (res) => {
        const uniqueData = Array.from(
          res
            .reduce((map, item) => {
              const existing = map.get(item.currency);
              if (!existing || dayjs(item.date).isAfter(dayjs(existing.date))) {
                map.set(item.currency, item);
              }
              return map;
            }, new Map())
            .values()
        );
        const result = await Promise.all(
          uniqueData.map(async (item) => {
            const imageUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`;
            const isImageExists = await checkImageExists(imageUrl);
            return {
              ...item,
              image: isImageExists ? imageUrl : null,
            };
          })
        );
        setFieldValue("sourceToken", result?.[0]);
        setFieldValue("destinationToken", result?.[1]);
        return result;
      }),
  });

  const debounce = (callback: () => void) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(callback, 700);
  };

  const filteredTokens = useMemo(
    () =>
      searchQuery
        ? data?.filter((item) =>
            item.currency.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : data,
    [data, searchQuery]
  );

  const handleSwap = () => {
    setFieldValue("sourceToken", destinationToken);
    setFieldValue("destinationToken", sourceToken);
    setFieldValue("sourceAmount", destinationAmount);
    setFieldValue("destinationAmount", sourceAmount);
  };

  const openModal = () => {
    open();
    setTimeout(() => {
      searchInputRef?.current?.focus();
    }, 100);
  };

  const parseFromValue = useMemo(() => {
    if (!sourceToken || !sourceAmount) return null;
    const sum = sourceToken.price * sourceAmount;
    return formatPrice(sum);
  }, [sourceToken, sourceAmount]);

  const parseToValue = useMemo(() => {
    if (!destinationToken || !destinationAmount) return null;
    const sum = destinationToken.price * destinationAmount;
    return formatPrice(sum);
  }, [destinationToken, destinationAmount]);

  return (
    <Container size="xl" pt={80} pb="xl">
      <Center>
        <Stack justify="center" align="center" gap="lg">
          <Text fw={600} fz="h2">
            Swap Assets
          </Text>
          <Paper radius="xl" p={{ base: 18, md: 26 }} bg="dark.9" maw={500}>
            <TokenBox
              hasError={!!errors?.sourceAmount}
              isValueLoading={isSourceValueLoading}
              isLoading={isLoading}
              isSelected={isSourceTokenSelected}
              label="From"
              onTokenSelect={() => {
                setFieldValue("swapDirection", "source");
                openModal();
              }}
              token={sourceToken}
              estimatedValue={parseFromValue}
            >
              <CustomNumberInput
                sx={{ opacity: isSourceValueLoading ? 0.5 : 1 }}
                {...(getInputProps("sourceAmount"),
                {
                  value: sourceAmount,
                  onChange: (value) => {
                    setFieldValue("sourceAmount", Number(value));
                    const sum =
                      (sourceToken.price * Number(value)) /
                      destinationToken.price;
                    setIsDestinationValueLoading(true);
                    debounce(() => {
                      setFieldValue("destinationAmount", sum);
                      setIsDestinationValueLoading(false);
                    });
                  },
                  onClick: () => {
                    setFieldValue("swapDirection", "source");
                    setFieldValue("isSourceChosen", true);
                    setFieldValue("isSourceTokenSelected", true);
                    setFieldValue("isDestinationChosen", false);
                  },
                  onBlur: () => setFieldValue("isSourceTokenSelected", false),
                })}
              />
            </TokenBox>
            <Divider
              mx={{ base: -18, md: -26 }}
              py="lg"
              color="dark.4"
              styles={{
                label: {
                  "&::before": {
                    marginInlineEnd: "0px !important",
                  },
                  "&::after": {
                    marginInlineStart: "0px !important",
                  },
                },
              }}
              label={
                <ActionIcon
                  size="xl"
                  radius="xl"
                  variant="outline"
                  onClick={handleSwap}
                  color="dark.3"
                  c="lime"
                >
                  <IconSwitchVertical size={24} />
                </ActionIcon>
              }
            />
            <TokenBox
              hasError={!!errors?.destinationAmount}
              isValueLoading={isDestinationValueLoading}
              isLoading={isLoading}
              isSelected={isDestinationTokenSelected}
              label="To"
              onTokenSelect={() => {
                setFieldValue("swapDirection", "destination");
                openModal();
              }}
              token={destinationToken}
              estimatedValue={parseToValue}
            >
              <CustomNumberInput
                sx={{ opacity: isDestinationValueLoading ? 0.5 : 1 }}
                {...(getInputProps("destinationAmount"),
                {
                  value: destinationAmount,
                  onChange: (value) => {
                    setFieldValue("destinationAmount", Number(value));
                    const sum =
                      (destinationToken.price * Number(value)) /
                      sourceToken.price;
                    setIsSourceValueLoading(true);
                    debounce(() => {
                      setFieldValue("sourceAmount", sum);
                      setIsSourceValueLoading(false);
                    });
                  },
                  onClick: () => {
                    setFieldValue("swapDirection", "destination");
                    setFieldValue("isDestinationChosen", true);
                    setFieldValue("isDestinationTokenSelected", true);
                    setFieldValue("isSourceChosen", false);
                  },
                  onBlur: () =>
                    setFieldValue("isDestinationTokenSelected", false),
                })}
              />
            </TokenBox>
          </Paper>
          {(errors?.sourceAmount || errors?.destinationAmount) && (
            <Paper
              radius="xl"
              px={{ base: 18, md: 26 }}
              py={{ base: 12, md: 20 }}
              bg="dark.9"
              w="100%"
            >
              <Flex align="center" gap="sm">
                <IconAlertTriangleFilled color={red[4]} />
                <Text fw={600}>
                  {errors?.sourceAmount || errors?.destinationAmount}
                </Text>
              </Flex>
            </Paper>
          )}
        </Stack>
      </Center>

      <Modal
        centered
        title="Select a token"
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setFieldValue("searchQuery", "");
          }, 200);
        }}
        styles={{
          title: {
            fontWeight: 600,
            fontSize: fontSizes.lg,
          },
          header: {
            margin: 0,
          },
          body: {
            padding: "0px 0 6px 0",
            overflowY: "auto",
          },
          content: {
            overflowY: "hidden",
          },
        }}
      >
        <Box
          pb="md"
          px={16}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: dark[7],
            overflowY: "hidden",
          }}
        >
          <TextInput
            ref={searchInputRef}
            {...getInputProps("searchQuery")}
            radius="xl"
            leftSection={<IconSearch size={18} />}
            placeholder="Search tokens"
          />
        </Box>
        <Box sx={{ overflowY: "auto", maxHeight: "60vh" }}>
          {filteredTokens?.length > 0 ? (
            filteredTokens?.map((item, idx) => {
              const isSameToken = [
                sourceToken?.currency,
                destinationToken?.currency,
              ].includes(item.currency);
              return (
                <Flex
                  onClick={() => {
                    if (swapDirection === "source") {
                      setFieldValue("sourceToken", item);
                      if (isSourceChosen) {
                        const sum =
                          (item.price * sourceAmount) / destinationToken.price;
                        setIsDestinationValueLoading(true);
                        debounce(() => {
                          setFieldValue("destinationAmount", sum);
                          setIsDestinationValueLoading(false);
                        });
                      } else if (isDestinationChosen) {
                        const sum =
                          (sourceToken.price * sourceAmount) / item.price;
                        setIsSourceValueLoading(true);
                        debounce(() => {
                          setFieldValue("sourceAmount", sum);
                          setIsSourceValueLoading(false);
                        });
                      }
                    } else if (swapDirection === "destination") {
                      setFieldValue("destinationToken", item);
                      if (isSourceChosen) {
                        const sum =
                          (sourceToken.price * sourceAmount) / item.price;
                        setIsDestinationValueLoading(true);
                        debounce(() => {
                          setFieldValue("destinationAmount", sum);
                          setIsDestinationValueLoading(false);
                        });
                      } else if (isDestinationChosen) {
                        const sum =
                          (item.price * destinationAmount) / sourceToken.price;
                        setIsSourceValueLoading(true);
                        debounce(() => {
                          setFieldValue("sourceAmount", sum);
                          setIsSourceValueLoading(false);
                        });
                      }
                    }

                    close();
                    setTimeout(() => {
                      setFieldValue("searchQuery", "");
                    }, 200);
                  }}
                  key={idx}
                  px={16}
                  py="sm"
                  align="center"
                  gap="md"
                  sx={(theme) => ({
                    ":hover": {
                      backgroundColor: !isSameToken ? theme.colors.dark[8] : "",
                    },
                    cursor: isSameToken ? "not-allowed" : "pointer",
                    opacity: isSameToken ? 0.5 : 1,
                  })}
                >
                  {item.image ? (
                    <Image src={item.image} width={40} height={40} />
                  ) : (
                    <PlaceholderTokenImage />
                  )}
                  <Text fw={500}>{item.currency}</Text>
                </Flex>
              );
            })
          ) : (
            <Center pt="lg" pb="xl">
              <Text c="dark.1" fz="sm">
                No tokens found for{" "}
                <Text component="span" fw={600} inherit>
                  {searchQuery}
                </Text>
              </Text>
            </Center>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
