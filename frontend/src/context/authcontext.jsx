
/**
 * El contexto global de autenticación permite que cualquier
 * componente de la aplicación (sidebar, navbar, páginas protegidas, etc.)
 * sepa si hay un usuario logueado, quién es y pueda cerrar sesión
 * sin tener que pasar esa información manualmente de componente
 * en componente. Esto se conoce como "prop drilling" y Context
 * permite evitarlo.
 */

// createContext: crea el contexto.
// useContext: permite consumir el contexto.
// useEffect: ejecuta código en momentos específicos del ciclo de vida.
// useState: permite manejar el estado local del componente.

import { createContext, useContext, useEffect, useState } from "react";

// Función que llama al backend para validar email y contraseña.
import { iniciarSesion } from "../api/authService";

// 1. Creamos el contexto (una especie de caja compartida).
const AuthContext = createContext(null);

// 2. Componente proveedor: envuelve la aplicación y les da acceso
// a sus hijos al valor actual de autenticación.
export function AuthProvider({ children }) {

  // Guarda los datos públicos del usuario logueado.
  // Si no hay sesión, el valor inicial será null.
  const [usuario, setUsuario] = useState(null);

  // cargando: permanece en true mientras revisamos si existe
  // una sesión guardada en localStorage.
  const [cargando, setCargando] = useState(true);

  // useEffect con arreglo vacío []:
  // se ejecuta una sola vez cuando la aplicación arranca.
  useEffect(() => {

    const usuarioGuardado = localStorage.getItem("usuario");
    const tokenGuardado = localStorage.getItem("token");

    // Si existen un usuario y un token de una sesión anterior,
    // restauramos esa sesión sin obligar al usuario a iniciar sesión otra vez.
    if (usuarioGuardado && tokenGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    setCargando(false);

  }, []);

  // Función de login:
  // la llama LoginPage cuando el usuario envía el formulario.
  async function login(email, password) {

    // Llamamos al backend para validar las credenciales.
    // Si ocurre un error, LoginPage podrá capturarlo con try/catch.
    const { token, usuario: usuarioRecibido } =
      await iniciarSesion(email, password);

    // Guardamos la sesión en localStorage para que sobreviva
    // incluso si el usuario recarga la página con F5.
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuarioRecibido));

    // Actualizamos el estado para que React actualice la interfaz.
    setUsuario(usuarioRecibido);
  }

  // Función de logout:
  // elimina la sesión de localStorage y actualiza el estado.
  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setUsuario(null);
  }

  // 3. Definimos el valor que estará disponible
  // para cualquier componente que utilice useAuth().
  const value = {
    usuario,
    cargando,
    estaAutenticado: Boolean(usuario),
    login,
    logout,
  };

  // 4. Todo lo que esté dentro de AuthProvider podrá acceder
  // a estos valores mediante el hook useAuth().
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personalizado para consumir el contexto de forma sencilla.
 * En lugar de utilizar useContext(AuthContext) en cada componente,
 * simplemente utilizamos useAuth().
 */
export function useAuth() {

  // Leemos el valor actual del contexto.
  const contexto = useContext(AuthContext);

  // Si alguien utiliza useAuth() fuera de AuthProvider,
  // el contexto será null. Lanzamos un error claro.
  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }

  return contexto;
}
