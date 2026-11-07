/**
 * ADAPTADOR DE SALIDA · repositorio en un archivo JSON                     (ETAPA 2 · tu trabajo)
 *
 * Cumple EL MISMO puerto que el de memoria, pero guarda las evaluaciones en un archivo: un arreglo JSON.
 * Así los datos sobreviven a un reinicio del servidor (y, en la Etapa 6, a un contenedor nuevo).
 *
 *   crearRepositorioArchivo('/ruta/evaluaciones.json')
 *
 * Detalles que las pruebas comprueban:
 *   · si el archivo todavía no existe, `listar()` devuelve [] (no es un error);
 *   · al guardar por primera vez se crea el archivo… y también su carpeta, si hace falta (mira mkdirSync con { recursive: true });
 *   · otra instancia apuntando al mismo archivo ve lo que guardó la primera;
 *   · las mismas reglas del contrato que el de memoria (ids, copias, orden).
 *
 * Usa node:fs en su versión síncrona (readFileSync, writeFileSync, existsSync, mkdirSync) y node:path.
 *
 * Comprueba con:   npm run verificar -- 2
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export function crearRepositorioArchivo(ruta) {
  // Lee la lista del archivo (si todavía no existe, la lista está vacía).
  function leer() {
    if (!existsSync(ruta)) return [];
    return JSON.parse(readFileSync(ruta, 'utf8'));
  }

  // Escribe la lista completa en el archivo (creando la carpeta si hace falta).
  function escribir(lista) {
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, JSON.stringify(lista, null, 2));
  }

  return {
    listar() {
      return leer();
    },
    obtener(id) {
      return leer().find((e) => e.id === id);
    },
    guardar(evaluacion) {
      const lista = leer();
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const id = lista.reduce((mayor, e) => Math.max(mayor, e.id), 0) + 1;
        const nueva = { ...evaluacion, id };
        lista.push(nueva);
        escribir(lista);
        return { ...nueva };
      }
      const posicion = lista.findIndex((e) => e.id === evaluacion.id);
      if (posicion === -1) lista.push({ ...evaluacion });
      else lista[posicion] = { ...evaluacion };
      escribir(lista);
      return { ...evaluacion };
    },
    eliminar(id) {
      const lista = leer();
      const posicion = lista.findIndex((e) => e.id === id);
      if (posicion === -1) return false;
      lista.splice(posicion, 1);
      escribir(lista);
      return true;
    },
  };
}
