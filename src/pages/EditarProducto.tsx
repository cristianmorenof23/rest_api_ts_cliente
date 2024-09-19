import {
  Link,
  Form,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import {
  actualizarProducto,
  obtenerProductosById,
} from "../services/ProductoService";
import Swal from "sweetalert2";
import { Producto } from "../types";
import ProductoForm from "../components/ProductoForm";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const productos = await obtenerProductosById(+params.id);
    if (!productos) {
      if (!productos) {
        return redirect("/");
      }
    }
    return productos;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  // Validar campos obligatorios
  if (Object.values(data).includes("")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos los campos son obligatorios!",
      confirmButtonText: "Reintentar",
    });
    return {};
  }

  // actualizar productos
  if (params.id !== undefined) {
    await actualizarProducto(data, +params.id);
  }

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Producto agregado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });

  return redirect("/");
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditarProducto() {
  const producto = useLoaderData() as Producto;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-serif text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="middle text-center none center  rounded-lg bg-cyan-500 py-4 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent hover:scale-105 duration-300 transform"
        >
          Volver a Productos
        </Link>
      </div>

      <Form className="mt-10" method="POST">

        <ProductoForm
          producto={producto}
        />

        <div className="mb-4">
          <label className="text-gray-800 font-serif" htmlFor="disponibilidad">
            Disponibilidad:
          </label>
          <select
            id="disponibilidad"
            className="mt-2 block w-full p-3 rounded-lg bg-gray-50 shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent focus:bg-indigo-50" 
            name="disponibilidad"
            defaultValue={producto?.disponibilidad.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()} >
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className=" w-full middle text-center none center  rounded-lg bg-indigo-500 py-4 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent hover:scale-105 duration-300 transform"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
