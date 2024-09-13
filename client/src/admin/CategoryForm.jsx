import {useState, useEffect} from "react";
import AsideNav from "./components/AsideNav";
import {useCategory} from '../context/CategoryContext'
import {useNavigate, useParams} from 'react-router-dom'


function CategoryForm() {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const {createCategory, getCategory, updateCategory} = useCategory()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(()=>{
        const loadCategory = async () => {
            if (params.id) {
                const categoryData = await getCategory(params.id);
                setNombre(categoryData.nombre);
                setDescripcion(categoryData.descripcion);
            }
        };
        loadCategory();
    }, [params.id, getCategory]);

    const handleSubmit = (e) =>{
        if(params.id){
            updateCategory(params.id, {nombre, descripcion})
        }else{
            createCategory({nombre, descripcion})
        }
        navigate('/admin/categorias')
        e.preventDefault();
    }
    

  return (
    <>
      <div className="flex h-screen">
        <AsideNav />

        <div className="flex-1 p-10 bg-gray-100 ">
          <h2 className="text-3xl font-black text-zinc-800 mb-6">Categorias</h2>
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Crear Categorias
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
            
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre Categoria
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      name="nombre"
                      id="nombre"
                      onChange={(e)=>setNombre(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripcion Categoria
                    </label>
                    <input
                      value={descripcion}
                      type="text"
                      name="descripcion"
                      id="descripcion"
                      onChange={(e)=>setDescripcion(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
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
      </div>
    </>
  );
}

export default CategoryForm;
