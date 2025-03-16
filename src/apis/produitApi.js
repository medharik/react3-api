import axios from "axios";

// const URL = "https://6679da7d18a459f63951a26a.mockapi.io/produits";
export const URL = "http://127.0.0.1:8000/api/produits";
//WEB SERVICE  PROVIDER  (API)
export const URL_IMAGE='http://127.0.0.1:8000/storage';

export const all = async () => {
  try {
    const resp = await axios.get(URL);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.error("erreur all :", error);
  }
};
export const supprimerApi = async (id) => {
  try {
  axios.delete(URL + "/" + id).then(r=> console.log("delete", r));
   
    
  } catch (error) {
    console.error("erreur delete :", error);
  }
};
export const ajouterApi = async (produit) => {
  try {
    const form=new FormData();
    form.append('libelle',produit.libelle); 
    form.append('prix',produit.prix); 
    if(produit.image)      form.append('image',produit.image); 



    const resp = await axios.post(URL, form,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }

    });
    console.log("add", resp);
    return resp.data;
  } catch (error) {
    console.error("erreur add :", error);
  }
};
export const modifierApi = async (produit) => {
  try {
    console.log('Produit à modifier :', produit);

    const form = new FormData();
    form.append('libelle', produit.libelle);
    form.append('_method', 'PUT'); // Forcer Laravel à interpréter la requête comme PUT

    form.append('prix', produit.prix);
    if (produit.image instanceof File) { 
      form.append('image', produit.image);
    }

    for (let pair of form.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log('FormData envoyé :', form);

    const resp = await axios.post(`${URL}/${produit.id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });

    console.log("Mise à jour réussie :", resp.data);
    return resp.data;
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
  }
};

export const find = async (id) => {
  try {
    const resp = await axios.get(URL + "/" + id);
    console.log("find", resp);
    return resp.data;
  } catch (error) {
    console.error("erreur find :", error);
  }
};



