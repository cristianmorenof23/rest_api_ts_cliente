import { Producto } from "../types";

type ProductoFormProps = {
  producto? : Producto
}


export default function ProductoForm({producto} : ProductoFormProps) {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800 font-serif" htmlFor="name">
          Nombre Producto:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          placeholder="Nombre del Producto"
          name="name"
          defaultValue={producto?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800 font-serif" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          defaultValue={producto?.price}
        />
      </div>
    </>
  );
}
