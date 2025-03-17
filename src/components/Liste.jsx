import React, { useContext } from "react";
import Ligne from "./Ligne";
import {  ThemeContexte, useTheme } from "./ThemeProvider";

const Liste = ({ produits, supprimer, editer, consulter }) => {
const {theme,setTheme}=useTheme();
  
  return (
    <>
    
    <table className={`table table-stripped`}>
      <thead>
        <tr>
          <th>id</th>
          <th>libelle</th>
          <th>prix</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
<<<<<<< HEAD
        {
            produits.map(p => <Ligne key={p.id} produit={p} supprimer={supprimer}  editer={editer} consulter={consulter}/> )
        }
=======
        {produits.map((p) => (
          <Ligne key={p.id} produit={p} supprimer={supprimer} editer={editer} consulter={consulter} />
        ))}
>>>>>>> 7790a3c2939e480fd7343ba522404c589673aeda
      </tbody>
    </table>
    </>
  );
};

export default Liste;
