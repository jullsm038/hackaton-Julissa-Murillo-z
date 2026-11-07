/**
 * ADAPTADOR DE SALIDA · repositorio en memoria                             (ETAPA 2 · tu trabajo)
 *
 * Cumple el puerto de ../../aplicacion/puerto-repositorio.js guardando las evaluaciones en un arreglo.
 * Es el adaptador más simple: sirve para las pruebas y para arrancar sin configurar nada.
 *
 * Lo importante es el CONTRATO (lee el puerto): ids que asigna él mismo (mayor + 1), copias en vez de las referencias
 * originales y los cuatro métodos con el significado exacto. Las pruebas de la Etapa 2 son las MISMAS para el
 * adaptador de archivo: si los dos las pasan, son intercambiables y el resto de la aplicación no se entera.
 *
 * Comprueba con:   npm run verificar -- 2
 */

export function crearRepositorioMemoria() {
  // Aquí viven las evaluaciones mientras el programa esté encendido.
  const evaluaciones = [];
  const copia = (e) => ({ ...e });

  return {
    listar() {
      return evaluaciones.map(copia);
    },
    obtener(id) {
      const encontrada = evaluaciones.find((e) => e.id === id);
      return encontrada ? copia(encontrada) : undefined;
    },
    guardar(evaluacion) {
      if (evaluacion.id === undefined || evaluacion.id === null) {
        // Nueva: id = el mayor que exista + 1 (el primero es 1).
        const id = evaluaciones.reduce((mayor, e) => Math.max(mayor, e.id), 0) + 1;
        const nueva = { ...evaluacion, id };
        evaluaciones.push(nueva);
        return copia(nueva);
      }
      // Ya tiene id: reemplaza la que tenga ese id (o la agrega si no estaba).
      const posicion = evaluaciones.findIndex((e) => e.id === evaluacion.id);
      if (posicion === -1) evaluaciones.push(copia(evaluacion));
      else evaluaciones[posicion] = copia(evaluacion);
      return copia(evaluacion);
    },
    eliminar(id) {
      const posicion = evaluaciones.findIndex((e) => e.id === id);
      if (posicion === -1) return false;
      evaluaciones.splice(posicion, 1);
      return true;
    },
  };
}
