import React, { useState } from "react";

const Form = ({produit,setProduit,modifier,ajouter,libelleRef}) => {


  const [preview, setPreview] = useState(null);

const handleImageChange=(e)=>{
  setProduit({...produit,image:e.target.files[0]});
  setPreview(URL.createObjectURL(e.target.files[0]));
}
  return (
    <form className="my-3">
      <input ref={libelleRef} value={produit.libelle} type="text"  id="libelle" placeholder="libelle" className="m-2" onChange={(e)=>setProduit({...produit,libelle:e.target.value})}/>
      <input value={produit.prix} type="text" id="prix"  placeholder="prix" className="m-2"  onChange={(e)=>setProduit({...produit,prix:e.target.value})}/>
    <input type="file"  id="image"  onChange={handleImageChange} />
      <button onClick={(e)=>produit.id? modifier(e):ajouter(e)} className={"btn btn-sm  btn-sm btn-"+(produit.id ? 'warning':'primary')}>{produit.id? 'Modifier':'Ajouter'}</button>
      <br />
    {produit.id},  {produit.libelle} , {produit.prix}
    {
      preview && <img src={preview} width={200}  />

    }
    
    </form>
  );
};

export default Form;
