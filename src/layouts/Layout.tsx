import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800 shadow-lg">
        <div className="mx-auto max-w-6xl py-10 text-center">
          <Link to="/">
            <h1 className="text-4xl font-serif text-white">
              Administrador de Productos
            </h1>
          </Link>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-6xl p-10 shadow-xl bg-white">
        <Outlet />
      </main>
    </>
  );
}
