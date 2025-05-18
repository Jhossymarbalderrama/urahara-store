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

function App() {
  const [productsCarrito, setProductsCarrito] = useState([]);


  function agregarCarrito(producto, cantidad) {
    setProductsCarrito(productos => [
      ...productos,
      ...Array(cantidad).fill(producto)
    ]);

    console.log(producto);

    initSweet(
      "Manga agregado al carrito",
      `El manga de ${producto.name} se agregó al carrito (${cantidad} unidades)`,
      "success",
      "Aceptar"
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
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Carrito productos={productsCarrito} />} />
        </Routes>

        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  )
}

export default App
