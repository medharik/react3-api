import React from 'react'

const Ligne = ({produit,supprimer,editer,consulter}) => {
    const {id,libelle,prix}=produit;
  return (
    <tr>
        <td>{id}</td>
        <td>{libelle}</td>
        <td>{prix}</td>
            <td>         <div className="btn-group">
         <button className='btn btn-danger btn-sm' onClick={()=>supprimer(id)}>S</button>
            <button className='btn btn-warning btn-sm' onClick={()=>editer(produit)}>E</button>
            <button className='btn btn-info btn-sm'>C</button>
         </div>
        </td>
    </tr>
  )
}

export default Ligne