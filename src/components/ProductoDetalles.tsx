import { Producto } from "../types";
import { formatCurrency } from "../helpers";
import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
  useFetcher,
} from "react-router-dom";
import Swal from "sweetalert2";
import { eliminarProducto } from "../services/ProductoService";

type ProductoDetalleProps = {
  producto: Producto;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await eliminarProducto(+params.id);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto borrado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    return redirect("/");
  }
}

export default function ProductoDetalles({ producto }: ProductoDetalleProps) {
  const isAvailable = producto.disponibilidad;
  const navigate = useNavigate();
  const fetcher = useFetcher()

  return (
    <tr className="border-b text-center ">
      <td className="p-3 text-lg text-gray-800">{producto.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(producto.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">


        <fetcher.Form method="POST">
          <button type="submit" name="id" value={producto.id} className={`${isAvailable ? 'text-green-700' : 'text-red-600'} rounded-lg p-2 text-xs w-full uppercase border border-black-100 hover:cursor-pointer font-bold hover:scale-105 transition`}>{isAvailable ? "Disponible" : "No Disponible"}</button>
        </fetcher.Form>
      

      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-6 items-center justify-center">
          <button
            onClick={() => navigate(`/productos/${producto.id}/editar`)}
            className="flex gap-2 font-mono transform transition duration-300 hover:scale-105"
          >
            Editar
            <svg
              width={20}
              height={20}
              version="1.0"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns-xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 64 64"
              enableBackground="new 0 0 64 64"
              xml-space="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    fill="#F9EBB2"
                    d="M3.001,61.999c-0.553,0-1.001-0.446-1-0.999l0.001-13.141L16.143,62L3.001,61.999z"
                  ></path>{" "}
                  <path
                    fill="#F76D57"
                    d="M61.414,16.729l-4.259,4.259L43.013,6.845l4.258-4.257c0.782-0.782,2.049-0.782,2.829-0.002L61.414,13.9 C62.195,14.682,62.194,15.947,61.414,16.729z"
                  ></path>{" "}
                  <g>
                    {" "}
                    <rect
                      x="37.256"
                      y="14.744"
                      transform="matrix(0.7071 0.7071 -0.7071 0.7071 25.6812 -28.5106)"
                      fill="#F9EBB2"
                      width="20.001"
                      height="4"
                    ></rect>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <rect
                      x="-1.848"
                      y="28.74"
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -15.6016 24.8148)"
                      fill="#45AAB8"
                      width="48.002"
                      height="5.001"
                    ></rect>{" "}
                    <rect
                      x="8.76"
                      y="39.348"
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -19.9956 35.4215)"
                      fill="#45AAB8"
                      width="48"
                      height="4.999"
                    ></rect>{" "}
                    <rect
                      x="3.456"
                      y="33.544"
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -17.7985 30.1183)"
                      fill="#45AAB8"
                      width="48.001"
                      height="5.999"
                    ></rect>{" "}
                  </g>{" "}
                  <rect
                    x="-1.847"
                    y="28.74"
                    transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 59.9084 37.6651)"
                    opacity="0.2"
                    fill="#231F20"
                    width="48.001"
                    height="5"
                  ></rect>{" "}
                  <rect
                    x="30.26"
                    y="17.847"
                    transform="matrix(0.7071 0.7071 -0.7071 0.7071 39.1859 -10.9078)"
                    opacity="0.2"
                    fill="#231F20"
                    width="4.999"
                    height="48"
                  ></rect>{" "}
                  <path
                    fill="#394240"
                    d="M62.828,12.486L51.514,1.172c-1.562-1.562-4.093-1.562-5.657,0.001c0,0-44.646,44.646-45.255,45.255 C-0.006,47.035,0,48,0,48l0.001,13.999c0,1.105,0.896,2,1.999,2.001h14c0,0,0.963,0.008,1.572-0.602s45.256-45.257,45.256-45.257 C64.392,16.579,64.392,14.05,62.828,12.486z M2.001,61v-1.583l2.582,2.582H3.001C2.448,61.999,2,61.553,2.001,61z M7.411,62 l-5.41-5.41l0.001-8.73L16.143,62H7.411z M52.912,25.23L38.771,11.088l-1.414,1.414l3.535,3.535L6.951,49.979l1.414,1.414 l33.94-33.941l4.243,4.243l-33.941,33.94l1.414,1.415l33.941-33.94l3.535,3.535L17.557,60.586L3.414,46.443L41.599,8.259 l14.143,14.143L52.912,25.23z M61.414,16.729l-4.259,4.259L43.013,6.845l4.258-4.257c0.782-0.782,2.049-0.782,2.829-0.002 L61.414,13.9C62.195,14.682,62.194,15.947,61.414,16.729z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>

          <Form method="POST" action={`productos/${producto.id}/eliminar`}>
            <button
              className="flex gap-2 font-mono transform transition duration-300 hover:scale-105"
              type="submit"
            >
              Eliminar
              <svg
                width={20}
                height={20}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns-xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 128 128"
                enableBackground="new 0 0 128 128"
                xml-space="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path
                        fill="#B0BEC5"
                        d="M64,0C28.656,0,0,28.656,0,64s28.656,64,64,64s64-28.656,64-64S99.344,0,64,0z M64,120 C33.125,120,8,94.875,8,64S33.125,8,64,8s56,25.125,56,56S94.875,120,64,120z"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path
                        fill="#F44336"
                        d="M75.313,64l16.969-16.969c3.125-3.125,3.125-8.195,0-11.313c-3.117-3.125-8.188-3.125-11.313,0L64,52.688 L47.031,35.719c-3.125-3.125-8.195-3.125-11.313,0c-3.125,3.117-3.125,8.188,0,11.313L52.688,64L35.719,80.969 c-3.125,3.125-3.125,8.195,0,11.313c3.117,3.125,8.188,3.125,11.313,0L64,75.313l16.969,16.969c3.125,3.125,8.195,3.125,11.313,0 c3.125-3.117,3.125-8.188,0-11.313L75.313,64z"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
}
