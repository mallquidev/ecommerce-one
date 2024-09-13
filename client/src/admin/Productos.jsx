import React, { useEffect } from 'react'
import AsideNav from './components/AsideNav'
import {Link} from 'react-router-dom'
import {useProduct} from '../context/ProductContext'
import ProductCard from '../components/ProductCard'

export default function Productos() {

  const {getProducts, products} = useProduct()

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <>
      <div className="flex h-screen">
        <AsideNav />

        <div className="flex-1 p-10 bg-gray-100 ">
          <h2 className="text-3xl font-black text-zinc-800 mb-6">Productos</h2>

          <div className="p-6 overflow-scroll px-0">
            <Link className='border border-cyan-600' to={'/admin/productform'}>Agregar Productos</Link>

              {
                products.map(product=>(
                  <ProductCard product={product} key={product.id_producto}/>
                ))
              }

          </div>
        </div>
      </div>
    </>
  )
}
