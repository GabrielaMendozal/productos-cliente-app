import {useState} from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Formulario from './Componentes/Formulario/Formulario';

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
    console.log(nuevoProducto, "AQUI ESTOY")
  }

  const actualizarCampoNuevoProducto = (propiedad,valor) =>{
    setNuevoProducto({
      ...nuevoProducto,
      [propiedad] : valor
    });
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" render={(routeProps) =>  <Formulario agregarNuevoProducto={agregarNuevoProducto}
                                                                nuevoProducto={nuevoProducto}
                                                                actualizarCampoNuevoProducto={actualizarCampoNuevoProducto}
                                                                {...routeProps}/>}/>
        </Switch>
        
      </BrowserRouter>

      
    </div>
  );
}

export default App;
