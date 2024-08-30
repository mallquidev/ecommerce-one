import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Nav() {
    const [scrollActive, setScrollActive] = useState(false);
    const [cartProductCount, setCartProductCount] = useState(0);

    const updateCartProductCount = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productCount = storedCart.length;
        setCartProductCount(productCount);
    };

    

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrollActive(true);
            } else {
                setScrollActive(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        updateCartProductCount();

        const handleStorageChange = () => {
            updateCartProductCount();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('storageUpdate', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('storageUpdate', handleStorageChange);
        };
    }, []);



    return (
        <motion.header
            className={`w-full bg-white/70 border-b  border-b-gray-100 ease-in-out duration-500 fixed z-50 ${scrollActive ? ' duration-500 ease-in-out backdrop-blur-md bg-white/50 py-1' : 'py-3  '} `}
        >
            <nav className='flex items-center justify-between max-w-7xl m-auto'>
                <div className='flex gap-10 items-center'>
                    <Link to={"/"} >
                        <img className='size-14 object-contain  ' src="/logo.png" alt="" />
                    </Link>
                    <ul className='flex items-center gap-5'>
                        <li>
                            <Link to={"/"} >Home</Link>
                        </li>
                        <li>
                            <Link to={"/shop"} className='font-bold' >Shop</Link>
                        </li>
                        <li>
                            <Link to={"/about"} >About Us</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='flex gap-4 items-center'>
                        <li>
                            <Link to={'/login'} className='font-semibold'>Login</Link>
                        </li>
                        <li>
                            <Link>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/carrito"} className='relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                {cartProductCount > 0 && (
                                    <span className='absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center'>
                                        {cartProductCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </motion.header>
    );
}
