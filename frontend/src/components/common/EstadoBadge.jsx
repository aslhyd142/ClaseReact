/**
 * Muestra una etiqueta de color de bootstrap que dice activo o inactivo
 * para las tablas de usuarios categorias subcategorias y producto
 */
function EstadoBadge({ activo }) {
    const clase = activo ? "badge bg-success" : "badge bg-secondary";
    const texto = activo ? "Activo" : "Inactivo";
    return <span className={clase}>{texto}</span>;
}
export default EstadoBadge;