import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import Liste from "./components/Liste";
import { useEffect, useReducer, useRef } from "react";
import { all, supprimerApi } from "./apis/produitApi";

function App2() {
  const libelleRef = useRef(null);
  const prixRef = useRef(null);
  const idRef = useRef(1);

  const PRODUIT_INIT = { id: "", libelle: "", prix: 0 };
  const NOTICE_INIT = { texte: "liste des produits", color: "info" };
  const state_produit_init = {
    produits: [],
    produitForm: PRODUIT_INIT,
    isLoading: false,
    notice: NOTICE_INIT,
  };
  const reducer_produit = (state, action) => {
    switch (action.type) {
      case "INIT_LIST":
        return {
          ...state,
          produits: action.payload,
          notice: { texte: "liste des produits", color: "info" },
        };
      case "ADD_PRODUCT":
        return {
          ...state,
          produits: [...state.produits,action.payload],
          notice: { texte: "product succesfuly added", color: "successs" },
        };
      case "DELETE_PRODUCT":
        return {
          ...state,
          produits: state.produits.filter(p=>p.id!==action.payload),
          notice: { texte: "produit supprime avec succes", color: "danger" },
        };

      default:
        return state;
    }
  };
  const [state_produit, dispatch_produit] = useReducer(
    reducer_produit,
    state_produit_init
  );
  const supprimer = (id) => {
    dispatch_produit({type:'DELETE_PRODUCT',payload:id});
    supprimerApi(id);
  };
  const ajouter = (e) => {
    e.preventDefault();
    dispatch_produit({type:'ADD_PRODUCT',payload:{id:Math.random(),libelle: libelleRef.current.value,prix:prixRef.current.value}
  });
}
  const modifier = (e) => {};
  const editer = () => {};
  const consulter = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await all();
        dispatch_produit({ type: "INIT_LIST", payload: data });
      } catch (error) {
        console.log("erreur all", error);
      }
    };
    fetchData();
  }, []);
  const {notice,produits,produitForm}=state_produit;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={"w-50 mx-auto text-center fs-5 alert alert-"+notice.color}> {notice.texte}</div>
          <Form libelleRef={libelleRef} prixRef={prixRef} idRef={idRef}  ajouter={ajouter} modifier={modifier}/>
        </div>
        <div className="row">
          {/* produits,supprimer,editer,consulter */}
          <Liste
            produits={produits}
            supprimer={supprimer}
            editer={editer}
            consulter={consulter}
          />
        </div>
      </div>
    </>
  );
}
export default App2;
