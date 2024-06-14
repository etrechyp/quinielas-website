import React from 'react';
import { dateNoYearFormat } from '@/utils/formatDate';

const Resultado = {
  EMPATE: 'Empate',
  EQUIPO_A: 'Equipo A',
  EQUIPO_B: 'Equipo B'
};

const Pronostico = ({ partidos, equipos, predicciones, setPredicciones }) => {
  const handleInputChange = (partidoId, equipo, value) => {
    setPredicciones(prevState => ({
      ...prevState,
      [partidoId]: {
        ...prevState[partidoId],
        [equipo]: value
      }
    }));
  };

  const calcularResultado = (partidoId) => {
    const prediccion = predicciones[partidoId];
    if (!prediccion || !prediccion.equipoA || !prediccion.equipoB) {
      return null;
    }

    const golesA = parseInt(prediccion.equipoA, 10);
    const golesB = parseInt(prediccion.equipoB, 10);

    if (isNaN(golesA) || isNaN(golesB)) {
      return null;
    }

    if (golesA === golesB) {
      return Resultado.EMPATE;
    } else if (golesA > golesB) {
      return Resultado.EQUIPO_A;
    } else {
      return Resultado.EQUIPO_B;
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border">Fecha y Hora</th>
          <th className="py-2 px-4 border">Equipo A</th>
          <th className="py-2 px-4 border">Goles Equipo A</th>
          <th className="py-2 px-4 border">Goles Equipo B</th>
          <th className="py-2 px-4 border">Equipo B</th>
          <th className="py-2 px-4 border">Predicción</th>
        </tr>
      </thead>
      <tbody>
        {partidos.map(partido => {
          const equipoA = equipos[partido.equipo_a];
          const equipoB = equipos[partido.equipo_b];

          return (
            <tr key={partido.partido_id}>
              <td className="border px-4 py-2">
                {dateNoYearFormat(partido.fecha_hora_partido)}
              </td>
              <td className="border px-4 py-2 flex items-center">
                <img src={equipoA.ruta_imagen} alt={`Bandera de ${equipoA.nombre}`} className="w-10 h-auto mr-2" />
                {equipoA.nombre}
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={predicciones[partido.partido_id]?.equipoA || ''}
                  onChange={(e) => handleInputChange(partido.partido_id, 'equipoA', e.target.value)}
                  className="w-28 p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={predicciones[partido.partido_id]?.equipoB || ''}
                  onChange={(e) => handleInputChange(partido.partido_id, 'equipoB', e.target.value)}
                  className="w-28 p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2 flex items-center">
                <img src={equipoB.ruta_imagen} alt={`Bandera de ${equipoB.nombre}`} className="w-10 h-auto mr-2" />
                {equipoB.nombre}
              </td>
              <td className="border px-4 py-2">{calcularResultado(partido.partido_id)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Pronostico;
