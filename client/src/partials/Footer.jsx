import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className='flex justify-between max-w-7xl m-auto py-20 gap-20'>
            <div className='w-full' >
                <h2 className=' mb-5'>Logo</h2>
                <p className='w-36'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quas consequatur reiciendis modi iure!</p>
                <ul>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                </ul>
            </div>
            <div className='w-full'>
                <h4 className='font-bold mb-5'>Quick Links</h4>
                <ul className='font-semibold'>
                    <li>
                        <Link>Home</Link>
                    </li>
                    <li>
                        <Link>Shop</Link>
                    </li>
                    <li>
                        <Link>About</Link>
                    </li>
                </ul>
            </div>
            <div className='w-full'>
                <h4 className='font-bold mb-5'>Contact</h4>
                <span className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque perspiciatis vel corporis.</span>
            </div>
            <div className='w-full'>
                <h4 className='font-bold mb-5'>
                    Suscribe To Our Email
                </h4>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-3xl font-bold'>For Latest News & Updates</h2>
                    <div className='py-2 px-3 flex bg-gradient-to-l from-zinc-300 rounded-full '>
                        <input type="text" className=' bg-transparent outline-none text-sm' placeholder='Enter Your Email' />
                        <button className='py-2 px-5 bg-red-600 text-sm shadow-lg shadow-red-600 rounded-full text-white'>Suscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
