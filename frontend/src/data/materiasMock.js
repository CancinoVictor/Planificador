// src/data/materiasMock.js
export const materiasMock = [
    {
        id: 1,
        nombre: "Matemáticas Avanzadas",
        profesor: "Dr. Carlos Méndez",
        clave: "MAT301",
        horarios: [
            { dia: "Lunes", horaInicio: "7:30", horaFin: "9:10" },
            { dia: "Miércoles", horaInicio: "7:30", horaFin: "9:10" },
            { dia: "Viernes", horaInicio: "7:30", horaFin: "9:10" }
        ],
        color: "bg-blue-200"
    },
    {
        id: 2,
        nombre: "Programación Orientada a Objetos",
        profesor: "Ing. Laura Torres",
        clave: "ISC202",
        horarios: [
            { dia: "Martes", horaInicio: "10:00", horaFin: "11:40" },
            { dia: "Jueves", horaInicio: "8:20", horaFin: "10:00" } // Horario diferente en jueves
        ],
        color: "bg-green-200"
    },
    {
        id: 3,
        nombre: "Base de Datos I",
        profesor: "Mtra. Ana Rodríguez",
        clave: "ISC203",
        horarios: [
            { dia: "Lunes", horaInicio: "11:40", horaFin: "13:20" },
            { dia: "Miércoles", horaInicio: "10:00", horaFin: "11:40" } // Horario diferente en miércoles
        ],
        color: "bg-yellow-200"
    },
    {
        id: 4,
        nombre: "Redes de Computadoras",
        profesor: "Ing. Jorge Sánchez",
        clave: "ISC305",
        horarios: [
            { dia: "Martes", horaInicio: "7:30", horaFin: "9:10" },
            { dia: "Jueves", horaInicio: "7:30", horaFin: "9:10" }
        ],
        color: "bg-red-200"
    },
    {
        id: 5,
        nombre: "Inteligencia Artificial",
        profesor: "Dra. Fernanda Castro",
        clave: "ISC401",
        horarios: [
            { dia: "Lunes", horaInicio: "10:00", horaFin: "11:40" },
            { dia: "Viernes", horaInicio: "11:40", horaFin: "13:20" } // Horario diferente en viernes
        ],
        color: "bg-purple-200"
    },
    {
        id: 6,
        nombre: "Inglés Técnico",
        profesor: "Mtro. David Wilson",
        clave: "ING301",
        horarios: [
            { dia: "Martes", horaInicio: "12:30", horaFin: "13:20" },
            { dia: "Jueves", horaInicio: "12:30", horaFin: "13:20" }
        ],
        color: "bg-pink-200"
    },
    {
        id: 7,
        nombre: "Taller de Investigación",
        profesor: "Dr. Roberto Martínez",
        clave: "ADM401",
        horarios: [
            { dia: "Miércoles", horaInicio: "10:00", horaFin: "11:40" },
            { dia: "Viernes", horaInicio: "9:10", horaFin: "10:00" } // Sesión más corta en viernes
        ],
        color: "bg-indigo-200"
    },
    {
        id: 8,
        nombre: "Desarrollo Web Full Stack",
        profesor: "Ing. Miguel Álvarez",
        clave: "ISC405",
        horarios: [
            { dia: "Lunes", horaInicio: "16:30", horaFin: "18:10" },
            { dia: "Miércoles", horaInicio: "17:20", horaFin: "19:00" } // Horario vespertino
        ],
        color: "bg-blue-200"
    },
    {
        id: 9,
        nombre: "Seguridad Informática",
        profesor: "Dr. Javier Morales",
        clave: "ISC407",
        horarios: [
            { dia: "Martes", horaInicio: "18:10", horaFin: "19:50" },
            { dia: "Jueves", horaInicio: "19:50", horaFin: "21:30" } // Horario vespertino con diferente hora
        ],
        color: "bg-red-200"
    }
];