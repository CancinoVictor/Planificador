// src/data/materiasMock.js
export const materiasMock = [
    {
        id: 1,
        nombre: "Matemáticas Avanzadas",
        profesor: "Dr. Carlos Méndez",
        clave: "MAT301",
        horaInicio: "7:30",
        horaFin: "10:00", // 3 bloques (Lunes, Miércoles, Viernes)
        dias: ["Lunes", "Miércoles", "Viernes"],
        color: "bg-blue-200"
    },
    {
        id: 2,
        nombre: "Programación Orientada a Objetos",
        profesor: "Ing. Laura Torres",
        clave: "ISC202",
        horaInicio: "10:00",
        horaFin: "11:40", // 2 bloques (Martes, Jueves)
        dias: ["Martes", "Jueves"],
        color: "bg-green-200"
    },
    {
        id: 3,
        nombre: "Base de Datos I",
        profesor: "Mtra. Ana Rodríguez",
        clave: "ISC203",
        horaInicio: "11:40",
        horaFin: "13:20", // 2 bloques (Lunes, Miércoles)
        dias: ["Lunes", "Miércoles"],
        color: "bg-yellow-200"
    },
    {
        id: 4,
        nombre: "Redes de Computadoras",
        profesor: "Ing. Jorge Sánchez",
        clave: "ISC305",
        horaInicio: "7:30",
        horaFin: "9:10", // 2 bloques (Martes, Jueves)
        dias: ["Martes", "Jueves"],
        color: "bg-red-200"
    },
    {
        id: 5,
        nombre: "Inteligencia Artificial",
        profesor: "Dra. Fernanda Castro",
        clave: "ISC401",
        horaInicio: "10:00",
        horaFin: "11:40", // 3 bloques (Lunes, Viernes) - Cambiado de Martes a Lunes
        dias: ["Lunes", "Viernes"],
        color: "bg-purple-200"
    },
    {
        id: 6,
        nombre: "Inglés Técnico",
        profesor: "Mtro. David Wilson",
        clave: "ING301",
        horaInicio: "12:30",
        horaFin: "13:20", // 1 bloque (Martes, Jueves)
        dias: ["Martes", "Jueves"],
        color: "bg-pink-200"
    },
    {
        id: 7,
        nombre: "Taller de Investigación",
        profesor: "Dr. Roberto Martínez",
        clave: "ADM401",
        horaInicio: "10:00",
        horaFin: "11:40", // 3 bloques (Miércoles, Viernes) - Horario ajustado
        dias: ["Miércoles"],
        color: "bg-indigo-200"
    }
];