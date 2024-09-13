import {useState, useEffect} from "react";
import AsideNav from "./components/AsideNav";
import {useProduct} from '../context/ProductContext'
import {useCategory} from '../context/CategoryContext'
import {useNavigate, useParams} from 'react-router-dom'

function ProductForm() {

    const [id_categoria, setCategoria] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    const {createProduct, getProduct, updateProduct} = useProduct()
    const {getCategorys, category} = useCategory()
    
  
    useEffect(()=> {
      getCategorys()
    },[])

    useEffect(() => {
      const fetchProduct = async () => {
          if (params.id) {
              try {
                  const product = await getProduct(params.id);
                  if (product && product.nombre) {
                      setCategoria(product.id_categoria);
                      setNombre(product.nombre);
                      setDescripcion(product.descripcion);
                      setPrecio(product.precio);
                      setStock(product.stock);
                    }
                  console.log(product.nombre)
                  
              } catch (error) {
                  console.error('Error fetching product:', error);
              }
          }
      };
      fetchProduct();
  }, [params.id, getProduct]);

    const handleSubmit = (e) => {
      if(params.id){
        updateProduct(params.id, {id_categoria, nombre, descripcion, precio, stock})
        console.log({id_categoria, nombre, descripcion, precio, stock})
      }else{
        createProduct({id_categoria, nombre, descripcion, precio, stock})
      }
      navigate('/admin/productos')
      e.preventDefault()

    } 
    

  return (
    <>
      <div className="flex h-screen">
        <AsideNav />

        <div className="flex-1 p-10 bg-gray-100 ">
          <h2 className="text-3xl font-black text-zinc-800 mb-6">
            Agregar Productos
          </h2>
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Agregar
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                ></button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="categoria"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Categoria
                    </label>
                    <select
                      value={id_categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      name="categoria"
                      id="categoria"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    >
                      <option value="">Seleccione una categoría</option>
                      {category.map((categoria) => (
                        <option key={categoria.id_categoria} value={categoria.id_categoria}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre Producto
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
                      htmlFor="descripcion"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripcion Producto
                    </label>
                    <input
                      type="text"
                      value={descripcion}
                      name="descripcion"
                      id="descripcion"
                      onChange={(e)=>setDescripcion(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="precio"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Precio
                    </label>
                    <input
                      type="number"
                      value={precio}
                      name="precio"
                      id="precio"
                      onChange={(e)=>setPrecio(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stock"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      value={stock}
                      name="stock"
                      id="stock"
                      onChange={(e)=>setStock(e.target.value)}
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

export default ProductForm;
