import "bootstrap/dist/css/bootstrap.min.css";
import Liste from "./components/Liste";
import { useEffect, useRef, useState } from "react";
import Form from "./components/Form";
import { ajouterApi, all,  find,  modifierApi,  supprimerApi } from "./apis/produitApi";

function App() {
  const [produits, setProduits] = useState([]);
  const libelleRef = useRef(null);
  const init={id:'',libelle:'',prix:''};
  const [produit, setProduit] = useState(init);
  const [isEdit, setIsEdit] = useState(false);
  const [notice, setNotice] = useState({text:'',color:''});
  const [loading, setLoading] = useState(false);
  
  const [mc, setMc] = useState('');
  const [produitsAffiche, setProduitsAffiche] = useState([]);
  const ajouter= (e)=>{
    e.preventDefault();
    ajouterApi(produit).then((data)=>{
      
      setProduits([...produits,data]);
  setProduit(init)});
  libelleRef.current.focus();
  console.log('current libelle ',libelleRef.current.value)

  }
  const supprimer= (id)=>{
    if(confirm('supprimer?')) {

      setProduits(produits.filter(p=>p.id!==id));
      setNotice({text:'produit supprime avec succes',color:'danger'});
    (async ()=> await  supprimerApi(id))();
    }

  }
  const editer= (produit)=>{
setProduit(produit);
  }
  const modifier= (e)=>{
    e.preventDefault();
    setProduits(produits.map(p=>p.id===produit.id? produit:p));
modifierApi(produit);
setProduit(init);
setNotice({text:produit.libelle+' modifie avec succes',color:'warning'})
  }
  const consulter= ()=>{

  }
  useEffect(() => {
    setLoading(true);
  //  all().then(data=>{
  //   setLoading(false);
  //   setProduits(data);
  //  });
 const fetchData=async ()=>{

  setLoading(true);
  const data=await all();
  setLoading(false);  
  setProduits(data);
  setProduitsAffiche(data);

 }
 fetchData();
 
},[])
  useEffect(() => {
    
   setProduitsAffiche( produits.filter(p=> p.libelle.toString().toLowerCase().includes(mc.toString().toLowerCase()) || p.prix.toString().toLowerCase().includes(mc.toString().toLowerCase())));
   
  }, [mc,produits])
  
  return (
    <>
      <div className="container text-center bg-light">
       {
       produit.id && <button onClick={()=>setProduit(init)}>Nouveau</button> 
       }
        <h2 className={ `alert alert-${notice.color}` }> {notice.text}</h2>

        <Form libelleRef={libelleRef} produit={produit} setProduit={setProduit} ajouter={ajouter} modifier={modifier}/>
        {
          loading? 'Chargement en cours':''
        }
        <input  className="form-control border my-3 w-25 mx-auto" type="search" value={mc} onChange={(e)=>setMc(e.target.value)} placeholder="rechercher"/>
       {mc}
        <Liste supprimer={supprimer} produits={produitsAffiche} editer={editer} consulter={consulter}/>
      </div>
    </>
  );

}
export default App;
