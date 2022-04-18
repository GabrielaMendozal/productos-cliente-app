import React,{ useEffect, useState } from "react";
import axios from "axios";
import Formulario from "../Formulario/Formulario";

const EditarProducto = (props) => {
    const id = props.match.params.id;
    const [producto, setProducto] = useState({})
    
    
    const editarProducto = (e) =>{
        const datosaActualizar = {
          title: e.target.title.value,
          price:e.target.price.value,
          description:e.target.description.value
        }
    
        axios.put("http://localhost:8080/api/producto/edit/"+id,datosaActualizar)
          .then(response => {
            let productosActualizados = [...producto];
            const indice = productosActualizados.findIndex((nuevoProducto) => nuevoProducto._id === id);
            productosActualizados[indice] = response.data;
            setProducto(productosActualizados);
          })
      }

    return(
        <div>
            <form onSubmit={editarProducto}>
                <h3>
                    Product Manager
                </h3>
                <div>
                    <label htmlFor="title">
                        Title:
                    </label>
                    <input type="text" id="title"
                            value={producto.title}
                            onChange={(e) => props.actualizarCampoNuevoProducto('title', e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price">
                        Price:
                    </label>
                    <input type="number" id="price"
                            value={props.nuevoProducto.price}
                            onChange={(e) => props.actualizarCampoNuevoProducto('price', e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">
                        Descripcion:
                    </label>
                    <input type="text" id="description"
                            value={props.nuevoProducto.description}
                            onChange={(e) => props.actualizarCampoNuevoProducto('description', e.target.value)}/>
                </div>
                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}
export default EditarProducto;