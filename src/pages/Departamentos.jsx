import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerDepartamentos } from '../api/colombiaApi';

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]); // aquí se guardan los datos
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // se ejecuta al abrir la página
    const cargar = async () => {
      try {
        const datos = await obtenerDepartamentos();
        setDepartamentos(datos);
      } catch (err) {
        setError('No se pudieron cargar los departamentos');
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []); // [] = solo una vez

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Departamentos de Colombia</h1>
      <ul>
        {departamentos.map((dep) => (
          <li key={dep.id}>
            <Link to={`/departamento/${dep.id}`}>{dep.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Departamentos;
