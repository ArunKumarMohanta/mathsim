import React from 'react';

export const Header = ({ title, desc }) => (
  <div className="mb-4">
    <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
    <p className="text-gray-400 mt-2 max-w-3xl leading-relaxed">{desc}</p>
  </div>
);