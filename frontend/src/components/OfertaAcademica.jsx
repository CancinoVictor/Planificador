// components/OfertaAcademica.jsx
export default function OfertaAcademica({ materias, onAgregarMateria }) {
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
            "bg-pink-200": "border-l-4 border-pink-500"
        }
    };

    return (
        <div className="space-y-3">
            {materias.map((materia) => (
                <div
                    key={materia.id}
                    className={`
                        ${cardStyles.base} 
                        ${cardStyles.hover}
                        ${materia.color} 
                        ${cardStyles.colors[materia.color] || ''}
                        shadow-sm
                    `}
                    onClick={() => onAgregarMateria(materia)}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                                {materia.nombre}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                                <span className="font-medium">{materia.profesor}</span> | {materia.clave}
                            </p>
                        </div>
                        <span className="bg-white/80 text-xs px-2 py-1 rounded-full text-gray-700">
                            {materia.dias.length} días
                        </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/80 text-gray-700">
                            🕒 {materia.horaInicio} - {materia.horaFin}
                        </span>
                        <span className="text-xs text-gray-500">
                            {materia.dias.join(", ")}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}