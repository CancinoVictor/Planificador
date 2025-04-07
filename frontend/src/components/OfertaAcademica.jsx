// components/OfertaAcademica.jsx
import { useState } from 'react';

export default function OfertaAcademica({ materias, onAgregarMateria, materiasSeleccionadas = [] }) {
    const [filtro, setFiltro] = useState('');
    const [turnoFiltro, setTurnoFiltro] = useState('todos'); // 'todos', 'matutino', 'vespertino'

    // Estilos consistentes con el componente Horario
    const cardStyles = {
        base: "rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-200",
        hover: "hover:shadow-md hover:border-gray-300 hover:translate-y-[-2px]",
        colors: {
            "bg-blue-200": "border-l-4 border-blue-500",
            "bg-green-200": "border-l-4 border-green-500",
            "bg-yellow-200": "border-l-4 border-yellow-500",
            "bg-red-200": "border-l-4 border-red-500",
            "bg-purple-200": "border-l-4 border-purple-500",
            "bg-pink-200": "border-l-4 border-pink-500",
            "bg-indigo-200": "border-l-4 border-indigo-500"
        }
    };

    // Verificar si una materia ya está seleccionada
    const estaSeleccionada = (id) => {
        return materiasSeleccionadas.some(materia => materia.id === id);
    };

    // Determinar si una materia es matutina o vespertina
    const determinarTurno = (materia) => {
        // Si cualquier horario empieza después de las 14:00, es vespertino
        const esVespertino = materia.horarios.some(h => {
            const [hora] = h.horaInicio.split(':').map(Number);
            return hora >= 14;
        });
        return esVespertino ? 'vespertino' : 'matutino';
    };

    // Filtrar materias según búsqueda y turno
    const materiasFiltradas = materias.filter(materia => {
        const matchFiltro =
            materia.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            materia.profesor.toLowerCase().includes(filtro.toLowerCase()) ||
            materia.clave.toLowerCase().includes(filtro.toLowerCase());

        if (turnoFiltro === 'todos') return matchFiltro;
        return matchFiltro && determinarTurno(materia) === turnoFiltro;
    });

    return (
        <div>
            {/* Controles de filtrado */}
            <div className="mb-4 space-y-2">
                <input
                    type="text"
                    placeholder="Buscar materia, profesor, clave..."
                    className="w-full p-2 border rounded-md text-sm"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <div className="flex text-sm">
                    <button
                        onClick={() => setTurnoFiltro('todos')}
                        className={`flex-1 py-1 px-2 rounded-l-md ${turnoFiltro === 'todos' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setTurnoFiltro('matutino')}
                        className={`flex-1 py-1 px-2 ${turnoFiltro === 'matutino' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Matutino
                    </button>
                    <button
                        onClick={() => setTurnoFiltro('vespertino')}
                        className={`flex-1 py-1 px-2 rounded-r-md ${turnoFiltro === 'vespertino' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Vespertino
                    </button>
                </div>
            </div>

            {/* Contador de resultados */}
            <div className="text-sm text-gray-500 mb-3">
                Mostrando {materiasFiltradas.length} de {materias.length} materias
            </div>

            {/* Lista de materias */}
            <div className="space-y-3">
                {materiasFiltradas.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-md">
                        No se encontraron materias que coincidan con el filtro
                    </div>
                ) : (
                    materiasFiltradas.map((materia) => {
                        const seleccionada = estaSeleccionada(materia.id);
                        const turno = determinarTurno(materia);

                        return (
                            <div
                                key={materia.id}
                                className={`
                                    ${cardStyles.base} 
                                    ${cardStyles.hover}
                                    ${materia.color} 
                                    ${cardStyles.colors[materia.color] || ''}
                                    ${seleccionada ? 'opacity-50' : ''}
                                    shadow-sm
                                `}
                                onClick={() => !seleccionada && onAgregarMateria(materia)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                                            {materia.nombre}
                                            {seleccionada && <span className="ml-2 text-xs bg-white/80 px-2 py-0.5 rounded-full text-green-700">Agregada</span>}
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-1">
                                            <span className="font-medium">{materia.profesor}</span> | {materia.clave}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="bg-white/80 text-xs px-2 py-1 rounded-full text-gray-700">
                                            {materia.horarios.length} sesiones
                                        </span>
                                        <span className={`bg-white/80 text-xs px-2 py-1 rounded-full ${turno === 'matutino' ? 'text-blue-700' : 'text-purple-700'
                                            }`}>
                                            {turno === 'matutino' ? 'Matutino' : 'Vespertino'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-2 space-y-1">
                                    {materia.horarios.map((horario, index) => (
                                        <div key={index} className="flex items-center justify-between text-xs">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded font-medium bg-white/80 text-gray-700">
                                                {horario.dia}
                                            </span>
                                            <span className="text-gray-500">
                                                {horario.horaInicio} - {horario.horaFin}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}