import axios from "axios";

export const URL = "https://6679da7d18a459f63951a26a.mockapi.io/produits";
// export const URL = "http://127.0.0.1:8000/api/produits";
//WEB SERVICE  PROVIDER  (API)
export const URL_IMAGE = 'http://127.0.0.1:8000/storage';

export const all = async () => {
//   console.log('a');
//   axios.get(URL)
//     .then(reponse => reponse.data)
//     .then(data => console.log(data))
//     .catch(err => console.log(console.log(err)));
// console.log('b');
console.log('A');
try {
  
  const reponse= await  axios.get(URL);
  const data=reponse.data;
  return data;
} catch (error) {
  console.log('erreur de recuperation des produits',error)
}


// console.log(reponse);//Promise
console.log('B');
};
export const supprimerApi = async (id) => {
  try {
    axios.delete(URL + "/" + id);
  } catch (error) {
    console.error("erreur delete :", error);
  }
};
export const ajouterApi = async (produit) => {
  try {
    const form = new FormData();
    form.append('libelle', produit.libelle);
    form.append('prix', produit.prix);
    if (produit.image) form.append('image', produit.image);



    const resp = await axios.post(URL, form, {
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



// // Appel de la fonction All

// console.log('X');
// // all().then(data =>console.log(data)).catch(er=>console.log(er));
// (async ()=>{
//   try {

//     const data=await all();
//     console.log(data);
    
//   } catch (error) {
//     console.error(error);
//   }
//  })();
// console.log('Y');

// console.log(data)
// console.log('X')
// const r= await all();
// console.log('r',r);
// console.log('Y');


