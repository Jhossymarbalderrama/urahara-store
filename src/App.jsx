/* eslint-disable no-unused-vars */
import './App.css'
import { Nav } from './components/Nav'
import { Home } from './layouts/Home'
import { Productos } from './components/Productos'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Carrito } from './components/Carrito'
import { Footer } from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { initSweet } from './assets/SweetAlert'
import { Social } from './components/Social'
import { ScrollToTopButton } from './components/Utils/ScrollToTopButton'
import { ProductDetail } from './components/ProductDetail'
import { Administrador } from './components/Administrador'
import { Login } from './components/Login'
import { Navigate } from 'react-router-dom'

function App() {
  const [productsCarrito, setProductsCarrito] = useState([]);
  const [userLogin, setUserLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);

  function agregarCarrito(producto, cantidad) {
    setProductsCarrito(productos => [
      ...productos,
      ...Array(cantidad).fill(producto)
    ]);

    initSweet(
      "Manga agregado al carrito",
      `El manga de ${producto.name} se agregó al carrito (${cantidad} unidades)`,
      "success",
      "Aceptar"
    );
  }

  function quitarCarrito(idProducto) {
    const listAux = [...productsCarrito];
    const index = listAux.findIndex((pd) => pd.id === idProducto);

    if (index !== -1) {
      const [manga] = listAux.splice(index, 1);

      setProductsCarrito(listAux);

      initSweet(
        "Manga eliminado del carrito",
        `El manga de ${manga.name} se quitó del carrito`,
        "success",
        "Aceptar"
      );
    }
  }


  function loginAdmin() {
    setAdminLogin(!adminLogin);
    !adminLogin ? messageAlert("Admin logeado", "", "success", "Aceptar") : messageAlert("Admin deslogeado", "", "success", "Aceptar")

  }

  function loginUser() {
    setUserLogin(!userLogin);
    !userLogin ? messageAlert("Usuario logeado", "", "success", "Aceptar") : messageAlert("Usuario deslogeado", "", "success", "Aceptar")
  }


  function messageAlert(title, message, type, textBtn) {
    initSweet(
      title,
      message,
      type,
      textBtn
    );
  }

  return (
    <Router>
      <div>
        <Social />
        <Nav productsCarrito={productsCarrito} />
        <Routes>
          <Route path='/' element={<Home agregarCarrito={agregarCarrito} />} />
          <Route path='/products' element={<Productos agregarCarrito={agregarCarrito} />} />
          <Route path='/products/product-detail/:id' element={<ProductDetail agregarCarrito={agregarCarrito} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />

          <Route path='/cart' element={userLogin ? <Carrito productos={productsCarrito} quitarCarrito={quitarCarrito} /> : <Navigate to={"/login"} replace />} />

          <Route path='/login' element={<Login loginAdmin={loginAdmin} loginUser={loginUser} userLogin={userLogin} adminLogin={adminLogin} />} />
          <Route path='/administrador' element={adminLogin ? <Administrador /> : <Navigate to={"/login"} replace />} />
        </Routes>

        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  )
}

export default App
