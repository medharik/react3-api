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
        {produits.map((p) => (
          <Ligne key={p.id} produit={p} supprimer={supprimer} editer={editer} consulter={consulter} />
        ))}
      </tbody>
    </table>
    </>
  );
};

export default Liste;
