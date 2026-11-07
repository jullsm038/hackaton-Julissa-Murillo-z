const API_URL = 'https://api-colombia.com/api/v1';

// Trae TODOS los departamentos
export const obtenerDepartamentos = async () => {
  const respuesta = await fetch(`${API_URL}/Department`);
  if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
  return await respuesta.json();
};

// Trae UN departamento por su id
export const obtenerDepartamentoPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/Department/${id}`);
  if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
  return await respuesta.json();
};
