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
 const STATE_INIT={
  produits:[],
  produit:init,
  load:false,
  produitsAffiche:[],
  notice: {text:'liste des produits',color:'primary'}
 };
 const reducer = (state,action)=>{
switch (action.type) {
  case "ajouter":
return {...state, produits:[...produits,action.payload.produit],notice: {text:'produits ajoutes avec succes',color:'info'}};
  
  case "DELETE":
console.log('delete payload',action.payload.id);
    return {...state,produits:state.produits.filter(p=> p.id!==action.payload.id), produitsAffiche: state.produits.filter(p=> p.id!==action.payload.id),notice:{text:'produit supprimeeee avec succes',color:'danger'}};
    
  case "modifier":
    return {...state,produitsAffiche:state.produits.map(p=>p.id===action.payload.produit.id? action.payload.produit:p),
      notice:{text:'produit updated avec succes',color:'warning'},
      produit:action.payload.init
    }
    case "edit":
      return {...state,produit:action.payload.produit}
  case "init":
    
  return {...state,produits: action.payload.produits,produitsAffiche:action.payload.produits,notice:{text:'liste des produits',color:'info'}};
  default :
  return state;


}

 }
 const [state_produits, dispatch_produits] = useReducer(reducer,STATE_INIT);
 
  const ajouter = (e) => {
    e.preventDefault();
    ajouterApi(produit).then((data) => {
    //  setProduits([...produits, data]);
    //  setProduit(init);
    //  dispatchNotice({type:"AJOUTER",payload:produit.libelle})
    dispatch_produits({type: "ajouter", payload: { produit: data } });
    });
    libelleRef.current.focus();
    console.log("current libelle ", libelleRef.current.value);
  };
  const supprimer = (id) => {
    if (confirm("supprimer?")) {
  //    setProduits(produits.filter((p) => p.id !== id));
      // setNotice({ text: "produit supprime avec succes", color: "danger" });

      dispatch_produits({ type: "DELETE", payload: { id } });
      (async () => await supprimerApi(id))();
     // dispatchNotice({type:"SUPPRIMER"});
     
    }
  };

  const editer = (produit) => {

dispatch_produits({ type: "edit", payload: { produit } });
  };
  const modifier = (e) => {
    e.preventDefault();
   // setProduits(produits.map((p) => (p.id === produit.id ? produit : p)));
    modifierApi(produit);
    dispatch_produits({type:'modifier',payload:{produit,init:init}});
    //setProduit(init);
   //dispatchNotice({type:"MODIFIER"})
  };
  const consulter = () => {};
  useEffect(() => {
    setLoading(true);
   
    const fetchData = async () => {
      setLoading(true);
      const data = await all();
      setLoading(false);
    //  setProduits(data);
      //setProduitsAffiche(data);
      dispatch_produits({ type: "init", payload: {produits:data} });
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
        <h2 className={`alert alert-${state_produits.notice.color}`}> {state_produits.notice.text}</h2>

        <Form
          libelleRef={libelleRef}
          produit={state_produits.produit}
          setProduit={(p) => dispatch_produits({ type: "edit", payload: { produit: p } })}
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
          produits={state_produits.produitsAffiche}
          editer={editer}
          consulter={consulter}
        />
      </div>
    </>
  );
}
export default App;
