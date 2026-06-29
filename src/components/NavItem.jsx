import React from 'react';

export const NavItem = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);