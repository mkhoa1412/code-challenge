import { Theme } from '@radix-ui/themes'
import { createContext, useCallback, useState } from 'react'

const THEME_KEY = window.location?.host + '-isDarkMode'

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const curIsDarkMode = localStorage.getItem(THEME_KEY)
    document.documentElement.setAttribute('data-theme', curIsDarkMode ? 'dark' : 'light')
    return curIsDarkMode === 'true'
  })

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newIsDarkMode = !prev
      localStorage.setItem(THEME_KEY, newIsDarkMode.toString())
      document.documentElement.setAttribute('data-theme', newIsDarkMode ? 'dark' : 'light')
      return newIsDarkMode
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <Theme appearance={isDarkMode ? 'dark' : 'light'}>{children}</Theme>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
