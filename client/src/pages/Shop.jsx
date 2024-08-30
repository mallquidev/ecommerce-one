import React from 'react'
import { Link } from 'react-router-dom'
import Product from './Product';
import data from '../data/dataProduct';
import dataCategory from '../data/dataCategory';
import { useState } from 'react'
import Footer from '../partials/Footer';
import { Button } from '@nextui-org/button';
export default function Shop() {

    const [productos, setProductos] = useState(data);
    const [category, setCategory] = useState(dataCategory);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const StarRating = ({ calificacion }) => {
        const totalStars = 5;

        return (
            <div className="flex items-center">
                {[...Array(totalStars)].map((_, index) => (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill='currentcolor'
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={index < calificacion ? 'fill-yellow-500 stroke-none size-5' : 'size-5 fill-zinc-300 stroke-none '}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <>

            <main className='max-w-7xl m-auto'>
                <section className='py-28' >
                    <div className='text-center'>
                        <h2 className='text-4xl font-bold'>Todos los productos</h2>
                        <span className='text-sm text-zinc-600'>Muchas opciones y precios de todos los productos</span>
                    </div>
                    <div className='flex justify-between py-5' >
                        <div className='mr-20' >
                            <h2>Categoria</h2>
                            <ul className='flex flex-col my-10  gap-3 text-zinc-700 '>
                                <li className=' font-bold text-sm hover:text-zinc-950 ease-in-out duration-300'><button onClick={() => handleCategoryClick("All")}>TODO</button></li>
                                {category.map((categoria) => (
                                    <li key={categoria.id}><button onClick={() => handleCategoryClick(categoria.id)} className='uppercase font-bold text-sm hover:text-zinc-950 ease-in-out duration-300'>{categoria.nombre}</button></li>
                                ))}
                            </ul>                         
                        </div>
                        <div className='grid  grid-cols-4 gap-5'>
                            {productos
                                .filter(producto => selectedCategory === "All" || producto.categoria === selectedCategory)
                                .map((producto) => (
                                    <div key={producto.id}>
                                        <div className='bg-zinc-100 px-4 py-6 rounded-2xl' >
                                            <span className='font-bold text-zinc-800 text-xl  '>{producto.nombre}</span>
                                            <div className='flex gap-1' >
                                                <StarRating calificacion={producto.calificacion} />
                                                <span>(2)</span>
                                            </div>
                                            <div className=' rounded-2xl flex items-center py-5 justify-center relative'>
                                                <img className='w-44 h-44 object-contain' src={producto.img} alt="" />
                                                <span className='bg-red-600 rounded-full p-5 text-xs w-4 h-4 text-white flex items-center justify-center absolute top-0 left-0 m-4'>45%</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='flex-col flex gap-1'>
                                                    <div className='flex gap-2' >
                                                        <span className='line-through text-zinc-500'>S/.100</span>
                                                        <span>Ahorra S/. 7.20</span>
                                                    </div>
                                                    <span className='font-semibold text-2xl'>S/{producto.precio}</span>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 items-center mt-5' >
                                                <Link className='hover:opacity-80 hover:animate-pulse ease-in-out duration-300 py-2  px-5 border-red-600  text-sm  border rounded-2xl' to={`/shop/product/${producto.id}}`}>Mas Info..</Link>
                                                <Button className='bg-red-600 text-white px-5 rounded-2xl text-sm'>Agregar</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
