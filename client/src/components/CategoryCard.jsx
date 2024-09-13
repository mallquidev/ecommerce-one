import {useCategory} from '../context/CategoryContext'
import {Link} from 'react-router-dom'


function CategoryCard({categor}) {

    const {deleteCategory} = useCategory()

  return (
    <div>
      <h1>{categor.nombre}</h1>
      <p>{categor.descripcion}</p>
      <button onClick={()=>{
        deleteCategory(categor.id_categoria)
      }} className="border-rose-700 border p-2">Eliminar</button>
      <Link className='border-emerald-600 border p-2' to={`/admin/categoryform/${categor.id_categoria}`}>Editar</Link>
    </div>
  );
}

export default CategoryCard;
