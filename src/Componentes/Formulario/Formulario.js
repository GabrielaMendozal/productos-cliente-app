function Formulario(props){
    return(
        <div>
        <form onSubmit={props.agregarNuevoProducto}>
            <h3>
                Product Manager
            </h3>
            <div>
                <label htmlFor="title">
                    Title:
                </label>
                <input type="text" id="title"
                        value={props.nuevoProducto.title}
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

export default Formulario;