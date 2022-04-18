import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Formulario from './Componentes/Formulario/Formulario';
import ListaProductos from './Componentes/ListaProductos/ListaProductos';
import DetalleProducto from './Componentes/DetalleProducto/DetalleProducto';
import EditarProducto from './Componentes/EditarProducto/EditarProducto';

function App() {
  const productoNuevoInicial = {
    title : '',
    price : 0,
    description : ''
  }

  const[productos, setProductos] = useState( []);
  const [nuevoProducto, setNuevoProducto] = useState( productoNuevoInicial );
  


  const agregarNuevoProducto =(event) =>{
    event.preventDefault();
    const ajusteNuevoTodo = {
      ...nuevoProducto
    }
    axios.post( 'http://localhost:8080/api/producto/crear', ajusteNuevoTodo)
      .then( response => {
        setProductos( (productosPrev) => [...productosPrev, response.data]);
      });
    setNuevoProducto( (productoNuevoPrev) => productoNuevoInicial);
  }

  const actualizarCampoNuevoProducto = (propiedad,valor) =>{
    setNuevoProducto({
      ...nuevoProducto,
      [propiedad] : valor
    });
  }

  useEffect( () => {  
    axios.get( 'http://localhost:8080/api/producto/getAll')
      .then( response => {
        const listaProductos = response.data.map( (producto, index) => {
          return {
            _id : producto._id,
            title : producto.title,
            price : producto.price,
            description : producto.description
          }
        });
        setProductos( (productosPrev) => listaProductos);
      });
  }, []);

  
  const removeFromDom = id => {
    setProductos(productos.filter(producto => producto._id !== id));
}


  const deleteProducto = (id) =>{
    axios.delete('http://localhost:8080/api/producto/eliminar/' + id)
      .then(response => {
        removeFromDom(id);
    });
  }  



  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/:id/edit" render={(routeProps) => <EditarProducto  agregarNuevoProducto={agregarNuevoProducto}
                          nuevoProducto={nuevoProducto}
                          actualizarCampoNuevoProducto={actualizarCampoNuevoProducto}
                          {...routeProps}/>}/>  
          <Route exact path="/:id" render={(routeProps) => <DetalleProducto 
                                                          removeFromDom={removeFromDom} deleteProducto={deleteProducto}
                                                            {...routeProps}/>}/>  
                                                                            
          <Route exact path="/" render={(routeProps) =>  
            <div>
              <Formulario agregarNuevoProducto={agregarNuevoProducto}
                          nuevoProducto={nuevoProducto}
                          actualizarCampoNuevoProducto={actualizarCampoNuevoProducto}
                          {...routeProps}/> 
              <ListaProductos productos={productos} removeFromDom={removeFromDom} deleteProducto={deleteProducto}/>
            </div>
          }/>     
        </Switch>
        
      </BrowserRouter>

      
    </div>
  );
}

export default App;
