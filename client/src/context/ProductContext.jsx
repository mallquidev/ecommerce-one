import { createContext, useContext, useState } from "react";
import {
  getProductsRequest,
  createProductRequest,
  deleteproductRequest,
  getProductRequest,
  updateproductRequest
} from "../admin/api/product";
import { createProductImg, getProductImg, deleteproductImg } from "../admin/api/productimg";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

// Proveedor del contexto
export function ProductProvider({ children }) {

  const [products, setProducts] = useState([]);


  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data); 
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteproductRequest(id);
      if (res.status === 204) {
        setProducts(products.filter((product) => product.id_producto !== id));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const res = await updateproductRequest(id, product);
      await getProducts();
      console.log(`esta es la respuesta ${res}`);
    } catch (error) {
      console.log(res);
    }
  };

  //imagenes
  const uploadProductImage = async (image) => {
    try {
      const res = await createProductImg(image);
      console.log("Imagen subida correctamente:", res);
      return res;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };

  const getProductImages = async (id) => {
    try {
      const res = await getProductImg(id);
      console.log("Imágenes obtenidas correctamente:", res);
      return res.data; // Retorna las imágenes
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
      throw error;
    }
  };

  const deleteProductImage = async (id) => {
    try {
      const res = await deleteproductImg(id)
      console.log(res)
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      throw error;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        createProduct,
        deleteProduct,
        getProduct,
        updateProduct,
        uploadProductImage,
        getProductImages,
        deleteProductImage
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
