import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';

import { color, themeSettings } from '../styles';
import { useCustomizedThemeContext } from '../providers/themeProvider';
import { formatDecimalWithCommas } from '../utils';

const specialTokenName: { [key: string]: string } = {
  STEVMOS: 'stEVMOS',
  RATOM: 'rATOM',
  STOSMO: 'stOSMO',
  STATOM: 'stATOM',
  STLUNA: 'stLUNA',
};

// Define schema with zod
const swapSchema = z.object({
  fromToken: z.string().min(1, 'Please select a token to swap from.'),
  toToken: z.string().min(1, 'Please select a token to swap to.'),
  amount: z.string().min(1, 'Amount must be greater than zero.'),
});

type SwapFormValues = z.infer<typeof swapSchema>;

type TokenType = { currency: string; price: number; date?: string; tokenSvg?: string };
type SelectedTokenType = { name: 'fromToken' | 'toToken'; isSearched: boolean };

const CurrencySwapForm = () => {
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<TokenType[]>([]);
  const [fromTokenSvg, setFromTokenSvg] = useState<string>('');
  const [toTokenSvg, setToTokenSvg] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<SelectedTokenType>();

  const { themeName } = useCustomizedThemeContext();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SwapFormValues>({
    defaultValues: { fromToken: 'BUSD', toToken: 'USD', amount: '' },
    resolver: zodResolver(swapSchema),
  });

  const watchedFromToken = watch('fromToken');
  const watchedToToken = watch('toToken');
  const watchedFromAmount = watch('amount').replace(/,/g, '');
  const currentFromToken = tokens.find((token) => token.currency === watchedFromToken);
  const currentToToken = tokens.find((token) => token.currency === watchedToToken);
  const toAmount = ((currentFromToken?.price ?? 0) * Number(watchedFromAmount)) / (currentToToken?.price ?? 1);

  const handleTokenSelect = (token: 'fromToken' | 'toToken') => {
    setSelectedToken({ name: token, isSearched: false });
  };

  const getTokenSvg = async (tokenSymbol: string) => {
    const baseUrl = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

    try {
      // Construct the URL for the SVG file based on the token symbol
      const svgUrl = `${baseUrl}/${tokenSymbol}.svg`;

      // Fetch the SVG file from the GitHub repository
      const response = await fetch(svgUrl);

      if (!response.ok) {
        throw new Error(`SVG not found for token: ${tokenSymbol}`);
      }

      // Return the SVG content as text
      const svgContent = await response.text();
      return svgContent;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleChangeToken = (newToken: TokenType) => {
    if (selectedToken?.name === 'fromToken') {
      if (newToken.currency === watchedToToken) {
        handleSwapTokens();
      } else {
        setValue('fromToken', newToken.currency);
      }
    } else if (selectedToken?.name === 'toToken') {
      if (newToken.currency === watchedFromToken) {
        handleSwapTokens();
      } else {
        setValue('toToken', newToken.currency);
      }
    }

    setSelectedToken(undefined);
  };

  const handleSwapTokens = () => {
    setValue('fromToken', watchedToToken);
    setValue('toToken', watchedFromToken);
    setValue('amount', toAmount.toString());
  };

  const handleSearchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length > 0) {
      setSelectedToken((prev) => (prev ? { ...prev, isSearched: true } : undefined));
    }

    const filteredTokens = tokens.filter((token) => token.currency.toLowerCase().includes(searchValue));
    setFilteredTokens(filteredTokens);
  };

  useEffect(() => {
    (async function fetchCurrentTokes() {
      const fromTokenSVG = await getTokenSvg(specialTokenName?.[watchedFromToken] ?? watchedFromToken);
      const toTokenSVG = await getTokenSvg(specialTokenName?.[watchedToToken] ?? watchedToToken);

      setFromTokenSvg(fromTokenSVG ?? '');
      setToTokenSvg(toTokenSVG ?? '');
    })();
  }, [watchedFromToken, watchedToToken]);

  const onSubmit = (data: SwapFormValues) => {
    alert(`Swapped $${data.amount} ${data.fromToken} to $${toAmount} ${data.toToken}`);
  };

  useEffect(() => {
    (async function fetchListTokens() {
      try {
        const res = await fetch('https://interview.switcheo.com/prices.json');
        const data: TokenType[] = await res.json();
        const hashMap: { [key: string]: TokenType } = {};

        data.forEach((token) => {
          if (typeof hashMap?.[token.currency] === 'undefined') {
            hashMap[token.currency] = token;
          }
        });

        const newData = Object.values(hashMap);

        const result = await Promise.allSettled(
          newData.map(async (token) => {
            const tokenSvg = await getTokenSvg(specialTokenName?.[token.currency] ?? token.currency);
            return { ...token, tokenSvg };
          })
        );

        const newTokens = result
          .map((r) => (r.status === 'fulfilled' ? r.value : undefined))
          .filter(Boolean) as TokenType[];

        setTokens(newTokens);
      } catch (error) {
        setTokens([]);
        console.error(error);
      }
    })();
  }, []);

  return (
    <StyledCurrencySwapForm $themeName={themeName}>
      <AnimatePresence mode='wait'>
        {selectedToken ? (
          <motion.div
            key='selectedToken'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className='currencySwapForm-title'>
              <button onClick={() => setSelectedToken(undefined)}>
                <svg width='24' height='24' viewBox='0 0 53 52' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M17.3336 23.8334H43.7062V28.1667H17.3336L28.9555 39.7887L25.8919 42.8524L9.03955 26L25.8919 9.14771L28.9555 12.2114L17.3336 23.8334Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
              <p>Select Token</p>
              <div className='currencySwapForm-title__box'></div>
            </div>
            <div className='currencySwapForm-search'>
              <svg width='30' height='18' viewBox='0 0 18 18' fill='inherit' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7.30327 14.6058C8.75327 14.6074 10.1705 14.1746 11.3729 13.3637L15.5971 17.5871C16.1463 18.1371 17.0377 18.1371 17.5877 17.5871C18.1377 17.0371 18.1377 16.1457 17.5877 15.5964L13.3643 11.3722C14.5823 9.55661 14.9229 7.28943 14.2909 5.19563C13.6596 3.10183 12.1229 1.40183 10.1033 0.56283C8.08365 -0.276231 5.79385 -0.16607 3.86505 0.86283C1.93537 1.89251 0.569053 3.73243 0.140853 5.87683C-0.286487 8.02143 0.269759 10.2448 1.65725 11.9354C3.04397 13.6261 5.11665 14.6064 7.30325 14.6058H7.30327ZM7.30327 1.68943C8.79233 1.68865 10.2197 2.28005 11.2729 3.33319C12.3252 4.38631 12.9166 5.81359 12.9166 7.30279C12.9166 8.79199 12.3252 10.2192 11.2729 11.2724C10.2198 12.3247 8.79247 12.9162 7.30327 12.9162C5.81407 12.9162 4.38687 12.3247 3.33367 11.2724C2.28133 10.2193 1.68913 8.79199 1.68991 7.30279C1.69148 5.81451 2.28287 4.38719 3.33523 3.33479C4.38759 2.28239 5.81483 1.69103 7.30323 1.68947L7.30327 1.68943Z'
                  fill='currentColor'
                  fillOpacity='0.25'
                />
              </svg>
              <InputField
                $placeholderPosition='left'
                placeholder='Search...'
                type='text'
                onChange={handleSearchToken}
              />
            </div>
            <div className='currencySwapForm-tokens'>
              {(selectedToken.isSearched ? filteredTokens : tokens).map((token) => (
                <TokenItem
                  $selected={
                    selectedToken?.name === 'fromToken'
                      ? watchedFromToken === token.currency
                      : watchedToToken === token.currency
                  }
                  type='button'
                  className='currencySwapForm-tokens--item'
                  onClick={() => handleChangeToken(token)}
                >
                  <div className='currencySwapForm-tokens--item__left'>
                    <div dangerouslySetInnerHTML={{ __html: token.tokenSvg! }} />
                    <p>{token.currency}</p>
                  </div>
                  <div className='currencySwapForm-tokens--item__right'>
                    <p>${formatDecimalWithCommas(String(token.price.toFixed(3)))}</p>
                  </div>
                </TokenItem>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='formContainer'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <Card $error={!!errors.amount?.message}>
                <Content>
                  <Header>
                    <TokenButton type='button' onClick={() => handleTokenSelect('fromToken')}>
                      <TokenIcon>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: fromTokenSvg,
                          }}
                        />
                      </TokenIcon>
                      <TokenLabel>{watchedFromToken}</TokenLabel>
                      <svg width='10' height='6' viewBox='0 0 10 6' fill='inherit' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z'
                          fill='currentColor'
                        />
                      </svg>
                    </TokenButton>
                    <Controller
                      name='amount'
                      control={control}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <InputField
                          {...rest}
                          $placeholderPosition='right'
                          placeholder='0.00'
                          type='text'
                          autoComplete='off'
                          value={value}
                          onChange={(e) => {
                            const formattedValue = formatDecimalWithCommas(e.target.value);
                            onChange(formattedValue);
                          }}
                        />
                      )}
                    />
                  </Header>
                  <BalanceInfo>
                    <span>${currentFromToken?.price.toFixed(3)}</span>
                  </BalanceInfo>
                </Content>
              </Card>

              <SwapButtonWrapper>
                <SwapButton type='button' onClick={handleSwapTokens}>
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9.04393 5.74021L12 3.3701L9.04393 1V2.68839H1.0228V4.05189H9.04393V5.74021ZM2.95607 5.34607L0 7.71617L2.95607 10.0863V8.39789H10.9772V7.03439H2.95607V5.34607Z'
                      fill='rgba(255, 255, 255, 0.5)'
                    />
                  </svg>
                </SwapButton>
              </SwapButtonWrapper>

              <Card>
                <Content>
                  <Header>
                    <TokenButton type='button' onClick={() => handleTokenSelect('toToken')}>
                      <TokenIcon>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: toTokenSvg,
                          }}
                        />
                      </TokenIcon>
                      <TokenLabel>{watchedToToken}</TokenLabel>

                      <svg width='10' height='6' viewBox='0 0 10 6' fill='inherit' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z'
                          fill='currentColor'
                        />
                      </svg>
                    </TokenButton>
                    <InputField
                      $placeholderPosition='right'
                      disabled
                      value={toAmount === 0 ? '' : formatDecimalWithCommas(String(toAmount))}
                      type='text'
                    />
                  </Header>
                  <BalanceInfo>
                    <span>${currentToToken?.price.toFixed(3)}</span>
                  </BalanceInfo>
                </Content>
              </Card>
              <button className='currencySwapForm-connectButton' type='submit'>
                Swap
              </button>
            </FormContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledCurrencySwapForm>
  );
};

