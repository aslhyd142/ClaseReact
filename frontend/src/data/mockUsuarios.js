/**
 * Datos simulados no vienen de mysql se usan solo para pantalla 
 * de gestion de usuarios dentro del dashboard son el estado
 * inicial con la que arranca la tabla despues el hook los guarda en
 * LocalStorage  para que los cambios no se pierdan al recargar la pagina
 */
//arreglo de objetozs cada objeto es una fla simulada de la tabla usuarios 
const mockUsuarios = [
    {id:1, nombre:'Juan Diaz', correo:'juan.diaz@inventario.com', rol:'admin', activo:true},
    {id:2, nombre:'Maria Guzman', correo:'maria.guzman@inventario.com', rol:'vendedor', activo:true},
    {id:3, nombre:'Carlos Garcia', correo:'carlos.garcia@inventario.com', rol:'bodeguero', activo:false}
]