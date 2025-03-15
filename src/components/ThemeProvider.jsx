import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme=()=>{
    setTheme(theme === "light" ? "dark" : "light");
  }
// useEffect(() => {
//  const link=document.getElementById('theme-link');
 
//  if (link) {
//   // const timestamp = Date.now();
//   link.href = theme === "light"
//     ? `https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/litera/bootstrap.rtl.min.css`
//     : `https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/darkly/bootstrap.min.css`;

//   console.log("CSS chargé avec timestamp :", link.href);
// }
// }, [theme])


  return (
    <ThemeContext.Provider value={{ theme, setTheme,toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme=()=>useContext(ThemeContext);