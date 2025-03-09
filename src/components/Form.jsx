import React, { useState } from "react";

const Form = ({produit,setProduit,modifier,ajouter,libelleRef}) => {
const [preview, setPreview] = useState(null);
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProduit({ ...produit, image: file }); // ✅ Store the actual File object
    setPreview(URL.createObjectURL(file)); // ✅ Store preview separately
  }
};
  return (
    <div >
      <input ref={libelleRef} value={produit.libelle} type="text"  id="libelle" placeholder="libelle" className="m-2" onChange={(e)=>setProduit({...produit,libelle:e.target.value})}/>
      <input value={produit.prix} type="text" id="prix"  placeholder="prix" className="m-2"  onChange={(e)=>setProduit({...produit,prix:e.target.value})}/>
    <input type="file"  onChange={handleFileChange}  />
      <button onClick={(e)=>produit.id? modifier(e):ajouter(e)} className={"btn btn-sm  btn-sm btn-"+(produit.id ? 'warning':'primary')}>{produit.id? 'Modifier':'Ajouter'}</button>
      <br />
    {produit.id},  {produit.libelle} , {produit.prix}
    {
      preview && <img src={preview} width={100}/>
    }
  
    </div>
  );
};

export default Form;
