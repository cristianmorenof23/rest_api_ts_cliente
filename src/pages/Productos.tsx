import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { actualizarDisponibilidad, mostrarProducto } from "../services/ProductoService";
import ProductoDetalles from "../components/ProductoDetalles";
import { Producto } from "../types";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const productos = await mostrarProducto();

  return productos;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action ({request} : ActionFunctionArgs){

  const data = Object.fromEntries(await request.formData())
  await actualizarDisponibilidad(+data.id)  
  return {}
}

export default function Productos() {
  const productos = useLoaderData() as Producto[];

  return (
    <>
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-2xl sm:text-xl font-serif text-slate-500">
          Productos
        </h2>
        <Link
          to="productos/nuevo"
          className="middle text-center rounded-lg bg-cyan-500 py-2 px-4 sm:py-2 sm:px-3 lg:py-4 lg:px-6 font-sans text-sm lg:text-base uppercase text-white transition-transform hover:scale-105"
        >
          Agregar Producto
        </Link>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2 text-xs md:text-base">Producto</th>
              <th className="p-2 text-xs md:text-base">Precio</th>
              <th className="p-2 text-xs md:text-base">Disponibilidad</th>
              <th className="p-2 text-xs md:text-base">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <ProductoDetalles producto={producto} key={producto.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
