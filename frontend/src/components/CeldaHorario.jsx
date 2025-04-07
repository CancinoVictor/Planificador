function CeldaHorario({ dia, hora, materiasEnHorario }) {
    const materia = materiasEnHorario.find(
        m => m.dia === dia && m.horaInicio === hora
    );

    return (
        <td className="h-16 border text-center align-top">
            {materia ? (
                <div className="bg-green-200 rounded p-1 text-sm">
                    {materia.nombre}
                </div>
            ) : null}
        </td>
    );
}

export default CeldaHorario;
