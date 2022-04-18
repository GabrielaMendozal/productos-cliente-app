import {Link} from 'react-router-dom';
import React,{useEffect,useState} from "react";

function ListaProductos(props){
    //console.log(props, "SOY PROPS") //productos trae toda la lista de productos
    return(
        <div>
            <h3>
                All Products:
            </h3>
            {
                props.productos.map( (producto, index ) => {
                    return (
                        <div  key={'producto_' + index}>
                            <Link to={`/${producto._id}`}>{producto.title}</Link>
                            
                        </div>
                    );
                })
            }
        </div>
    )
}

export default ListaProductos;