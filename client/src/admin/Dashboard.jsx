import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJs, ArcElement, BarElement, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import AsideNav from './components/AsideNav';
ChartJs.register(ArcElement, LineElement, BarElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);
export default function Dashboard() {

    const BarChart = () => {
        const data = {
            labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
            datasets: [
                {
                    label: 'Total Sales',
                    data: [1200, 1900, 300, 500, 200, 300, 200],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },
            },
        };

        return <Bar className='w-[300px] h-[200px]' data={data} options={options} />;
    };

    const LineChart = () => {
        const data = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
                {
                    label: 'Total Sales',
                    data: [12, 19, 3, 5, 2, 3, 7],
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.4,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                    beginAtZero: true,
                },
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
        };

        return <Line data={data} className='w-[250px] ' options={options} />;
    };
    return (
        <>
            <div className="flex h-screen">
                <AsideNav />

                <div className="flex-1 p-10 bg-gray-100 ">
                    <div>
                        {/* <button className='md:hidden block' onClick={toggleSidebar} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button> */}
                    </div>
                    <h2 className="text-3xl font-black text-zinc-800 mb-6">Dashboard</h2>
                    <div className='flex items-cente gap-10 my-10' >
                        <div className='p-2 flex-1 border-dashed border  border-zinc-400 rounded-3xl relative ' >
                            <div className='flex justify-center items-center  flex-col gap-10' >
                                <div>
                                    <span>Mayor venta por Producto</span>
                                </div>
                                <BarChart />
                            </div>
                        </div>
                        <div className='py-7 pl-4 pr-14 border-dashed border flex-1 border-zinc-400 rounded-3xl relative ' >
                            <div className='absolute top-0 right-0 p-2' >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex justify-center  flex-col gap-10' >
                                <div className='flex flex-col gap-1'  >
                                    <h2 className='w-20 font-bold text-xl'>Team Payment</h2>
                                    <div className='flex items-center gap-2 ' >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-blue-600">
                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                        </svg>
                                        <span className='text-sm' >07 December</span>
                                    </div>
                                </div>
                                <div className='flex items-center' >
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='py-7 pl-4 pr-14 border-dashed border flex-1 border-zinc-400 rounded-3xl relative ' >
                            <div className='absolute top-0 right-0 p-2' >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex justify-center  flex-col gap-10' >
                                <div className='flex flex-col gap-1'  >
                                    <h2 className='w-20 font-bold text-xl'>Team Payment</h2>
                                    <div className='flex items-center gap-2 ' >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-blue-600">
                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                        </svg>
                                        <span className='text-sm' >07 December</span>
                                    </div>
                                </div>
                                <div className='flex items-center' >
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                    <img className=' w-12 h-12 bg-white -mr-4 p-0.5  object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='p-5 border-dashed border border-zinc-400 rounded-3xl relative  '>
                            <h2>Venta por Semana</h2>
                            <div className='flex justify-center flex-col gap-10'>
                                <LineChart />
                            </div>
                            <div>
                                <span className='text-xl font-bold' >S/.2340</span>
                                <div className='flex items-center gap-1' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-green-500 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                    </svg>
                                    <span className='text-xs text-green-500' >+20%</span>
                                    <span className='text-xs text-zinc-500'>Ultima Semana</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="p-6 overflow-scroll px-0">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Transaction</p>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Amount</p>
                                        </th>
                                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Date</p>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Account</p>
                                        </th>
                                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70"></p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-3">
                                                <img src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg" alt="Spotify" className="inline-block relative object-center  w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1 " />
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Spotify</p>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">$2,500</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Wed 3:00pm</p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="w-max">
                                                <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md" >
                                                    <span className="">paid</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                                    <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png" alt="visa" className="inline-block relative object-center  rounded-md h-full w-full object-contain p-1 " />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">visa

                                                    </p>
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">06/2026</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <div class="w-full pt-5 px-4 mb-8 mx-auto ">
                                <div class="text-sm text-gray-700 py-1">
                                    Made with <a class="text-gray-700 font-semibold" href="https://www.material-tailwind.com/?ref=tailwindcomponents" target="_blank">Material Tailwind</a> by <a href="https://www.creative-tim.com?ref=tailwindcomponents" class="text-gray-700 font-semibold" target="_blank"> Creative Tim</a>.
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
