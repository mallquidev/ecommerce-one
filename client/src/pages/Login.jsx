import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import {useAuth} from '../context/AuthContext'

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { signin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signin({ usuario, contrasena });
      
      
      /*console.log('Token', data.token);
      localStorage.setItem('token', data.token);
      window.location.href = '/admin/dashboard'*/
    } catch (err) {
      setError(err.message);
    }
  }


  return (
    <>
      <div className="w-full flex flex-wrap max-w-7xl m-auto">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Bienvenido.</p>
            <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8">
              <div className='flex flex-col gap-10'>
                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      value={usuario}
                      type='text'
                      onChange={(e) => setUsuario(e.target.value)}
                      required
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm py-6 px-2 border-blue-gray-200 focus:border-gray-900"
                      placeholder=" " />
                    <label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Usuario
                    </label>
                  </div>
                </div>

                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      type='password'
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm py-6 px-2 border-blue-gray-200 focus:border-gray-900"
                      placeholder="" />
                    <label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[''] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Contraseña
                    </label>
                  </div>
                </div>
                <div className='w-full'>
                  <Button type='submit' className='py-2 px-5 w-full rounded-none bg-black text-white'>Iniciar Sesión</Button>
                  {error && <p>{error}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <img className="object-cover w-full h-screen hidden md:block" src="https://assets.techrepublic.com/uploads/2021/02/istock-1221232128.jpg" />
        </div>
      </div>
    </>
  )
}
