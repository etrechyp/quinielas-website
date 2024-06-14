import React, { useState, useEffect } from 'react';
import Pronostico from '../components/Pronostico';

const MiQuiniela = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState({});
  const [predicciones, setPredicciones] = useState({});

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await fetch('./api/partidos');
        if (!response.ok) {
          throw new Error('Error al obtener los partidos');
        }
        const data = await response.json();
        setPartidos(data.partidos);

        const equipoIds = new Set();
        data.partidos.forEach(partido => {
          equipoIds.add(partido.equipo_a);
          equipoIds.add(partido.equipo_b);
        });

        const equiposData = {};
        await Promise.all(Array.from(equipoIds).map(async id => {
          const res = await fetch(`./api/equipos/${id}`);
          if (!res.ok) {
            throw new Error(`Error al obtener el equipo con id ${id}`);
          }
          const equipoData = await res.json();
          equiposData[id] = equipoData.equipo;
        }));

        setEquipos(equiposData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchPartidos();
  }, []);

  const handleGuardarPredicciones = async () => {
    try {
      const userId = 1; // Usuario de prueba
      const prediccionesArray = Object.entries(predicciones).map(([partidoId, goles]) => ({
        partido_id: partidoId,
        usuario_id: userId,
        goles_equipo_a: goles.equipoA,
        goles_equipo_b: goles.equipoB
      }));

      const response = await fetch('./api/prediccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ predicciones: prediccionesArray })
      });

      if (!response.ok) {
        throw new Error('Error al guardar las predicciones');
      }

      const data = await response.json();
      console.log('Predicciones guardadas:', data);
    } catch (error) {
      console.error('Error al guardar las predicciones:', error);
    }
  };

  if (partidos.length === 0 || Object.keys(equipos).length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Quiniela</h1>
      <Pronostico partidos={partidos} equipos={equipos} predicciones={predicciones} setPredicciones={setPredicciones} />
      <button onClick={handleGuardarPredicciones} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Guardar Predicciones
      </button>
    </div>
  );
};

export default MiQuiniela;
