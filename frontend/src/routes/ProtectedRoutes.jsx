/**
 * componente guardian de ruta se usa envolviendo las rutas del dashboard en App.jsx si el usuario no esta inciado sesion lo redirige 
 * automaticamente a /login en vez de mostrar el contenido
 */
//Navigate redirige a otra ruta; Outlet renderiza la ruta hija activa
import {Navigate, Outlet} from 'react-router-dom';
//Hook para leer el estado de sesion (usuario, cargando...)
import { useAuth } from '../context/authcontext.jsx';

//No recibe props: se usa como elemento envolvente en App.jsx
function ProtectedRoutes(){
    //leemos el contexto si hay sesion activa y si todavia se esta verificando
    const { estaAutenticado, cargando} = useAuth();
    // mientras se revisa su habia una sesion guardada en el LocalStorage,
    //mostramos un mensaje corto en vez de parpadear hacia login
    if (cargando){
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status"></div>
                <span className="visually-hidden">cargando...</span>
            </div>
        );
    }
    //si no hay sesison activa, Navigate redirige a /login
    if (!estaAutenticado){
        return <Navigate to="/login" replace />;
    }
    //<outlet> renderiza la ruta hija que corresponda 
    //por ejemplo DashboardLayout con sus paginas internas)
    return <Outlet/>
}

//exportamos el componente para usarlo en App.jsx
export default ProtectedRoutes;