import {createContext, useContext, useState} from 'react'
import {createCategoryRequest, getCategorysRequest, deleteCategoryRequest, getCategoryRequest, updateCategoryRequest} from '../admin/api/category'

const CategoryContext = createContext()

export const useCategory = () => {
    const context = useContext(CategoryContext);

    if(!context){
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context
}

export function CategoryProvider({children}){

    const [category, setCategory] = useState([])

    const getCategorys = async() =>{
        try {
            const response = await getCategorysRequest()
            setCategory(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const createCategory = async(category) => {
        const response = await createCategoryRequest(category)
        await getCategorys();
        console.log(response)
    }

    const deleteCategory = async(id) =>{
        try {
            const response = await deleteCategoryRequest(id)
            if(response.status === 204) setCategory(category.filter(categor=> categor.id_categoria !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const getCategory = async(id) => {
        try {
            const res = await getCategoryRequest(id)
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateCategory = async(id, category) => {
        try {
            const res = await updateCategoryRequest(id, category)
            await getCategorys();
            console.log(`esta es la respuesta ${res}`)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <CategoryContext.Provider 
            value={{
                category,
                createCategory,
                getCategorys,
                deleteCategory,
                getCategory,
                updateCategory
            }}>
            {children}
        </CategoryContext.Provider>
    )
}