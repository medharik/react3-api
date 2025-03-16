import React from "react";
import Ligne from "./Ligne";
{/* <Liste supprimer={supprimer} produits={produits} editer={editer} consulter={consulter}/> */}

const Liste = ({produits,supprimer,editer,consulter,loading,mc,setMc}) => {
  return (
    <>
    {loading ? "Chargement en cours" : ""}
    <input
      className="form-control border my-3 w-25 mx-auto"
      type="search"
      value={mc}
      onChange={(e) => setMc(e.target.value)}
      placeholder="rechercher"
      />
    {mc}
    <table className="table table-stripped">
      <thead>
        <tr>
          <th>id</th>
          <th>libelle</th>
          <th>prix</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {
          produits.map(p => <Ligne key={p.id} produit={p} supprimer={supprimer}  editer={editer} consulter={consulter}/> )
        }
      </tbody>
    </table>
        </>
  );
};

export default Liste;
