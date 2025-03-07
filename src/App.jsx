import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { ajouterApi, all, modifierApi, supprimerApi, URL_BASE_IMAGE } from "./apis/produitApi";
import Form from "./components/Form";
import Liste from "./components/Liste";

function App() {
  const [produits, setProduits] = useState([]);
  const [preview, setpreview] = useState(null);

  const libelleRef = useRef(null);
  const init = { id: "", libelle: "", prix: "", image: "" };
  const [produit, setProduit] = useState(init);
  // const [notice, setNotice] = useState({ text: "", color: "" });
  const [loading, setLoading] = useState(false);
  const [mc, setMc] = useState("");
  const [produitsAffiche, setProduitsAffiche] = useState([]);
const imageRef = useRef('');
  const reducer_notice = (state, action) => {
    switch (action.type) {
      case "AJOUT":
        return {
          texte: action.payload + " a ete ajoute avec succes",
          color: "success",
        };
      case "NEW":
        return { texte: "Nouveau produit", color: "success" };
      case "MAJ":
        return {
          texte: action.payload + " a ete modifie avec succes",
          color: "warning",
        };
      case "SUPPRESSION":
        return {
          texte:
            "le produit ayant id =" +
            action.payload +
            " a ete SUPPRIME avec succes",
          color: "danger",
        };
      case "EDIT":
        return {
          ...state,
          texte:
            "EDITION DU PRODUIT , id= " +
            action.payload.id +
            " libelle = " +
            action.payload.libelle,
        };
      default:
        return state;
    }
  };
  const [notice, dispatch_notice] = useReducer(reducer_notice, {
    texte: "liste des produits",
    color: "primary",
  });

  // notice (old) + dispatch action (ADD,DEDLETE) => la fonctio reduce se lance et nous retourne le new notice

  const ajouter = (e) => {
    e.preventDefault();
    const selectedImage = imageRef.current?.files[0] || null;
    const formProduit={...produit,image:selectedImage}
    ajouterApi(formProduit).then((data) => {
      setProduits([...produits, data]);
      setProduit(init);
    });
    libelleRef.current.focus();
    console.log("current libelle ", libelleRef.current.value);
    dispatch_notice({ type: "AJOUT", payload: produit.libelle });
  };
  const supprimer = (id) => {
    if (confirm("supprimer?")) {
      setProduits(produits.filter((p) => p.id !== id));

      (async () => await supprimerApi(id))();
    }
    dispatch_notice({ type: "SUPPRESSION", payload: id });
  };
  const editer = (produit) => {
    setProduit(produit);
    if(produit.image) {
      console.log('preview IMAGE',`${URL_BASE_IMAGE}/`+produit.image)
      setpreview(`${URL_BASE_IMAGE}/${produit.image}`)
  }
    dispatch_notice({
      type: "EDIT",
      payload: { id: produit.id, libelle: produit.libelle },
    });
  };
  const modifier = (e) => {
    e.preventDefault();
    setProduits(produits.map((p) => (p.id === produit.id ? produit : p)));
    modifierApi(produit);
    setProduit(init);
    //  dispatchNotice({type:"MODIFIER"})
    dispatch_notice({ type: "MAJ", payload: produit.libelle });
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
    // dispatch_notice()
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
        {/* <div className={`alert alert-${notice.color}`}>{notice.texte}</div> */}
        {produit.id && (
          <button
            onClick={() => {
              setProduit(init);
              dispatch_notice({ type: "NEW" });
            }}
          >
            Nouveau
          </button>
        )}
        <div className={"alert alert-" + notice.color}>{notice.texte}</div>
        <Form
          libelleRef={libelleRef}
          produit={produit}
          setProduit={setProduit}
          ajouter={ajouter}
          modifier={modifier}
          imageRef={imageRef}
          preview={preview}
          setpreview={setpreview}
        />
        {

        }
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
