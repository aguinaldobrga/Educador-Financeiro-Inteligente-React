import { useEffect, useState, type PropsWithChildren } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

export function ThemeProvider({ children }: PropsWithChildren){
  const [theme, setTheme] = useState<Theme>(() => {
    const localTheme = localStorage.getItem("theme") as Theme | null

    if (localTheme) {
      return localTheme
    }

    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches ? "dark" : "light"
    
    return systemTheme
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}