import auricular from "../assets/img/auriculares.png"
import auricular2 from '../assets/img/foto.webp'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import dataSlider from '../data/dataSlider';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SliderHeader() {

    const [slider, setSlider] = useState(dataSlider)

    return (
        <>

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
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slider.map((datos) => (
                    <SwiperSlide key={datos.id}>
                        <section  className='relative my-16 bg-zinc-300 rounded-2xl flex items-center pl-36 ' style={{ height: '60vh', }}>
                            <div>
                                <div className='absolute left-1/2 top-1/2 -translate-y-1/2 '>
                                    <img className=' w-2/3 object-contain' src={datos.img} alt="" />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <span className='text-6xl font-bold uppercase'>{datos.descripcion}</span>
                                    </div>
                                    <h2 className='text-9xl font-bold bg-gradient-to-r from-white uppercase' style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent', }}>{datos.nombre}</h2>
                                    <button className='py-2 px-4 w-fit bg-red-600 text-sm text-white rounded-full'>Shop by Category</button>
                                </div>
                            </div>
                            <div className=' text-right flex justify-end absolute bottom-0 right-0 m-12'>
                                <div className='w-72'>
                                    <h4 className='font-bold'>Description</h4>
                                    <p className='text-xs'>{datos.subdescripcion}</p>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    )
}
