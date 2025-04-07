// components/OfertaAcademica.jsx
export default function OfertaAcademica({ materias, onAgregarMateria, materiasSeleccionadas = [] }) {
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

    return (
        <div className="space-y-3">
            {materias.map((materia) => {
                const seleccionada = estaSeleccionada(materia.id);

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
                            <span className="bg-white/80 text-xs px-2 py-1 rounded-full text-gray-700">
                                {materia.horarios.length} sesiones
                            </span>
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
            })}
        </div>
    );
}