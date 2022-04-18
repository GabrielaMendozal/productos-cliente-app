import axios from "axios";
import React,{ useEffect, useState } from "react";
import {Link} from 'react-router-dom';


const DetalleProducto = (props) => {
    const id = props.match.params.id;
    const [producto, setProducto] = useState({}) //creo una variable local

    useEffect( () => {  
        axios.get( 'http://localhost:8080/api/producto/getById/' + id)
          .then( response => {
              setProducto (response.data); console.log(response); //envio solamente el response
            });
        }, []);

    return(
        <div>
            <h4>
                {producto.title}    
            </h4>
            <p>
                Price: $ {producto.price}
            </p>
            <p>
                Description : {producto.description}
            </p>
            <Link to={`/${producto._id}/edit`}>Edit</Link>
            <button onClick={(e) => {props.deleteProducto(producto._id)}} >
                Eliminar producto
            </button>
      
        </div>
    )
}

export default DetalleProducto;