import {Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Producto from './views/Producto'
import Eventos from './views/Eventos'
import Artistas from './views/Artistas'
import Admin from './views/Admin'
import Perfil from './views/Perfil'
import Carrito from './views/Cart'
import Login from './views/Login'
import Registro from './views/Registro'
import EditarPerfil from './views/EditarPerfil'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/producto/:id" element={<Producto/>}/>
      <Route path="/eventos" element={<Eventos/>}/>
      <Route path="/artistas" element={<Artistas/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/perfil" element={<Perfil/>}/>
      <Route path="/carrito" element={<Carrito/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/registro" element={<Registro/>}/>
      <Route path="/EditarPerfil" element={<EditarPerfil/>}/>
    </Routes>
  )
}

export default App
