import {useCategory} from '../context/CategoryContext'


function CategoryCard({categor}) {

    const {deleteCategory} = useCategory()

  return (
    <div>
      <h1>{categor.nombre}</h1>
      <p>{categor.descripcion}</p>
      <button onClick={()=>{
        deleteCategory(categor.id_categoria)
      }} className="border-rose-700 border p-2">Eliminar</button>
      <button className='border-emerald-600 border p-2'>Editar</button>
    </div>
  );
}

export default CategoryCard;
