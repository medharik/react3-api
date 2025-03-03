import React from "react";

const Form = ({produit,setProduit,modifier,ajouter,libelleRef}) => {

  return (
    <form className="my-3">
      <input ref={libelleRef} value={produit.libelle} type="text"  id="libelle" placeholder="libelle" className="m-2" onChange={(e)=>setProduit({...produit,libelle:e.target.value})}/>
      <input value={produit.prix} type="text" id="prix"  placeholder="prix" className="m-2"  onChange={(e)=>setProduit({...produit,prix:e.target.value})}/>
      <button onClick={(e)=>produit.id? modifier(e):ajouter(e)} className={"btn btn-sm  btn-sm btn-"+(produit.id ? 'warning':'primary')}>{produit.id? 'Modifier':'Ajouter'}</button>
      <br />
    {produit.id},  {produit.libelle} , {produit.prix}
    </form>
  );
};

export default Form;
