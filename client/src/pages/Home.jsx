import React from 'react'
import { Link } from 'react-router-dom'
import auricular from '../assets/img/auriculares.png'
import foto from '../assets/img/foto.webp'
import data from '../data/dataProduct'
import dataCategory from '../data/dataCategory'
import { useState, useEffect } from 'react'
import SliderHeader from '../components/SliderHeader'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@nextui-org/button'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Footer from '../partials/Footer'
export default function Home() {


    const [datos, setDatos] = useState(data)
    const [datosCategory, setDatosCategoy] = useState(dataCategory)

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


    const colSpanClasses = ['col-span-1 bg-zinc-800 rounded-2xl ', 'col-span-1 bg-yellow-400 rounded-2xl ', 'col-span-2 bg-red-600 rounded-2xl ', 'col-span-2 bg-violet-600 rounded-2xl ', 'col-span-1 bg-green-500 rounded-2xl ', 'col-span-1 bg-blue-600 rounded-2xl '];
    return (
        <>

            <div className='max-w-7xl m-auto py-10'>
                <SliderHeader />
            </div>
            <main className='max-w-7xl m-auto'>
                <section className='py-20'>
                    <div className='grid grid-cols-4 gap-4'>
                        {datosCategory.map((categoria, index) => (
                            <div key={index} className={colSpanClasses[index]}>
                                <div className='relative flex items-center justify-end text-white'>
                                    <div>
                                        <img className='w-72 h-72 object-contain' src={categoria.img} alt={categoria.nombre} />
                                    </div>
                                    <div className='absolute bottom-0 left-0 m-10 flex flex-col gap-2'>
                                        <div>
                                            <h3 className={`${categoria.color}`}>Enjoy</h3>
                                            <span className={`${categoria.color2} text-white font-bold text-2xl uppercase`}>{categoria.descripcion}</span>
                                        </div>
                                        <h2 className={`${categoria.color3} font-bold text-4xl uppercase text-white/45`}>{categoria.nombre}</h2>
                                        <button className='w-fit text-sm py-2 px-4 rounded-full bg-white text-black font-semibold'>Explorar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <section className='bg-red-600 rounded-2xl relative p-16 my-52'>
                            <img className='w-96 h-96 object-contain absolute -top-20 left-52  ' src={foto} alt="" />
                            <div className='flex items-center justify-between text-white'>
                                <div className='w-full flex flex-col gap-3'>
                                    <span className='text-sm'>20% off</span>
                                    <h2 className='text-7xl font-black w-28 uppercase'>FIND SMILL</h2>
                                    <span className='text-sm'>15 nov to 7 dec</span>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <span className='text-sm'>Beats Solo Air</span>
                                    <h2 className='text-4xl font-bold'>Summer Sale</h2>
                                    <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At incidunt, quos reprehenderit doloremque natus ipsum odit possimus impedit obcaecati ad.</p>
                                    <button className='w-fit py-2 px-7 font-medium bg-white rounded-full text-red-500 text-sm'>Shop</button>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>
                    <SwiperSlide>
                        <section className='bg-blue-600 rounded-2xl relative p-16 my-52'>
                            <img className='w-96 h-96 object-contain absolute -top-20 left-52  ' src={foto} alt="" />
                            <div className='flex items-center justify-between text-white'>
                                <div className='w-full flex flex-col gap-3'>
                                    <span className='text-sm'>50% off</span>
                                    <h2 className='text-7xl font-black w-28 uppercase '>Audifonos plus</h2>
                                    <span className='text-sm'>15 nov to 7 dec</span>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <span className='text-sm'>Beats Solo Air</span>
                                    <h2 className='text-4xl font-bold'>Summer Sale</h2>
                                    <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At incidunt, quos reprehenderit doloremque natus ipsum odit possimus impedit obcaecati ad.</p>
                                    <button className='w-fit py-2 px-7 font-medium bg-white rounded-full text-red-500 text-sm'>Shop</button>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>

                </Swiper>

                <section>
                    <div className='text-center'>
                        <h2 className='text-4xl font-bold'>Best Seller Products</h2>
                        <span className='text-sm text-zinc-600'>Spaker There are many variations passages</span>
                    </div>

                    <Swiper
                        spaceBetween={30}
                        centeredSlides={false}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={4}
                        navigation={false}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {datos.map((producto) => (
                            <SwiperSlide className='my-16' key={producto.id}>
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
                                        <Button className='bg-red-600 text-white px-5 rounded-2xl text-sm'>Comprar Ahora</Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            </main>
            <Footer />
        </>
    )
}
