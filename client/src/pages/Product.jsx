import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../partials/Footer';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import data from '../data/dataProduct';
import dataCategory from '../data/dataCategory';

export default function Product({ productos }) {
    const { id } = useParams();
    const producto = productos.find(producto => producto.id === parseInt(id));

    if (!producto) {
        return <div>No se encontró el producto con el ID {id}</div>;
    }

    const [cantidad, setCantidad] = useState(1);

    const handleDecreaseQuantity = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setCantidad(cantidad + 1);
    };

    const handleAddToCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = storedCart.findIndex(item => item.id === producto.id);

        if (existingProductIndex !== -1) {
            storedCart[existingProductIndex].cantidad += cantidad;
        } else {
            storedCart.push({ ...producto, cantidad });
        }

        localStorage.setItem('cart', JSON.stringify(storedCart));
        const event = new Event('storageUpdate');
        window.dispatchEvent(event);
        alert('Producto agregado al carrito');
    };

    const handleBuyNow = () => {
        const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
        storedPurchases.push({ ...producto, cantidad });
        localStorage.setItem('purchases', JSON.stringify(storedPurchases));
        const event = new Event('storageUpdate');
        window.dispatchEvent(event);
        alert('Compra realizada');
    };

    return (
        <>
            <main className='max-w-6xl m-auto'>
                <div className='flex items-center'>
                    <div className='w-full flex items-center justify-center'>
                        <img className='w-96 h-96 object-contain' src={producto.img} alt={producto.nombre} />
                    </div>
                    <div className='w-full flex items-center justify-center p-20 bg-zinc-50 h-[70vh]'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-stretch gap-2'>
                                <div>
                                    <div>
                                        <span className='rounded text-sm uppercase font-bold text-zinc-400'>{producto.categoria}</span>
                                    </div>
                                    <h2 className='text-3xl font-bold'>{producto.nombre}</h2>
                                </div>
                            </div>
                            <p className='text-zinc-600'>{producto.description}</p>
                            <span className='text-2xl font-semibold'>S/{producto.precio}</span>
                            <div className='flex items-center gap-2'>
                                <button onClick={handleDecreaseQuantity} className='rounded-md hover:bg-black ease-out hover:text-white duration-300 w-8 h-8 flex items-center justify-center border border-black'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                    </svg>
                                </button>
                                <span className='text-xl'>{cantidad}</span>
                                <button onClick={handleIncreaseQuantity} className='rounded-md hover:bg-black ease-out hover:text-white duration-300 w-8 h-8 flex items-center justify-center border border-black'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                    </svg>
                                </button>
                            </div>

                            <div className='flex gap-2'>
                                <button onClick={handleAddToCart} className='py-3 px-10 rounded bg-black text-white text-sm'>Agregar</button>
                                <button onClick={handleBuyNow} className='border border-black rounded py-3 px-10 text-sm'>Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
