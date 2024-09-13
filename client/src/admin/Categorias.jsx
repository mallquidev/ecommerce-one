import { useEffect } from 'react';
import AsideNav from './components/AsideNav';
import { useCategory } from '../context/CategoryContext';
import CategoryCard from '../components/CategoryCard'
import {Link} from 'react-router-dom'

export default function Categorias() {
  
  const { getCategorys, category} = useCategory()
  

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
            <Link to={'/admin/categoryform'}>Crear</Link>

           
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
