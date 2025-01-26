import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src="/logo.png" alt="Logo" className="header-logo" />
        <h1 className="header-title">Inventory Management</h1>
      </div>
    </header>
  );
}
