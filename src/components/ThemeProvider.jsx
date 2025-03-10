import { createContext, useContext, useEffect, useState } from "react";


export const ThemeContexte=createContext();


export const ThemeProvider=({children})=>{
 const [theme, setTheme] = useState('primary');
 useEffect(() => {
   const linktheme=document.getElementById('link-theme');
 if (theme==='dark') {
    linktheme.href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/cyborg/bootstrap.min.css";
} else {
     linktheme.href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/litera/bootstrap.min.css";
 }
   
 }, [theme])
 
    return (
        <ThemeContexte.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContexte.Provider>
    );

}
export const useTheme=()=>useContext(ThemeContexte);