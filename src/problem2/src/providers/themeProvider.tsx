import { createContext, useContext, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

import IconSun from '../assets/icons/icon-sun.svg';
import IconMon from '../assets/icons/icon-moon.svg';
import { GlobalStyles, themeSettings } from '../styles';
import theme from '../styles/theme';

type CustomizedThemeContextType = { themeName: 'light' | 'dark' };
type CustomizedThemeProviderProps = { children: React.ReactNode };

const CustomizedThemeContext = createContext<CustomizedThemeContextType>({} as CustomizedThemeContextType);

export const useCustomizedThemeContext = () => useContext(CustomizedThemeContext);

const CustomizedThemeProvider: React.FC<CustomizedThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeName = isDarkMode ? 'dark' : 'light';

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <CustomizedThemeContext.Provider value={{ themeName }}>
      <ThemeProvider theme={isDarkMode ? themeSettings.dark : themeSettings.light}>
        <GlobalStyles $themeName={themeName} />
        <StyledThemeToggle type='button' $newTheme={themeName} onClick={toggleTheme} className='themeToggle'>
          <div className='themeToggle-dark'>Dark</div>
          <div className='themeToggle-icon'>
            <div className='themeToggle-icon-inner'>
              <img
                src={themeName === 'light' ? IconSun : IconMon}
                width='15'
                height='15'
                alt={themeName === 'light' ? 'Light' : 'Dark'}
              />
            </div>
          </div>
          <div className='themeToggle-light'>Light</div>
        </StyledThemeToggle>
        {children}
      </ThemeProvider>
    </CustomizedThemeContext.Provider>
  );
};

export default CustomizedThemeProvider;

const customizedThemeSettings = {
  light: {
    bgCol: theme.colors.backgroundSecondary,
    textColor: theme.colors.textContrasting,
    iconBgColor: theme.colors.backgroundPrimary,
  },
  dark: {
    bgCol: theme.colors.darkBetSlipItemIconBackground,
    textColor: theme.colors.textPrimary,
    iconBgColor: theme.colors.darkBetSlipItemIconBackgroundHover,
  },
};

const StyledThemeToggle = styled.button<{ $newTheme: 'light' | 'dark' }>`
  --themeToggle-height: 2rem;

  position: relative;
  width: calc(var(--themeToggle-height) * 2.2);
  height: var(--themeToggle-height);
  color: ${(props) => customizedThemeSettings[props.$newTheme].textColor};
  font-size: 0.7917rem;
  font-weight: 500;
  line-height: var(--themeToggle-height);
  border-radius: calc(var(--themeToggle-height) / 8);
  background-color: ${(props) => customizedThemeSettings[props.$newTheme].bgCol} !important;
  box-shadow: 0 8px 24px 0 ${({ $newTheme }) => themeSettings[$newTheme].swapFormBoxShadow};
  margin: 1rem;

  .themeToggle-dark {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: calc(var(--themeToggle-height) / 4);
    opacity: ${(props) => (props.$newTheme === 'light' ? 0 : 1)};
  }

  .themeToggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(var(--themeToggle-height) * 0.0625);
    right: calc(var(--themeToggle-height) * 0.0625);
    width: calc(var(--themeToggle-height) * 0.875);
    height: calc(var(--themeToggle-height) * 0.875);
    border-radius: calc(var(--themeToggle-height) / 16);
    background-color: ${(props) => customizedThemeSettings[props.$newTheme].iconBgColor} !important;
    transition: all 0.2s ease-out;

    ${(props) =>
      props.$newTheme === 'light' &&
      css`
        right: calc(var(--themeToggle-height) * 1.2625);
      `}

    .themeToggle-icon-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.8rem;
      height: 0.8rem;
    }
  }

  .themeToggle-light {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: calc(var(--themeToggle-height) / 4);
    opacity: ${(props) => (props.$newTheme === 'light' ? 1 : 0)};
  }
`;
