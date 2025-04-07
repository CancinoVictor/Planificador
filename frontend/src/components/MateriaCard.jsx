function MateriaCard({ materia }) {
    return (
        <div className="bg-blue-100 p-2 rounded shadow cursor-pointer">
            <p className="font-bold">{materia.nombre}</p>
            <p className="text-sm">{materia.clave}</p>
            <p className="text-sm">{materia.profesor}</p>
        </div>
    );
}

export default MateriaCard; 