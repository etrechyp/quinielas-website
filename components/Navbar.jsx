// layout/common/Navbar.js

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="text-white font-bold text-xl">Mi Aplicación</div>
            </Link>
          </div>
          <div className="flex">
            <Link href="/dashboard">
              <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</div>
            </Link>
            {/* Agrega más enlaces del navbar según sea necesario */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
