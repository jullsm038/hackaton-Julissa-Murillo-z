import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerDepartamentoPorId } from '../api/colombiaApi';

function DetalleDepartamento() {
  const { id } = useParams(); // lee el id de la URL: /departamento/5 → 5
  const navigate = useNavigate(); // para el botón Volver
  const [departamento, setDepartamento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const datos = await obtenerDepartamentoPorId(id);
        setDepartamento(datos);
      } catch (err) {
        setError('No se encontró el departamento');
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [id]); // se repite si cambia el id

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h1>{departamento.name}</h1>
      <p>{departamento.description}</p>
      <p>
        <strong>Capital:</strong> {departamento.cityCapital?.name}
      </p>
      <p>
        <strong>Población:</strong> {departamento.population}
      </p>
      <p>
        <strong>Superficie:</strong> {departamento.surface} km²
      </p>
      <p>
        <strong>Municipios:</strong> {departamento.municipalities}
      </p>
    </div>
  );
}

export default DetalleDepartamento;
