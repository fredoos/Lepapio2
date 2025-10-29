import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminMenu from './components/AdminMenu';
import './index.css';

ReactDOM.createRoot(document.getElementById('admin-menu-root')!).render(
  <React.StrictMode>
    <AdminMenu />
  </React.StrictMode>
);