export default CurrencySwapForm;

const StyledCurrencySwapForm = styled.div<{ $themeName: 'light' | 'dark' }>`
  min-width: 26.25rem;
  padding: 1.75rem;
  background-color: ${color.purple(22)};
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px 0 ${({ $themeName }) => themeSettings[$themeName].swapFormBoxShadow};

  .currencySwapForm-title {
    display: flex;
    justify-content: space-between;

    &__box {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .currencySwapForm-search {
    padding: 0 1.25rem;
    margin-top: 1rem;
    border-radius: 0.75rem;
    background: ${color.gray(23)};
    height: 3.5rem;
    display: flex;
    align-items: center;
  }

  .currencySwapForm-tokens {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    max-height: 15rem;
  }

  .currencySwapForm-connectButton {
    color: ${color.gray(100)};
    background: ${({ $themeName }) => themeSettings[$themeName].mainBackground};
    width: 100%;
    margin-top: 2.0625rem;
    border-radius: 0.75rem;
    padding: 1.25rem;
    font-weight: 600;
    text-align: center;
    transition: background 0.3s ease;
  }
`;

const TokenItem = styled.button<{ $selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ $selected }) => ($selected ? color.purple(40) : color.gray(23))};
  height: 3.5rem;
  border-radius: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${color.purple(38)};
  }

  .currencySwapForm-tokens--item__left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;

    div {
      height: 1.5rem;

      svg {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }

  .currencySwapForm-tokens--item__right {
    font-size: 0.9rem;
    color: ${color.gray(46)};
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div<{ $error?: boolean }>`
  border: 1px solid ${({ $error }) => ($error ? color.red(40) : 'transparent')};
  background: ${color.gray(12)};
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  width: 100%;
`;

const Content = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  color: ${color.gray(100)};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TokenButton = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  background: ${color.gray(23)};
  color: ${color.gray(100)};
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff33;
  }
`;

const TokenIcon = styled.div`
  height: 1.5rem;
  width: 1.5rem;

  div svg {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const TokenLabel = styled.div`
  margin-left: 1rem;
  margin-right: 0.5rem;
  font-weight: 600;
`;

const InputField = styled.input<{ $placeholderPosition: 'left' | 'right' }>`
  background: transparent;
  color: ${color.gray(100)};
  text-align: ${({ $placeholderPosition }) => $placeholderPosition};
  font-weight: 600;
  font-size: 1.125rem;
  width: 100%;
  outline: none;
  border: none;
  font-family: 'figtree', sans-serif;
`;

const BalanceInfo = styled.div`
  display: flex;
  margin-top: 0.75rem;
  align-items: center;
  color: #ffffff4d;
  font-size: 0.75rem;
  cursor: pointer;
  span {
    margin-left: 0.25rem;
  }
`;

const SwapButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
`;

const SwapButton = styled.button`
  border: 1px solid #00000080;
  background: #0000001a;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${color.gray(100)};
  }

  svg {
    transform: rotate(-45deg);
  }
`;
