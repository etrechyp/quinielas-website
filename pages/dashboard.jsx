import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Usuario from '@/layout/Usuario';
import Partidos from '@/layout/Partidos';
import Torneos from '@/layout/Torneos';
import MiQuiniela from '@/layout/MiQuiniela';
import Posiciones from '@/layout/Posiciones'

const Dashboard = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState('Partidos');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} activeComponent={activeComponent} handleComponentChange={handleComponentChange} />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-4 sm:px-6">
            {activeComponent === 'Partidos' && <Partidos />}
            {activeComponent === 'Torneos' && <Torneos />}
            {activeComponent === 'MiQuiniela' && <MiQuiniela />}
            {activeComponent === 'Posiciones' && <Posiciones />}
            {activeComponent === 'Usuario' && <Usuario />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
