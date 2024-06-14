import React, { useState, useEffect } from 'react';
import CardTorneos from '@/components/CardTorneos';

const Torneos = () => {
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const response = await fetch('./api/torneos');
        if (!response.ok) {
          throw new Error('No se pudo obtener los torneos');
        }
        const data = await response.json();
        setTorneos(data.torneos);
      } catch (error) {
        console.error('Error al obtener los torneos:', error);
      }
    };

    fetchTorneos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Torneos</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {torneos.map((torneo) => (
          <CardTorneos key={torneo.torneo_id} torneo={torneo} />
        ))}
      </div>
    </div>
  );
};

export default Torneos;
