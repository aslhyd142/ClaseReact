// ============================================================
// App.jsx
// Pertenece a: Clase 04 - Dashboard y rutas protegidas
// ------------------------------------------------------------
// Define TODAS las rutas (URLs) de la aplicacion usando
// react-router-dom. Es como el "mapa" de la app: que componente
// se muestra segun la URL que el usuario visite.
// ============================================================

// Piezas de react-router-dom: Routes/Route definen el mapa de rutas,
// Navigate sirve para redirigir de una URL a otra.
import { Navigate, Route, Routes } from 'react-router-dom';

// Guardian que protege las rutas privadas del dashboard
import ProtectedRoute from './routes/ProtectedRoute.jsx';
// Esqueleto visual (sidebar + topbar) que comparten las paginas del dashboard
import DashboardLayout from './layout/DashboardLayout.jsx';

// Paginas publicas y privadas de la aplicacion
import LoginPage from './page/Loginpage.jsx';
import DashboardHome from './page/DashboardHome.jsx';
import UsuariosPage from './page/UsuariosPage.jsx';
import CategoriasPage from './page/CategoriasPage.jsx';
import SubcategoriasPage from './page/SubcategoriasPage.jsx';
import ProductosPage from './page/ProductosPage.jsx';
import NotFoundPage from './page/NotFoundPage.jsx';

// Componente raiz: se renderiza dentro de <BrowserRouter> (ver main.jsx)
function App() {
  return (
    <Routes>
      {/* Ruta raiz: manda directo al login (si ya hay sesion,
          ProtectedRoute se encargara de dejarlo pasar al dashboard) */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Ruta publica: cualquiera puede entrar a /login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Grupo de rutas PROTEGIDAS: todo lo que este dentro de este
          <Route> solo se muestra si ProtectedRoute confirma que hay
          sesion activa; si no, redirige a /login. */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* index = lo que se muestra en exactamente "/dashboard" */}
          <Route index element={<DashboardHome />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          
          
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="subcategorias" element={<SubcategoriasPage />} />
          <Route path="productos" element={<ProductosPage />} />
        </Route>
      </Route>

      {/* Cualquier otra URL que no coincida con las anteriores */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Exportamos App para que main.jsx lo pueda renderizar
export default App;