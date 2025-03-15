import axios from "axios";

// const URL = "https://6679da7d18a459f63951a26a.mockapi.io/produits";
// <<<<<<< HEAD
export const URL = "http://127.0.0.1:8000/api/produits";
export const URL_BASE_IMAGE = "http://127.0.0.1:8000/storage";
//WEB SERVICE  PROVIDER  (API)
// =======
// const URL = "http://127.0.0.1:8000/api/produits";

// //WEB SERVICE  PROVIDER  (API)
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/produits';


// >>>>>>> reducer-test

export const all = async () => {
  try {
    const resp = await axios.get(URL);
    // console.log(resp.data);
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
    const formData=new FormData();
    formData.append("libelle",produit.libelle);
    formData.append("prix",produit.prix);
   
      formData.append("image", produit.image);
      
      console.log('formdata',[...formData.entries()]);
    const resp = await axios.post(URL, formData,{
      headers:{
        "Content-Type": "multipart/form-data",
      }
    });
    console.log("add", resp);
    return resp.data;
  } catch (error) {
    console.error("erreur add :", error.response.data.message);
  }
};
export const modifierApi = async (produit) => {
  try {
    const resp = await axios.put(URL + "/" + produit.id, produit);
    console.log("add", resp);
    return resp.data;
  } catch (error) {
    console.error("erreur modifier :", error);
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



