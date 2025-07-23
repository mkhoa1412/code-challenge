import { Button } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

const ToggleDarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const isDarkMode = localStorage.getItem('isDarkMode')
    return isDarkMode === 'true'
  })

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newIsDarkMode = !prev
      localStorage.setItem('isDarkMode', newIsDarkMode.toString())
      document.documentElement.setAttribute('data-theme', newIsDarkMode ? 'dark' : 'light') // TODO: remove this
      return newIsDarkMode
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <Button size="1" variant="outline" onClick={toggleDarkMode}>
      Toggle Dark Mode
    </Button>
  )
}

export default ToggleDarkModeButton
