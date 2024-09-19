import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Productos, {loader as productosLoader, action as actualizarDisponibilidadAction} from './pages/Productos'
import NuevoProducto, { action as nuevoProductoAction } from './pages/NuevoProducto'
import EditarProducto, {loader as editarProductoLoader, action as editarProductoAction} from './pages/EditarProducto'
import  { action as borrarProductos } from './components/ProductoDetalles'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Productos/>,
        loader: productosLoader,
        action: actualizarDisponibilidadAction
      },
      {
        path: 'productos/nuevo',
        element: <NuevoProducto/>,
        action: nuevoProductoAction
      },
      {
        path: 'productos/:id/editar', // ROA Pattern - Rseource-oriented design
        element: <EditarProducto/>,
        loader: editarProductoLoader,
        action: editarProductoAction
      },
      {
        path: 'productos/:id/eliminar',
        action: borrarProductos
      }
    ]
  }
])