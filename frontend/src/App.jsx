// src/App.jsx
import { useState } from 'react';
import { materiasMock } from './data/materiasMock';
import Horario from './components/Horario';
import OfertaAcademica from './components/OfertaAcademica';

function App() {
  const [materias] = useState(materiasMock);
  const [horario, setHorario] = useState([]);
  const [mobileView, setMobileView] = useState('horario'); // 'horario' o 'oferta'

  // Función auxiliar para convertir tiempo a minutos
  const tiempoAMinutos = (hora) => {
    const [hh, mm] = hora.split(":").map(Number);
    return hh * 60 + mm;
  };

  // Agregar materia al horario con validación
  const agregarMateria = (materia) => {
    // Si la materia ya está en el horario
    if (horario.some(item => item.id === materia.id)) {
      alert("¡Esta materia ya está en tu horario!");
      return;
    }

    // Verificar choque de horarios para cada horario de la materia
    const tieneChoque = materia.horarios.some(nuevoHorario => {
      return horario.some(materiaExistente => {
        // Buscar si hay algún horario de la materia existente que choque
        return materiaExistente.horarios.some(horarioExistente => {
          // Si es el mismo día
          if (horarioExistente.dia === nuevoHorario.dia) {
            // Verificar si los horarios se solapan
            const inicioNuevo = tiempoAMinutos(nuevoHorario.horaInicio);
            const finNuevo = tiempoAMinutos(nuevoHorario.horaFin);
            const inicioExistente = tiempoAMinutos(horarioExistente.horaInicio);
            const finExistente = tiempoAMinutos(horarioExistente.horaFin);

            return !(finNuevo <= inicioExistente || inicioNuevo >= finExistente);
          }
          return false;
        });
      });
    });

    if (tieneChoque) {
      alert("¡Choque de horario con otra materia!");
    } else {
      setHorario([...horario, materia]);
      // Si estamos en móvil, cambiamos a la vista del horario al agregar una materia
      if (window.innerWidth < 1024) {
        setMobileView('horario');
      }
    }
  };

  // Eliminar materia del horario
  const eliminarMateria = (id) => {
    setHorario(horario.filter(materia => materia.id !== id));
  };

  return (
    <div className="p-2 md:p-4 flex flex-col min-h-screen">
      {/* Título principal */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Planificador de Horarios Académicos
      </h1>

      {/* Botones de navegación para móvil */}
      <div className="lg:hidden flex mb-4">
        <button
          onClick={() => setMobileView('horario')}
          className={`flex-1 p-2 text-center ${mobileView === 'horario'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'} rounded-l-lg`}
        >
          Horario ({horario.length})
        </button>
        <button
          onClick={() => setMobileView('oferta')}
          className={`flex-1 p-2 text-center ${mobileView === 'oferta'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'} rounded-r-lg`}
        >
          Oferta Académica
        </button>
      </div>

      {/* Contenedor principal con grid para escritorio */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Vista móvil condicionada */}
        <div className={`lg:hidden ${mobileView === 'oferta' ? 'block' : 'hidden'} bg-gray-50 p-4 rounded-lg shadow`}>
          <h2 className="text-lg font-bold mb-4">Oferta Académica</h2>
          <OfertaAcademica
            materias={materias}
            onAgregarMateria={agregarMateria}
            materiasSeleccionadas={horario}
          />
        </div>

        <div className={`lg:hidden ${mobileView === 'horario' ? 'block' : 'hidden'} bg-gray-50 p-4 rounded-lg shadow`}>
          <h2 className="text-lg font-bold mb-4">Horario Generado</h2>
          <Horario
            materiasEnHorario={horario}
            onEliminarMateria={eliminarMateria}
          />
        </div>

        {/* Vista escritorio */}
        <div className="hidden lg:block lg:col-span-4 bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Oferta Académica</h2>
          <OfertaAcademica
            materias={materias}
            onAgregarMateria={agregarMateria}
            materiasSeleccionadas={horario}
          />
        </div>
        <div className="hidden lg:block lg:col-span-8 bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Horario Generado</h2>
          <Horario
            materiasEnHorario={horario}
            onEliminarMateria={eliminarMateria}
          />
        </div>
      </div>

      {/* Footer con información */}
      <footer className="mt-6 text-center text-gray-500 text-xs py-4">
        © {new Date().getFullYear()} Planificador de Horarios | Desarrollado con React
      </footer>
    </div>
  );
}

export default App;