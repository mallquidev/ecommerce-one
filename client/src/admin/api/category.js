import axios from './axios'

export const getCategorysRequest = () => axios.get('/category')

export const getCategoryRequest = (id) => axios.get(`/category/${id}`)

export const createCategoryRequest = (category) => axios.post('/category', category)

export const updateCategoryRequest = (category) => 
    axios.put(`/category/${category.id_categoria}`, category)

export const deleteCategoryRequest = (id) => axios.delete(`/category/${id}`)