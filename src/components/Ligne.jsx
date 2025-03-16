import React from 'react'
import { URL_IMAGE } from '../apis/produitApi';
import { Link, useNavigate } from 'react-router-dom';

const Ligne = ({produit,supprimer,editer}) => {
    const {id,libelle,prix,image}=produit;
    const navigate=useNavigate();
  return (
    <tr>
        <td>{id}</td>
        <td>
          {
            image?   <img src={`${URL_IMAGE}/${image}`} width="150" /> : <span className='badge badge-danger bg-danger'>Pas d'iamge</span>

          }
    

        </td>
        <td>{libelle}</td>
        <td>{prix}</td>
            <td>         <div className="btn-group">
         <button className='btn btn-danger btn-sm' onClick={()=>supprimer(id)}>S</button>
            <button className='btn btn-warning btn-sm' onClick={()=>{editer(produit);navigate('/new')}}>E</button>
            <Link to={'/produit/'+id}  className='btn btn-info btn-sm'>C</Link>
         </div>
        </td>
    </tr>
  )
}

export default Ligne