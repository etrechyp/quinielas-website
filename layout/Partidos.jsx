import React, { useState, useEffect } from 'react';
import CardPartidos from '@/components/CardPartidos';

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await fetch('./api/partidos');
        if (!response.ok) {
          throw new Error('No se pudo obtener los partidos');
        }
        const data = await response.json();
        console.log(partidos)
        setPartidos(data.partidos);
      } catch (error) {
        console.error('Error al obtener los partidos:', error);
      }
    };

    fetchPartidos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Partidos</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partidos.map((partido) => (
          <CardPartidos key={partido.partido_id} partido={partido} />
        ))}
      </div>
    </div>
  );
};

export default Partidos;
