import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', color: '#888', fontSize: '0.85rem', borderTop: '1px solid #eee' }}>
      <p>© {new Date().getFullYear()} Energy Analytics Dashboard. Made by Himanshi Tomer, 05214002023, BCA (2023-26), Shift-1.</p>
    </footer>
  );
};

export default Footer;