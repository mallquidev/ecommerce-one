import React from 'react'
import {AuthProvider} from './context/AuthContext'
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AboutUs from './pages/AboutUs'
import data from './data/dataProduct'
import Product from './pages/Product'
import Nav from './partials/Nav'
import Carrito from './pages/Carrito'
import { NextUIProvider } from '@nextui-org/system'
import Dashboard from './admin/Dashboard'
import Productos from './admin/Productos'
import Login from './pages/Login'
import Clientes from './admin/Clientes'
import Categorias from './admin/Categorias'
import Banners from './admin/Banners'
import ProtectedRoute from './ProtectedRoute'
import { CategoryProvider } from './context/CategoryContext'

const AppRoutes = () => {
  const location = useLocation()

  const showNav = !location.pathname.startsWith('/admin/dashboard')
  const showNav2 = !location.pathname.startsWith('/admin/productos')
  const showNav3 = !location.pathname.startsWith('/admin/categorias')
  const showNav4 = !location.pathname.startsWith('/admin/clientes')
  const showNav5 = !location.pathname.startsWith('/admin/banners')


  return (
    <>
      <AuthProvider>
      <CategoryProvider>
        {showNav5 && showNav4 && showNav3 && showNav2 && showNav && <Nav />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/product/:id' element={<Product productos={data} />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/carrito' element={<Carrito />} />
          <Route path='/login' element={<Login />} />
    
          <Route element={<ProtectedRoute/>}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/productos' element={<Productos />} />
            <Route path='/admin/categorias' element={<Categorias />} />
            <Route path='/admin/clientes' element={<Clientes />} />
            <Route path='/admin/banners' element={<Banners />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </CategoryProvider>
      
      </AuthProvider>
    </>
  )
}

export default function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </NextUIProvider>
  )
}
