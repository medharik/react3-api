import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  ajouterApi,
  all,
  modifierApi,
  supprimerApi
} from "./apis/produitApi";
import Form from "./components/Form";
import Liste from "./components/Liste";

function App() {
  const [produits, setProduits] = useState([]);
  const libelleRef = useRef(null);
  const init = { id: "", libelle: "", prix: "" };
  const [produit, setProduit] = useState(init);
  // const [notice, setNotice] = useState({ text: "", color: "" });
  const [loading, setLoading] = useState(false);
  const [mc, setMc] = useState("");
  const [produitsAffiche, setProduitsAffiche] = useState([]);
  const reducerNotice=(state,action)=>{
switch (action.type) {
  case 'SUPPRIMER':
    return {text:'suppression ok',color:'danger'}
  case 'MODIFIER':
    return {text:'modification ok',color:'warning'}
  case 'AJOUTER':
    return {text:action.payload+' ajoute avec succes',color:'info'}

  default:
    return state;
}
  }
  const [notice, dispatchNotice] = useReducer(reducerNotice, {text:'liste des produits',color:'primary'});
  const ajouter = (e) => {
    e.preventDefault();
    ajouterApi(produit).then((data) => {
      setProduits([...produits, data]);
      setProduit(init);
      dispatchNotice({type:"AJOUTER",payload:produit.libelle})
    });
    libelleRef.current.focus();
    console.log("current libelle ", libelleRef.current.value);
  };
  const supprimer = (id) => {
    if (confirm("supprimer?")) {
      setProduits(produits.filter((p) => p.id !== id));
      // setNotice({ text: "produit supprime avec succes", color: "danger" });
      dispatchNotice({type:"SUPPRIMER"});
      (async () => await supprimerApi(id))();
    }
  };
  const editer = (produit) => {
    setProduit(produit);
  };
  const modifier = (e) => {
    e.preventDefault();
    setProduits(produits.map((p) => (p.id === produit.id ? produit : p)));
    modifierApi(produit);
    setProduit(init);
   dispatchNotice({type:"MODIFIER"})
  };
  const consulter = () => {};
  useEffect(() => {
    setLoading(true);
   
    const fetchData = async () => {
      setLoading(true);
      const data = await all();
      setLoading(false);
      setProduits(data);
      setProduitsAffiche(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setProduitsAffiche(
      produits.filter(
        (p) =>
          p.libelle
            .toString()
            .toLowerCase()
            .includes(mc.toString().toLowerCase()) ||
          p.prix.toString().toLowerCase().includes(mc.toString().toLowerCase())
      )
    );
  }, [mc, produits]);

  return (
    <>
      <div className="container text-center bg-light">
        {produit.id && (
          <button onClick={() => setProduit(init)}>Nouveau</button>
        )}
        <h2 className={`alert alert-${notice.color}`}> {notice.text}</h2>

        <Form
          libelleRef={libelleRef}
          produit={produit}
          setProduit={setProduit}
          ajouter={ajouter}
          modifier={modifier}
        />
        {loading ? "Chargement en cours" : ""}
        <input
          className="form-control border my-3 w-25 mx-auto"
          type="search"
          value={mc}
          onChange={(e) => setMc(e.target.value)}
          placeholder="rechercher"
        />
        {mc}
        <Liste
          supprimer={supprimer}
          produits={produitsAffiche}
          editer={editer}
          consulter={consulter}
        />
      </div>
    </>
  );
}
export default App;
