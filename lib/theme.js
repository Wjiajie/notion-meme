import { createContext, useContext, useEffect, useState } from 'react'
import { useMedia } from 'react-use'
import { useConfig } from '@/lib/config'

const ThemeContext = createContext({ dark: true })

export function ThemeProvider ({ children }) {
  const config = useConfig();
  const appearance = config?.appearance ?? 'auto';
  const [theme, setTheme] = useState(appearance);

  const prefersDark = useMedia('(prefers-color-scheme: dark)', null)
  const dark = theme === 'dark' || (theme === 'auto' && prefersDark)

  const toggleDarkMode = () => {
    const newTheme = theme === 'auto'
      ? 'dark'
      : theme === 'dark'
        ? 'light'
        : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme(appearance)
    }
  }, [appearance])

  useEffect(() => {
    if (typeof dark === 'boolean') {
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.classList.remove('color-scheme-unset')
    }
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme () {
  return useContext(ThemeContext)
}
