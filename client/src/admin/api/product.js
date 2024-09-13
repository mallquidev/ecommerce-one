import axios from './axios'

export const getProductsRequest = () => axios.get('/product')

export const getProductRequest = (id) => axios.get(`/product/${id}`)

export const createProductRequest = (product) => axios.post('/product', product)

export const updateproductRequest = (id, product) => 
    axios.put(`/product/${id}`, product)

export const deleteproductRequest = (id) => axios.delete(`/product/${id}`)