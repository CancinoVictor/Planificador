// components/Horario.jsx
export default function Horario({ materiasEnHorario, onEliminarMateria }) {
    // Configuración
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    // Generación de bloques de 50 minutos
    const generarBloques = () => {
        const bloques = [];

        // Turno matutino: 7:30 - 13:20
        let hora = 7;
        let minuto = 30;
        while (hora < 13 || (hora === 13 && minuto < 20)) {
            const inicio = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            minuto += 50;
            if (minuto >= 60) {
                hora += Math.floor(minuto / 60);
                minuto = minuto % 60;
            }
            const fin = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            if ((hora === 13 && minuto > 20) || hora > 13) {
                bloques.push({ inicio, fin: "13:20", turno: "matutino" });
                break;
            }
            bloques.push({ inicio, fin, turno: "matutino" });
        }

        // Turno vespertino: 16:30 - 21:30
        hora = 16;
        minuto = 30;
        while (hora < 21 || (hora === 21 && minuto < 30)) {
            const inicio = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            minuto += 50;
            if (minuto >= 60) {
                hora += Math.floor(minuto / 60);
                minuto = minuto % 60;
            }
            const fin = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            if ((hora === 21 && minuto > 30) || hora > 21) {
                bloques.push({ inicio, fin: "21:30", turno: "vespertino" });
                break;
            }
            bloques.push({ inicio, fin, turno: "vespertino" });
        }

        return bloques;
    };

    const bloques = generarBloques();

    // Estilos personalizados para materias
    const materiaStyles = {
        default: "border-l-4 border-white shadow-sm",
        colors: {
            "bg-blue-200": "border-blue-500",
            "bg-green-200": "border-green-500",
            "bg-yellow-200": "border-yellow-500",
            "bg-red-200": "border-red-500",
            "bg-purple-200": "border-purple-500",
            "bg-pink-200": "border-pink-500"
        }
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full bg-white text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="w-28 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                            Horario
                        </th>
                        {diasSemana.map(dia => (
                            <th
                                key={dia}
                                className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]"
                            >
                                {dia}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {bloques.map((bloque, index) => (
                        <tr
                            key={index}
                            className={bloque.turno === "vespertino" && index === bloques.findIndex(b => b.turno === "vespertino") ? "border-t-2 border-gray-300" : ""}
                        >
                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-500 sticky left-0 bg-white z-10">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{bloque.inicio}</span>
                                    <span className="text-gray-400">{bloque.fin}</span>
                                </div>
                            </td>

                            {diasSemana.map(dia => {
                                const materia = materiasEnHorario.find(m =>
                                    m.dias.includes(dia) &&
                                    ((toMinutes(m.horaInicio) < toMinutes(bloque.fin)) &&
                                        (toMinutes(m.horaFin) > toMinutes(bloque.inicio)))
                                );

                                return (
                                    <td
                                        key={`${dia}-${index}`}
                                        className="px-0 py-0 align-top h-20 min-w-[150px] relative group"
                                    >
                                        {materia && (
                                            <div className={`
                          ${materia.color} ${materiaStyles.colors[materia.color] || materiaStyles.default}
                          absolute inset-1 flex flex-col justify-between
                          rounded-md p-1 overflow-hidden
                          transition-all duration-100
                          hover:shadow-md hover:z-10
                        `}>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-semibold text-xs leading-tight line-clamp-1">
                                                        {materia.nombre}
                                                    </h4>
                                                    <p className="text-[0.65rem] text-gray-700 leading-tight">
                                                        {materia.horaInicio} - {materia.horaFin}
                                                    </p>
                                                    <p className="text-[0.6rem] text-gray-600 line-clamp-1">
                                                        {materia.profesor}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEliminarMateria(materia.id);
                                                    }}
                                                    className={`
                              absolute top-0 right-0 m-1 p-0.5
                              text-xs text-gray-500 hover:text-red-600
                              bg-white/80 rounded-full
                              opacity-0 group-hover:opacity-100
                              transition-opacity duration-200
                              w-5 h-5 flex items-center justify-center
                              shadow-sm hover:shadow-md
                            `}
                                                    aria-label="Eliminar"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Función auxiliar para convertir tiempo a minutos
function toMinutes(time) {
    const [hh, mm] = time.split(":").map(Number);
    return hh * 60 + mm;
}