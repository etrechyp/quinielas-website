import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Alert from './Alert';

const Navbar = ({ handleLogout, activeComponent, handleComponentChange }) => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => {
    setLogoutAlert(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('isLoggedIn');
    handleLogout();
    router.push('/');
    setLogoutAlert(false);
  };

  const handleLogoutCancel = () => {
    setLogoutAlert(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="text-white font-bold text-xl cursor-pointer">Mi Aplicación</div>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-4">
              <div
                className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  activeComponent === 'Partidos' ? 'bg-gray-900' : ''
                }`}
                onClick={() => handleComponentChange('Partidos')}
              >
                Partidos
              </div>
              <div
                className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  activeComponent === 'Torneos' ? 'bg-gray-900' : ''
                }`}
                onClick={() => handleComponentChange('Torneos')}
              >
                Torneos
              </div>
              <div
                className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  activeComponent === 'MiQuiniela' ? 'bg-gray-900' : ''
                }`}
                onClick={() => handleComponentChange('MiQuiniela')}
              >
                Mi Quiniela
              </div>
              <div
                className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  activeComponent === 'Posiciones' ? 'bg-gray-900' : ''
                }`}
                onClick={() => handleComponentChange('Posiciones')}
              >
                Posiciones
              </div>
              <div
                className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  activeComponent === 'Usuario' ? 'bg-gray-900' : ''
                }`}
                onClick={() => handleComponentChange('Usuario')}
              >
                Usuario
              </div>
            </div>
            <div className="ml-4">
              <button
                onClick={handleLogoutClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {logoutAlert && (
        <Alert
          message={{
            title: '¿Cerrar sesión?',
            content: '¿Estás seguro de que quieres cerrar tu sesión?',
            confirmText: 'Cerrar sesión',
            cancelText: 'Cancelar'
          }}
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </nav>
  );
};

export default Navbar;
