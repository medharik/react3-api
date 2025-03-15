import React from "react";
import { URL_IMAGE } from "../apis/produitApi";

export const Grid = ({produits,supprimer,editer}) => {
  return (
    <div className="container">
      <div className="row">
        {

produits.map(p =>
   {
     return ( 
    p.image && <div className="col-md-3" key={p.id}>
   <div className="card">
      <img className="card-img-top" src={`${URL_IMAGE}/${p.image}`} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{p.libelle}</h5>
        
        <div className="btn-group">
         <button className='btn btn-danger btn-sm' onClick={()=>supprimer(p.id)}>S</button>
            <button className='btn btn-warning btn-sm' onClick={()=>editer(p)}>E</button>
            <button className='btn btn-info btn-sm'>C</button>
         </div>
      </div>
    </div>
  </div>
     )
    
}
  )
        }
      </div>
    </div>
  );
};
