import React, { useState, useEffect } from 'react';
import { dateFormat } from '@/utils/formatDate';

const CardPartidos = ({ partido }) => {
  const [equipoA, setEquipoA] = useState(null);
  const [equipoB, setEquipoB] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [torneoLogo, setTorneoLogo] = useState(null);
  const { equipo_a, equipo_b, fecha_hora_partido, tipo_partido } = partido;

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const [responseA, responseB] = await Promise.all([
          fetch(`./api/equipos/${equipo_a}`),
          fetch(`./api/equipos/${equipo_b}`)
        ]);

        if (!responseA.ok || !responseB.ok) {
          throw new Error('No se pudo obtener los equipos');
        }

        const [dataA, dataB] = await Promise.all([responseA.json(), responseB.json()]);

        setEquipoA(dataA.equipo);
        setEquipoB(dataB.equipo);
      } catch (error) {
        console.error('Error al obtener los equipos:', error);
      }
    };

    fetchEquipos();
  }, [equipo_a, equipo_b]);

  // Simular resultado cuando el partido ha sido jugado
  useEffect(() => {
    // Aquí deberías tener la lógica para determinar si el partido ha sido jugado
    // y obtener el resultado real de algún lugar (por ejemplo, si lo tienes en el estado del componente padre).

    // Por ahora, simularemos un resultado aleatorio
    const randomGolesA = Math.floor(Math.random() * 5); // Genera un número aleatorio entre 0 y 4
    const randomGolesB = Math.floor(Math.random() * 5); // Genera un número aleatorio entre 0 y 4
    setResultado(`${randomGolesA} - ${randomGolesB}`);
  }, []);

  useEffect(() => {
    const fetchTorneoLogo = async () => {
      try {
        const response = await fetch(`./api/torneos/${partido.torneo_id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el logo del torneo');
        }
        const data = await response.json();
        setTorneoLogo(data.torneo.ruta_imagen);
      } catch (error) {
        console.error('Error al obtener el logo del torneo:', error);
      }
    };

    fetchTorneoLogo();
  }, [partido.torneo_id]);

  if (!equipoA || !equipoB) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white shadow-lg overflow-hidden w-full max-w-sm mx-auto pb-4 relative">
      {torneoLogo && (
        <img src={torneoLogo} alt={`Logo del torneo ${partido.torneo_id}`} className="absolute top-0 right-0 w-14 h-14 mt-1 mr-1" />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-l mb-2">{`${equipoA.nombre} vs ${equipoB.nombre}`}</div>
        <p className="text-gray-700 text-base">
          {dateFormat(fecha_hora_partido)}
        </p>
      </div>
      {resultado && (
        <div className="px-6 pt-4 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={equipoA.ruta_imagen} alt={`Bandera de ${equipoA.nombre}`} className="w-12 h-auto mr-2" />
              <span className="font-bold text-xl">{resultado.split(' ')[0]}</span>
            </div>
            <span className="text-gray-700 font-bold text-xl">vs</span>
            <div className="flex items-center">
              <span className="font-bold text-xl">{resultado.split(' ')[1]}</span>
              <img src={equipoB.ruta_imagen} alt={`Bandera de ${equipoB.nombre}`} className="w-12 h-auto ml-2" />
            </div>
          </div>
        </div>
      )}
      <div className="px-6 text-gray-700 text-center">
        {tipo_partido}
      </div>
    </div>
  );
};

export default CardPartidos;
