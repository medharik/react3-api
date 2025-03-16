import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { find, URL_IMAGE } from "../apis/produitApi";

export const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    find(id).then(r=> setData(r));
  }
  )
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
           {
            data.image && <img src={`${URL_IMAGE}/${data.image}`} width={200}  className="img-fluid"/>
           }
            <h3>
                {data.libelle}
            </h3>
            <div>
                <Link to={'/liste'}>Liste</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
