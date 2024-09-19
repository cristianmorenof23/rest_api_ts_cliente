import { DrafProductoSchema, ProductosSchema, Producto, ProductoSchema } from "../types"
import { safeParse } from "valibot"
import axios from "axios"
import { toBoolean } from "../helpers"


type ProductoData = {
  [k: string]: FormDataEntryValue
}



export async function agregarProducto(data: ProductoData) {

  try {
    const resultado = safeParse(DrafProductoSchema, {
      name: data.name,
      price: +data.price
    })
    if (resultado.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/productos`
      await axios.post(url, {
        name: resultado.output.name,
        price: resultado.output.price
      })
    } else {
      throw new Error('Datos no validos')
    }
  } catch (error) {
    console.log(error);

  }
}

export async function mostrarProducto() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos`
    const {data} = await axios.get(url)
    const resultado = safeParse(ProductosSchema, data.data)
    if (resultado.success) {
      return resultado.output
    } else {
      throw new Error('Hubo un error')
    }
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerProductosById(id : Producto['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
    const {data} = await axios.get(url)
    const resultado = safeParse(ProductoSchema, data.data)
    if (resultado.success) {
      return resultado.output
    } else {
      throw new Error('Hubo un error')
    }
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarProducto(data : ProductoData, id : Producto['id'] ) {
  try {


    const resultado = safeParse(ProductoSchema, {
      id,
      name: data.name,
      price: +data.price,
      disponibilidad: toBoolean(data.disponibilidad.toString())
    })    
    if (resultado.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
      await axios.put(url, resultado.output)
    }
  } catch (error) {
    console.log(error);
  }
}

export async function eliminarProducto(id: Producto['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
    await axios.delete(url)
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarDisponibilidad(id:Producto['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
    await axios.patch(url)
  } catch (error) {
    console.log(error);
  }
}