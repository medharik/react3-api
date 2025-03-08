import React from "react";
import Ligne from "./Ligne";
{/* <Liste supprimer={supprimer} produits={produits} editer={editer} consulter={consulter}/> */}

const Liste = ({produits,supprimer,editer,consulter}) => {
  return (
    <table className="table table-stripped">
      <thead>
        <tr>
          <th>id</th>
          <th>libelle</th>
          <th>prix</th>
          <th>image</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {
            produits.map(p =><Ligne key={p.id} produit={p} supprimer={supprimer}  editer={editer} consulter={consulter}/>)
        }
      </tbody>
    </table>
  );
};

export default Liste;
