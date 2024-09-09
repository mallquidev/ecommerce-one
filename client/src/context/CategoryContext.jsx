import {createContext, useContext, useState} from 'react'
import {createCategoryRequest, getCategorysRequest, deleteCategoryRequest} from '../admin/api/category'

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

    return(
        <CategoryContext.Provider 
            value={{
                category,
                createCategory,
                getCategorys,
                deleteCategory
            }}>
            {children}
        </CategoryContext.Provider>
    )
}