import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DrafProductoSchema = object({
  name : string(),
  price: number()
})


export const ProductoSchema = object({
  id: number(),
  name: string(),
  price: number(),
  disponibilidad: boolean()
})
export const ProductosSchema = array(ProductoSchema)
export type Producto = InferOutput<typeof ProductoSchema>