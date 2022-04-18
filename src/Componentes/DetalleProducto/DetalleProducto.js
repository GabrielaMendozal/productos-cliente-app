import axios from "axios";
import React,{ useEffect, useState } from "react";

const DetalleProducto = (props) => {
    const id = props.match.params.id;
    const [producto, setProducto] = useState({})
    useEffect( () => {  
        axios.get( 'http://localhost:8080/api/producto/getById/' + id)
          .then( response => {
              setProducto (response.data); console.log(response);
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
        </div>
    )
}

export default DetalleProducto;