import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTopBtn from './BackToTopBtn';

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f6f8' }}>
      <Header />
      <main style={{ flex: 1, padding: '20px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>
      <BackToTopBtn />
      <Footer />
    </div>
  );
};

export default Layout;