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

function App() {
  const [productsCarrito, setProductsCarrito] = useState([]);


  function addCarrito(producto, cantidad) {
    for (let i = 0; i < cantidad; i++) {
      initSweet("Manga agregado al carrito",
        `El manga de ${producto.title} se agrego al carrito`,
        "Succes", "Cerrar");
      setProductsCarrito(productos => [...productos, producto]);
    }
  }


  return (
    <Router>
      <div>
        <Nav productsCarrito={productsCarrito} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Productos fAddCarrito={addCarrito} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Carrito productos={productsCarrito} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
