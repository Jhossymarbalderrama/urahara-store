import './App.css'
import { Nav } from './components/Nav'
import { Home } from './layouts/Home'
import { Productos } from './components/Productos'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Carrito } from './components/Carrito'
import { Footer } from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { Social } from './components/Social'
import { ScrollToTopButton } from './components/Utils/ScrollToTopButton'
import { ProductDetail } from './components/ProductDetail'
import { Administrador } from './components/Administrador'
import { Login } from './components/Login'
import { Navigate } from 'react-router-dom'
import { CarritoContext } from './contexts/CarritoContext'
import { AuthContext } from './contexts/AuthContext'
import { FormularioProducto } from './components/FormularioProductos'
import { ProductosProvider } from './contexts/ProductosContext'
import { ProductCrud } from './components/ProductCRUD'


function App() {
  const { productsCarrito, agregarCarrito, quitarCarrito } = useContext(CarritoContext);
  const { user, login } = useContext(AuthContext);

  return (
    <Router>
      <div className='roboto-1'>
        <Social />
        <Nav productsCarrito={productsCarrito} />
        <Routes>
          <Route path='/' element={
            <ProductosProvider>
              <Home agregarCarrito={agregarCarrito} />
            </ProductosProvider>
          } />

          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login loginAdmin={login} loginUser={login} userLogin={user} adminLogin={user} />} />

          <Route path='/products' element={
            <ProductosProvider>
              <Productos agregarCarrito={agregarCarrito} />
            </ProductosProvider>
          } />

          <Route path='/products/product-detail/:id' element={
            <ProductosProvider>
              <ProductDetail agregarCarrito={agregarCarrito} />
            </ProductosProvider>
          } />

          <Route path='/administrador' element={
            user ? (
              <ProductosProvider>
                <Administrador />
              </ProductosProvider>
            ) : <Navigate to={"/login"} replace />
          } />

          <Route path='/administrador/agregarProductos' element={
            user ? (
              <ProductosProvider>
                <ProductCrud />
              </ProductosProvider>
            ) : <Navigate to={"/login"} replace />
          } />

          <Route path='/cart' element={
            <ProductosProvider>
              {user ? <Carrito productos={productsCarrito} quitarCarrito={quitarCarrito} /> : <Navigate to={"/login"} replace />}
            </ProductosProvider>
          } />
        </Routes>

        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  )
}

export default App
