import React from "react";
import {useProduct} from '../context/ProductContext'
import {Link} from 'react-router-dom'

function ProductCard({product}) {

    const {deleteProduct} = useProduct()

  return (
    <div>
      <p>{product.categoria_nombre}</p>
      <h1>{product.nombre}</h1>
      <p>{product.descripcion}</p>
      <p>{product.precio}</p>
      <p>{product.stock}</p>
      <button onClick={()=>{
        deleteProduct(product.id_producto)
      }} className="border border-red-700">Eliminar</button>
      <Link className="border border-sky-600" to={`/admin/productform/${product.id_producto}`}>Editar</Link>
      <Link className="border border-violet-600" to={`/admin/productimg/${product.id_producto}`}>Imagenes</Link>
    </div>
  );
}

export default ProductCard;
