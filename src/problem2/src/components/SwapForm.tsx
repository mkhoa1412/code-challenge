import { useState, useEffect, useMemo } from "react";
import type { FC } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import type { Token, SwapFormData } from "../types";
import {
  fetchTokenPrices,
  getTokenIconUrl,
  calculateExchangeRate,
} from "../services/tokenService";

const DEFAULT_FROM = "BLUR";
const DEFAULT_TO = "ETH";
const DEFAULT_AMOUNT = null;

interface SwapResult {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
}

const TokenSelect: FC<{
  value: string;
  onChange: (value: string) => void;
  tokens: Token[];
}> = ({ value, onChange, tokens }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Menu
      isOpen={menuOpen}
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
    >
      <MenuButton
        as={Button}
        width="100%"
        height="48px"
        bg="#222531"
        border="2px solid"
        borderColor={menuOpen ? "cyan.400" : "gray.700"}
        _hover={{ borderColor: "cyan.400" }}
        _active={{ borderColor: "cyan.500" }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        color="white"
        fontWeight="bold"
        boxShadow={menuOpen ? "0 0 0 2px #00bcd4" : "md"}
        borderRadius="lg"
        backdropFilter="blur(4px)"
        transition="border-color 0.2s, box-shadow 0.2s"
      >
        <HStack spacing={2} width="100%" justify="space-between">
          <HStack spacing={2} minWidth={20}>
            <Image
              src={getTokenIconUrl(value)}
              alt={value}
              boxSize="24px"
              fallbackSrc="https://via.placeholder.com/24"
            />
            <Text width="auto" textAlign="left" color="white" minWidth="60px">
              {value}
            </Text>
          </HStack>
          <ChevronDownIcon
            boxSize={5}
            color={menuOpen ? "cyan.400" : "gray.400"}
          />
        </HStack>
      </MenuButton>
      <MenuList
        sx={{
          "::-webkit-scrollbar": {
            width: "8px",
            background: "#222531",
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#00bcd4",
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#0097a7",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#00bcd4 #222531",
          width: !value ? "220px" : "auto",
        }}
        maxH="300px"
        overflowY="auto"
        minWidth="100%"
        bg="#222531"
        borderColor="gray.700"
        borderRadius="lg"
        boxShadow="xl"
        mt={2}
        py={2}
      >
        {tokens.map((token) => (
          <MenuItem
            key={token.currency}
            onClick={() => onChange(token.currency)}
            display="flex"
            alignItems="center"
            gap={3}
            width="100%"
            px={4}
            py={2}
            bg="transparent"
            _hover={{ bg: "rgba(0, 188, 212, 0.08)" }}
            color="white"
            borderRadius="md"
            transition="background 0.2s"
          >
            <Image
              src={getTokenIconUrl(token.currency)}
              alt={token.currency}
              boxSize="24px"
              fallbackSrc="https://via.placeholder.com/24"
            />
            <Text width="auto" textAlign="left">
              {token.currency}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export const SwapForm = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [formData, setFormData] = useState<SwapFormData>({
    fromCurrency: DEFAULT_FROM,
    toCurrency: DEFAULT_TO,
    amount: DEFAULT_AMOUNT,
  });
  const [swapResult, setSwapResult] = useState<SwapResult | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const loadTokens = async () => {
      const tokenData = await fetchTokenPrices();
      const uniqueTokens = tokenData.filter(
        (token, index, self) =>
          index === self.findIndex((t) => t.currency === token.currency)
      );
      setTokens(uniqueTokens.filter((token) => token.price > 0));
    };
    loadTokens();
  }, []);

  const fromToken = useMemo(
    () => tokens.find((t) => t.currency === formData.fromCurrency),
    [tokens, formData.fromCurrency]
  );
  const toToken = useMemo(
    () => tokens.find((t) => t.currency === formData.toCurrency),
    [tokens, formData.toCurrency]
  );
  const exchangeRate = useMemo(
    () =>
      fromToken && toToken ? calculateExchangeRate(fromToken, toToken) : 0,
    [fromToken, toToken]
  );

  const handleSwap = () => {
    if (
      !formData.fromCurrency ||
      !formData.toCurrency ||
      formData.amount === null ||
      formData.amount <= 0
    ) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (!fromToken || !toToken) return;
    const convertedAmount = formData.amount * exchangeRate;
    setSwapResult({
      from: formData.fromCurrency,
      to: formData.toCurrency,
      amount: formData.amount,
      convertedAmount,
    });
    onOpen();
  };

  const handleSwitchCurrencies = () => {
    setFormData((prev) => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
    }));
  };

  const handleCloseModal = () => {
    setFormData({
      fromCurrency: DEFAULT_FROM,
      toCurrency: DEFAULT_TO,
      amount: DEFAULT_AMOUNT,
    });
    setSwapResult(null);
    onClose();
  };

  return (
    <Box
      minH="100vh"
      w="100vw"
      position="fixed"
      top={0}
      left={0}
      zIndex={-1}
      bg="#0D1421"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bgGradient: "radial(circle at 60% 40%, #1a223f 60%, #0a0f1a 100%)",
        zIndex: -2,
      }}
    >
      <Container maxW="container.md" py={24} centerContent>
        <Box
          p={10}
          borderRadius="2xl"
          boxShadow="2xl"
          bg="rgba(20, 22, 34, 0.85)"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="gray.700"
          minW="500px"
        >
          <VStack gap={6} align="stretch">
            <Heading
              textAlign="center"
              mb={2}
              color="white"
              fontWeight="extrabold"
              fontSize="2xl"
            >
              Currency Swap
            </Heading>

            {/* Amount + From Token Row */}
            <HStack
              spacing={2}
              align="center"
              width="100%"
              bg="#222531"
              p={5}
              borderRadius={10}
              border="1px solid"
              borderColor="gray.700"
              _hover={{ borderColor: "blue.400" }}
              _focusWithin={{ borderColor: "blue.500" }}
              transition="all 0.2s ease"
            >
              <Box flex={1}>
                <Input
                  type="number"
                  value={formData.amount === null ? "" : formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amount:
                        e.target.value === ""
                          ? null
                          : parseFloat(e.target.value),
                    }))
                  }
                  placeholder="0.00"
                  min="0"
                  step="any"
                  size="md"
                  height="64px"
                  border="none"
                  bg="#222531"
                  color="white"
                  _hover={{ border: "none" }}
                  _focus={{ border: "none", boxShadow: "none" }}
                  fontWeight="bold"
                  fontSize="xl"
                  pr={20}
                />
                <Text fontSize="sm" color="gray.400" ml={1}>
                  Balance: 100 {formData.fromCurrency}
                </Text>
              </Box>
              <Box minW="120px">
                <TokenSelect
                  value={formData.fromCurrency}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, fromCurrency: value }))
                  }
                  tokens={tokens}
                />
              </Box>
            </HStack>

            {/* Switch Button */}
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                onClick={handleSwitchCurrencies}
                width="48px"
                height="48px"
                borderRadius="50%"
                bg="rgba(20, 22, 34, 0.7)"
                border="2px solid"
                borderColor="gray.700"
                color="gray.300"
                cursor="pointer"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s ease"
                position="relative"
                _hover={{
                  borderColor: "blue.400",
                  color: "blue.400",
                  transform: "rotate(180deg)",
                }}
                p={0}
              >
                ↓↑
              </Button>
            </Box>

            {/* To Amount + To Token Row (output) */}
            <HStack
              spacing={2}
              align="flex-end"
              width="100%"
              bg="#222531"
              p={5}
              borderRadius={10}
              border="1px solid"
              borderColor="gray.700"
              _hover={{ borderColor: "blue.400" }}
              _focusWithin={{ borderColor: "blue.500" }}
              transition="all 0.2s ease"
            >
              <Box flex={1}>
                <Box
                  height="64px"
                  display="flex"
                  alignItems="center"
                  bg="#222531"
                  borderRadius="md"
                  border="none"
                  px={4}
                >
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color="white"
                    flex={1}
                    isTruncated
                  >
                    {formData.amount !== null && exchangeRate > 0
                      ? (formData.amount * exchangeRate).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 8,
                          }
                        )
                      : "-"}
                  </Text>
                </Box>
                <Text fontSize="sm" color="gray.400" mt={1} ml={1}>
                  Balance: 0 {formData.toCurrency}
                </Text>
              </Box>
              <Box minW="120px">
                <TokenSelect
                  value={formData.toCurrency}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, toCurrency: value }))
                  }
                  tokens={tokens}
                />
              </Box>
            </HStack>

            {/* Exchange Rate */}
            {exchangeRate > 0 && (
              <Text fontSize="md" color="gray.400" textAlign="center">
                1 {formData.fromCurrency} ≈ {exchangeRate.toFixed(6)}{" "}
                {formData.toCurrency}
              </Text>
            )}

            {/* Details: You will pay, receive, fees */}
            <Box
              bg="rgba(20, 22, 34, 0.85)"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
              px={4}
              py={3}
              mt={2}
            >
              <VStack align="stretch" spacing={1} fontSize="md">
                <HStack justify="space-between">
                  <Text color="gray.400">You will pay</Text>
                  <HStack>
                    <Text color="white" fontWeight="bold">
                      {formData.amount !== null ? formData.amount : "-"}
                    </Text>
                    <Text color="white" fontWeight="bold">
                      {formData.fromCurrency}
                    </Text>
                  </HStack>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.400">You will receive</Text>
                  <HStack>
                    <Text color="white" fontWeight="bold">
                      {formData.amount !== null && exchangeRate > 0
                        ? (formData.amount * exchangeRate).toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 8,
                            }
                          )
                        : "-"}
                    </Text>
                    <Text color="white" fontWeight="bold">
                      {formData.toCurrency}
                    </Text>
                  </HStack>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.400">Fees</Text>
                  <Text color="white" fontWeight="bold">
                    1.2%
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Button
              colorScheme="blue"
              width="full"
              onClick={handleSwap}
              disabled={
                !formData.fromCurrency ||
                !formData.toCurrency ||
                formData.amount === null ||
                formData.amount <= 0
              }
              size="lg"
              height="56px"
              fontWeight="bold"
              fontSize="xl"
              borderRadius="xl"
              boxShadow="lg"
              bgGradient="linear(to-r, blue.400, cyan.400)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, blue.500, cyan.500)" }}
              mt={2}
            >
              Convert
            </Button>
            {showError && (
              <Box mt={-2} mb={2} w="full" textAlign="center">
                <Text
                  color="red.400"
                  fontWeight="semibold"
                  fontSize="md"
                  bg="rgba(255,0,0,0.08)"
                  borderRadius="md"
                  py={2}
                >
                  Please enter a valid amount and select both currencies.
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      </Container>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent
          borderRadius="xl"
          p={6}
          bg="rgba(20, 22, 34, 0.97)"
          color="white"
        >
          <ModalHeader textAlign="center" pb={2} fontWeight="bold">
            Swap Successful!
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="medium" color="gray.300">
                  You have successfully swapped:
                </Text>
                <HStack justify="center" spacing={2} mt={2}>
                  <Image
                    src={getTokenIconUrl(swapResult?.from || "")}
                    alt={swapResult?.from}
                    boxSize="32px"
                    fallbackSrc="https://via.placeholder.com/32"
                  />
                  <Text fontSize="2xl" fontWeight="bold">
                    {swapResult?.amount} {swapResult?.from}
                  </Text>
                </HStack>
                <Text fontSize="lg" color="gray.400" my={2}>
                  to
                </Text>
                <HStack justify="center" spacing={2}>
                  <Image
                    src={getTokenIconUrl(swapResult?.to || "")}
                    alt={swapResult?.to}
                    boxSize="32px"
                    fallbackSrc="https://via.placeholder.com/32"
                  />
                  <Text fontSize="2xl" fontWeight="bold">
                    {swapResult?.convertedAmount.toFixed(6)} {swapResult?.to}
                  </Text>
                </HStack>
              </Box>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleCloseModal}
                mt={4}
                borderRadius="xl"
                fontWeight="bold"
              >
                Close
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
