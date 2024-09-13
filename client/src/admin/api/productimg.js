import axios from './axios'

export const getProductsImg = () => axios.get('/imgproduct')

export const getProductImg = (id) => axios.get(`/imgproduct/${id}`)

export const createProductImg = (image) => axios.post('/imgproduct', image)

export const deleteproductImg = (id) => axios.delete(`/imgproduct/${id}`)