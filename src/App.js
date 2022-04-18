import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Formulario from './Componentes/Formulario/Formulario';
import ListaProductos from './Componentes/ListaProductos/ListaProductos';
import DetalleProducto from './Componentes/DetalleProducto/DetalleProducto';

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
    console.log(nuevoProducto, "soy NUEVOPRODUCTO")
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

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/:id" render={(routeProps) => <DetalleProducto {...routeProps}/>}/>  
                                                                            
          <Route exact path="/" render={(routeProps) =>  
            <div>
              <Formulario agregarNuevoProducto={agregarNuevoProducto}
                          nuevoProducto={nuevoProducto}
                          actualizarCampoNuevoProducto={actualizarCampoNuevoProducto}
                          {...routeProps}/> 
              <ListaProductos productos={productos}/>
            </div>
          }/>     
              
        </Switch>
        
      </BrowserRouter>

      
    </div>
  );
}

export default App;
