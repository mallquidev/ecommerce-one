import { useEffect, useState } from 'react';
import AsideNav from './components/AsideNav';
import { useCategory } from '../context/CategoryContext';
import CategoryCard from '../components/CategoryCard'

export default function Categorias() {
  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const {createCategory, getCategorys, category} = useCategory()
  console.log(createCategory)

  // Función para abrir el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    createCategory({nombre, descripcion})
  }

  useEffect(()=> {
    getCategorys()
  },[])

  return (
    <>
      <div className="flex h-screen">
        <AsideNav />

        <div className="flex-1 p-10 bg-gray-100 ">
          <h2 className="text-3xl font-black text-zinc-800 mb-6">Categorias</h2>

          <div className="p-6 overflow-scroll px-0">
            {/* Botón para abrir/cerrar el modal */}
            <button
              onClick={toggleModal}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Crear Categoria
            </button>

            {/* Modal */}
            <div
              id="authentication-modal"
              tabIndex="-1"
              aria-hidden="true"
              className={`${
                isModalOpen ? 'flex' : 'hidden'
              } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Crear Categoria
                    </h3>
                    {/* Botón para cerrar el modal */}
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nombre Categoria
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={nombre}
                          onChange={(e)=> setNombre(e.target.value)}
                          id="nombre"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="descripcion"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          descripcion
                        </label>
                        <input
                          type="text"
                          name="descripcion"
                          value={descripcion}
                          onChange={(e)=>setDescripcion(e.target.value)}
                          id="descripcion"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <label
                            htmlFor="remember"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Estas seguro?
                          </label>
                        </div>
                        
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Crear
                      </button>
                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
              {
                category.map(categor => (
                  <CategoryCard categor={categor} key={categor.id_categoria} />
                ))
              }
          </div>
        </div>
      </div>
    </>
  );
}
