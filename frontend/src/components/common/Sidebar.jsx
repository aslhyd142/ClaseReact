/**
 * Menu lateral del dashboard usa <Navlink0> de react-router-dom
 * en vez de <link> porque <Navlink> sabe automaticamente cuand su ruta esta activa (la URL actual coincide ) y
 * nos deja pintarla distinto (clase "active")
 */
import { NavLink } from 'react-router-dom';
//listta de items del menu mientras mas crece el dasnoard solo
// hay que agregar un objeto aca (evita repetir el mismo <navlink> 5 veces)
const opcionesMenu = [ 
    {texto: 'Inicio', ruta:'/dashboard', icono: 'bi-house-door', fin : true},
    {texto: 'Usuarios', ruta:'/dashboard/usuario', icono: 'bi-people'},
    {texto: 'Categorias', ruta:'/dashboard/categoria', icono: 'bi-tags'},
    {texto: 'Subcategorias', ruta:'/dashboard/subcategoria', icono: 'bi-diagrama-3'},
    {texto: 'Productos', ruta:'/dashboard/producto', icono: 'bi-box-seam'},
];
// No recibe props la lista de opciones esta fija en opciones menu
function Sidebar() {
  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
      style={{ width: 240, minHeight: '100vh' }}
    >
      <div className="d-flex align-items-center gap-2 mb-4 px-2">
        <i className="bi bi-boxes fs-4"></i>
        <span className="fs-5 fw-semibold">Inventario React</span>
      </div>

      <nav className="nav nav-pills flex-column gap-1">

        {/*Recorremos el arreglo de opciones menu y generamos un NavLink por cada item*/}
        {opcionesMenu.map((opcion) => (
          <NavLink
            key={opcion.ruta}
            to={opcion.ruta}

            //end evita que /dashboard se marque activo cuando en realidad estamos en /dashboard/usuarios
            end={opcion.fin}

            //react-router-dom permite pasar una funcion al className
            //que recibe {isActive} para saber si esta ruta es la actual
            className={({ isActive }) =>
              'nav-link d-flex align-items-center gap-2 text-white' +
              (isActive ? ' active bg-primary' : '')
            }
          >
            <i className={`bi ${opcion.icono}`}></i>
            <span>{opcion.texto}</span>
          </NavLink>
        ))}

      </nav>
    </aside>
  );
}
//Exportamos
export default Sidebar;


