import React from 'react';
import { useRouter } from 'next/router';
import { dateFormat } from '@/utils/formatDate';

const CardTorneos = ({ torneo }) => {
  const router = useRouter();
  const { torneo_id, nombre, fecha_inicio, fecha_fin, ruta_imagen } = torneo;

  const handleCardClick = () => {
    console.log('partidos por torneo');
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto">
      <div className="flex justify-center">
        <img src={ruta_imagen} alt={`Logo de ${nombre}`} className="w-72 h-48 object-cover" />
      </div>
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{nombre}</div>
        <p className="text-gray-700 text-base">
          Inicio: {dateFormat(fecha_inicio)}
        </p>
        <p className="text-gray-700 text-base">
          Final: {dateFormat(fecha_fin)}
        </p>
      </div>
    </div>
  );
};

export default CardTorneos;
