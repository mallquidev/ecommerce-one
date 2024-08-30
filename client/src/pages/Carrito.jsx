import React, { useState, useEffect } from 'react';
import Nav from '../partials/Nav';
import Footer from '../partials/Footer';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/button';

export default function Carrito() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const updateLocalStorage = (items) => {
        localStorage.setItem('cart', JSON.stringify(items));
        setCartItems(items);
    };

    const handleIncreaseQuantity = (index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].cantidad += 1;
        updateLocalStorage(newCartItems);
    };

    const handleDecreaseQuantity = (index) => {
        const newCartItems = [...cartItems];
        if (newCartItems[index].cantidad > 1) {
            newCartItems[index].cantidad -= 1;
            updateLocalStorage(newCartItems);
        }
    };

    const handleRemoveItem = (index) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        updateLocalStorage(newCartItems);
    };

    const getTotal = () => {
        const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        return total.toFixed(2);
    };


    return (
        <>
            <Nav />
            <main className='max-w-7xl m-auto py-24'>
                <h2 className='text-2xl font-bold mb-4'>Carrito de compras</h2>
                <div className='flex' >
                    <div className='w-full h-[70vh] overflow-y-auto  ' >
                        {cartItems.length === 0 ? (
                            <div className='w-full'>
                                <p className='text-zinc-500'>No hay productos en el carrito.</p>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-5 w-full py-5'>
                                {cartItems.map((item, index) => (
                                    <div key={index} className=''>
                                        <div className='flex items-center w-full  rounded-xl gap-20 relative'>

                                            <div className='flex items-center gap-5' >
                                                <div>
                                                    <img src={item.img} alt={item.nombre} className='size-24 bg-gray-100 rounded-full p-4 object-contain mb-4' />
                                                </div>
                                                <div className='flex flex-col ' >
                                                    <h3 className='text-xl font-bold'>{item.nombre}</h3>
                                                    <span className='block text-zinc-700 text-lg'>S/ {item.precio}</span>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <motion.button
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 1.2 }}
                                                    onClick={() => handleDecreaseQuantity(index)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                    </svg>
                                                </motion.button>
                                                <span className='font-black'>{item.cantidad}</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 1.2 }}
                                                    onClick={() => handleIncreaseQuantity(index)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                            <div>
                                                <motion.button
                                                    title='Eliminar Producto'
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 1.2 }}
                                                    onClick={() => handleRemoveItem(index)}
                                                    className=''
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </motion.button>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='w-full'>
                        <form className="w-full max-w-lg m-auto ">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Celular
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                                    <p className="text-gray-600 text-xs italic">9 Digitos maximo</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Nombres
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Apellidos
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                </div>
                            </div>                         
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Mensaje
                                    </label>
                                    <textarea className='appearance-none block w-full resize-none h-32 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' name="" id=""></textarea>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Ciudad
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                        Estado
                                    </label>
                                    <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option>New Mexico</option>
                                            <option>Missouri</option>
                                            <option>Texas</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                        Zip
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                                </div>
                            </div>
                            <div className="w-full mt-5">
                                <Button className='bg-black text-white w-full py-3 px-4 rounded'>Comprar al WhatsApp</Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex text-xl font-bold items-center gap-2 my-10' >
                    <h3 className='' >Total:</h3><span className='' >S/ {getTotal()}</span>
                </div>
            </main>
            <Footer />
        </>
    );
}
