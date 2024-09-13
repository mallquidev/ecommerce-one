import { useState, useEffect } from 'react';
import AsideNav from './components/AsideNav';
import { useProduct } from '../context/ProductContext';
import { useParams } from 'react-router-dom';

function ProductImg() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]); 
  const { uploadProductImage, getProductImages, deleteProductImage } = useProduct();
  const params = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await getProductImages(params.id);
        setImages(imagesData);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

    fetchImages();
  }, [params.id, getProductImages]);

  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const sendHandler = async () => {
    if (!file) {
      alert('Escoge una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('imagenes', file);
    formData.append('id_producto', params.id);

    try {
      const response = await uploadProductImage(formData);
      console.log('Respuesta del servidor:', response);

      const updatedImages = await getProductImages(params.id);
      setImages(updatedImages);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };
  const deleteHandler = async (id_imagen) => {
    try {
      await deleteProductImage(id_imagen);
      const updatedImages = await getProductImages(params.id);
      setImages(updatedImages);
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <AsideNav />

        <div className="flex-1 p-10 bg-gray-100">
          <h2 className="text-3xl font-black text-zinc-800 mb-6">Categorías</h2>
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <input onChange={selectedHandler} id="imagenes" type="file" />
              <button onClick={sendHandler}>Upload</button>

              <div className="mt-6">
                <h3 className="text-xl font-bold">Imágenes del Producto:</h3>
                <div className="flex flex-wrap mt-4">
                  
                </div>
                
              </div>
              
            </div>
            {images.map((image) => (
                    <div key={image.id_imagen} className="relative">
                      <img
                        src={`http://localhost:3000/uploads/${image.nombre_imagen}`}
                        alt={`Imagen ${image.id_imagen}`}
                        className="w-32 h-32 object-cover m-2"
                      />
                      <button
                        onClick={() => deleteHandler(image.id_imagen)} // Botón para eliminar
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductImg;
