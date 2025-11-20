import React, { useState } from 'react';
import { FaExpand, FaDownload, FaTimes } from 'react-icons/fa';

const VisualizationCard = ({ title, src }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div className="card-container">
        <div className="card-image-wrapper">
          <img 
            src={src} 
            alt={title} 
            className="card-image"
          />
          
          <div className="card-overlay">
            <button 
              onClick={() => setIsFullscreen(true)}
              title="View Fullscreen"
              className="overlay-btn"
            >
              <FaExpand />
            </button>
            <a 
              href={src} 
              download 
              title="Download Image"
              className="overlay-btn"
            >
              <FaDownload />
            </a>
          </div>
        </div>

        <div className="card-caption">
          <h4 className="card-title">{title}</h4>
        </div>
      </div>

      {isFullscreen && (
        <div 
          className="modal-backdrop"
          onClick={() => setIsFullscreen(false)}
        >
          <div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'center'}}>
            <img 
              src={src} 
              alt={title} 
              className="modal-image"
              onClick={(e) => e.stopPropagation()} 
            />
            <button 
              onClick={() => setIsFullscreen(false)}
              className="modal-close-btn"
            >
              <FaTimes />
            </button>
          </div>
          <h3 className="modal-title">{title}</h3>
        </div>
      )}
    </>
  );
};

export default VisualizationCard;