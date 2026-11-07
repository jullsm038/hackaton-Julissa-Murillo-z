import { Routes, Route, NavLink } from 'react-router-dom';
import Departamentos from './pages/Departamentos';
import DetalleDepartamento from './pages/DetalleDepartamento';

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/">Departamentos</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Departamentos />} />
        <Route path="/departamento/:id" element={<DetalleDepartamento />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </div>
  );
}

export default App;
