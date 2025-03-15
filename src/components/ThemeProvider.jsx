import { createContext, useContext, useEffect, useState } from "react";
 const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme=()=>{
    setTheme(theme === "light" ? "dark" : "light");
  }
  useEffect(() => {
    const linktheme=document.getElementById('theme-link');
  if (theme==='dark') {
     linktheme.href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/cyborg/bootstrap.min.css";
 } else {
      linktheme.href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/litera/bootstrap.min.css";
  }
  console.log('current theme',linktheme)
    
  }, [theme])


  return (
    <ThemeContext.Provider value={{ theme, setTheme,toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
};

export const useTheme=()=>useContext(ThemeContext);