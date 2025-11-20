import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { MdStorage } from 'react-icons/md';
import {ImTable2} from "react-icons/im";
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (id) => {
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 100);
    } else {
      scrollToElement();
    }
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <img 
            src="/logo192_light.png" 
            alt="Logo" 
            className="header-logo-img"
          />
          <span className="header-title">Energy Forecasting Dashboard</span>
           </Link>
           <div className="nav-divider"></div>

        <nav className="nav-links">
          <button onClick={() => handleScroll('overview')} className="nav-item">
            Overview
          </button>
          <button onClick={() => handleScroll('performance')} className="nav-item">
            Performance
          </button>
          <button onClick={() => handleScroll('visualizations')} className="nav-item">
            Visualizations
          </button>
        </nav>
      </div>

      <nav className="nav-links">
        <div className="nav-divider"></div>
        
        <Link to="/raw-data" className="nav-item">
              {/* <MdStorage size={18} /> */}
            
              <ImTable2 size={18} />
          <span>View Datasets</span>
        </Link>

        <a 
          href="https://github.com/HimanshiTomer/Energy-Load-Forecasting" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-item"
          title="Source Code"
        >
              <FaGithub size={18} />
              View Repository
        </a>
      </nav>
    </header>
  );
};

export default Header;