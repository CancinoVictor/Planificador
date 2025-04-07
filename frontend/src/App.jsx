// src/App.jsx
import { useState } from 'react';
import { materiasMock } from './data/materiasMock';
import Horario from './components/Horario';
import OfertaAcademica from './components/OfertaAcademica';

function App() {
  const [materias] = useState(materiasMock);
  const [horario, setHorario] = useState([]);

  // Función auxiliar para convertir tiempo a minutos
  const tiempoAMinutos = (hora) => {
    const [hh, mm] = hora.split(":").map(Number);
    return hh * 60 + mm;
  };

  // Agregar materia al horario con validación
  const agregarMateria = (materia) => {
    const choque = horario.some(item =>
      item.dias.some(dia => materia.dias.includes(dia)) &&
      !(
        tiempoAMinutos(materia.horaFin) <= tiempoAMinutos(item.horaInicio) ||
        tiempoAMinutos(materia.horaInicio) >= tiempoAMinutos(item.horaFin)
      )
    );

    if (choque) {
      alert("¡Choque de horario con otra materia!");
    } else if (horario.some(item => item.id === materia.id)) {
      alert("¡Esta materia ya está en tu horario!");
    } else {
      setHorario([...horario, materia]);
    }
  };

  // Eliminar materia del horario
  const eliminarMateria = (id) => {
    setHorario(horario.filter(materia => materia.id !== id));
  };

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-screen">
      <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Oferta Académica</h2>
        <OfertaAcademica
          materias={materias}
          onAgregarMateria={agregarMateria}
        />
      </div>
      <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Horario Generado</h2>
        <Horario
          materiasEnHorario={horario}
          onEliminarMateria={eliminarMateria}
        />
      </div>
    </div>
  );
}

export default App;