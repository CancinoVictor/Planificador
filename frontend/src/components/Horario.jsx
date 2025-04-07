// components/Horario.jsx
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function Horario({ materiasEnHorario, onEliminarMateria }) {
    // Referencia para la impresión
    const horarioRef = useRef();

    // Configuración
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    // Configurar la función de impresión a PDF
    const handlePrint = useReactToPrint({
        content: () => horarioRef.current,
        documentTitle: 'Mi Horario Académico',
        onAfterPrint: () => console.log('¡Horario exportado a PDF!')
    });

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
            "bg-pink-200": "border-pink-500",
            "bg-indigo-200": "border-indigo-500"
        }
    };

    // Calcular estadísticas
    const totalHoras = materiasEnHorario.reduce((total, materia) => {
        return total + materia.horarios.reduce((subTotal, horario) => {
            const inicioMin = toMinutes(horario.horaInicio);
            const finMin = toMinutes(horario.horaFin);
            return subTotal + (finMin - inicioMin) / 60;
        }, 0);
    }, 0);

    return (
        <div className="flex flex-col space-y-4">
            {/* Controles y estadísticas */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <div className="text-sm">
                    <span className="font-medium">Total: </span>
                    <span>{materiasEnHorario.length} materias</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="font-medium">{totalHoras.toFixed(1)} horas semanales</span>
                </div>
                <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Exportar a PDF
                </button>
            </div>

            {/* Componente de horario para imprimir */}
            <div
                ref={horarioRef}
                className="overflow-auto max-w-full rounded-lg border border-gray-200 shadow-sm"
                style={{ maxHeight: 'calc(100vh - 220px)' }} // Limita la altura para evitar desplazamiento excesivo
            >
                <table className="w-full bg-white text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-16 px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                                Hora
                            </th>
                            {diasSemana.map(dia => (
                                <th
                                    key={dia}
                                    className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                                <td className="px-1 py-1 whitespace-nowrap text-xs font-medium text-gray-500 sticky left-0 bg-white z-10">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{bloque.inicio}</span>
                                        <span className="text-gray-400 text-xs">{bloque.fin}</span>
                                    </div>
                                </td>

                                {diasSemana.map(dia => {
                                    // Encuentra todas las materias que tienen un horario en este día y bloque
                                    const materiasEnEsteBloque = materiasEnHorario.filter(materia => {
                                        return materia.horarios.some(horario =>
                                            horario.dia === dia &&
                                            ((toMinutes(horario.horaInicio) < toMinutes(bloque.fin)) &&
                                                (toMinutes(horario.horaFin) > toMinutes(bloque.inicio)))
                                        );
                                    });

                                    // Si hay alguna materia en este bloque, mostrar la primera
                                    const materia = materiasEnEsteBloque.length > 0 ? materiasEnEsteBloque[0] : null;

                                    // Si hay materia, encontrar su horario específico para este día
                                    const horarioEspecifico = materia
                                        ? materia.horarios.find(h => h.dia === dia)
                                        : null;

                                    return (
                                        <td
                                            key={`${dia}-${index}`}
                                            className="px-0 py-0 align-top h-16 relative group"
                                        >
                                            {materia && horarioEspecifico && (
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
                                                            {horarioEspecifico.horaInicio} - {horarioEspecifico.horaFin}
                                                        </p>
                                                        <p className="text-[0.6rem] text-gray-600 line-clamp-1 hidden sm:block">
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
                                                            print:hidden
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

            {/* Lista de materias para impresión */}
            <div className="hidden print:block mt-4">
                <h3 className="text-lg font-bold mb-2">Lista de Materias</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Nombre</th>
                            <th className="border px-4 py-2 text-left">Profesor</th>
                            <th className="border px-4 py-2 text-left">Clave</th>
                            <th className="border px-4 py-2 text-left">Horarios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiasEnHorario.map(materia => (
                            <tr key={materia.id}>
                                <td className="border px-4 py-2">{materia.nombre}</td>
                                <td className="border px-4 py-2">{materia.profesor}</td>
                                <td className="border px-4 py-2">{materia.clave}</td>
                                <td className="border px-4 py-2">
                                    {materia.horarios.map((h, i) => (
                                        <div key={i}>
                                            {h.dia}: {h.horaInicio} - {h.horaFin}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Función auxiliar para convertir tiempo a minutos
function toMinutes(time) {
    const [hh, mm] = time.split(":").map(Number);
    return hh * 60 + mm;
}