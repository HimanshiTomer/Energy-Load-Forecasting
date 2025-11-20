import React from 'react';
import VisualizationCard from './VisualizationCard';

const VisualizationSection = ({ title, items }) => {
  return (
    <section className="viz-section">
      <h2 className="section-title">{title}</h2>
      
      <div className="viz-grid">
        {items.map((item, index) => (
          <VisualizationCard 
            key={index} 
            title={item.title} 
            src={item.src} 
          />
        ))}
      </div>
    </section>
  );
};

export default VisualizationSection;