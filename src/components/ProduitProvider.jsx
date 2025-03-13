import React, { createContext, useContext, useState } from "react";

export const ProduitContext = createContext({});

export const ProduitProvider = ({ children }) => {
  const [preview, setPreview] = useState("");
  const init = { id: "", libelle: "", prix: "", image: "" };
  const [produit, setProduit] = useState(init);
  const handleChangeImage = (e) => {
    setProduit({ ...produit, image: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <ProduitContext.Provider
      value={{
        preview,
        setPreview,
        handleChangeImage,
        init,
        produit,
        setProduit,
      }}
    >
      {children}
    </ProduitContext.Provider>
  );
};

export const useProduits = () => useContext(ProduitContext);
