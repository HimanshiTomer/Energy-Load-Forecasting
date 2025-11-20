import React, { useState, useEffect } from 'react';
import VisualizationSection from '../components/dashboard/VisualizationSection';
import DatasetPreview from '../components/dashboard/DatasetPreview';
import DataTable from '../components/ui/DataTable';
import { visualizationRegistry } from '../data/fileRegistry';
import { overviewStats, dataSplitInfo, modelSpecs, dataSources, metricsExplanation } from '../data/dashboardContent';
import { fetchCsvData } from '../utils/csvHelper';

const DashboardPage = () => {
  const [metricsData, setMetricsData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [stationarityData, setStationarityData] = useState([]);

  useEffect(() => {
    fetchCsvData('/results/evaluations/model_comparison_metrics.csv').then(setMetricsData).catch(console.error);
    fetchCsvData('/results/forecasts/future_forecasts_6months.csv').then(setForecastData).catch(console.error);
    fetchCsvData('/reports/stationarity_tests.csv').then(setStationarityData).catch(console.error);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard for Energy Load Forecasting - Comparison between Time Series Models</h1>

      <section id="overview" className="content-section" style={{marginTop: '20px'}}>
        <h2 className="section-heading">Overview Statistics</h2>
        <div className="stats-grid">
          {overviewStats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="specs" className="content-section">
        <h2 className="section-heading">Data Split Information</h2>
        <div className="split-grid">
          {dataSplitInfo.map((item, idx) => (
            <div key={idx} className="info-card">
              <h3 className="card-heading">{item.title}</h3>
              <p><strong>Period:</strong> {item.period}</p>
              <p><strong>Months:</strong> {item.months}</p>
              <p><strong>Percentage:</strong> {item.pct}</p>
              <p className="highlight-text"><em>{item.purpose}</em></p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-heading">Model Specifications</h2>
        <div className="specs-grid">
          {modelSpecs.map((model, idx) => (
            <div key={idx} className="spec-card">
              <h3 className="card-heading">{model.name}</h3>
              <p className="sub-heading">{model.fullName}</p>
              <ul className="spec-list">
                {model.details.map((d, i) => (
                  <li key={i}><strong>{d.label}:</strong> {d.value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div id="performance">
        <section className="content-section">
          <h2 className="section-heading">Test Set Performance Results</h2>
          <DataTable data={metricsData.filter(r => r.Model && r.Model.includes('Test'))} />
        </section>

        <section className="content-section">
          <h2 className="section-heading">Validation Set Performance Results</h2>
          <DataTable data={metricsData.filter(r => r.Model && r.Model.includes('Validation'))} />
        </section>
      </div>

      <section id="forecasts" className="content-section">
        <h2 className="section-heading">6-Month Future Forecasts</h2>
        <DataTable data={forecastData} />
      </section>

      <section className="content-section">
        <h2 className="section-heading">Statistical Diagnostics (Stationarity)</h2>
        <DataTable data={stationarityData} />
      </section>

      <section className="content-section">
        <h2 className="section-heading">Viewable Datasets</h2>
        <DatasetPreview />
      </section>

      <div id="visualizations" className="visualizations-wrapper">
        {Object.entries(visualizationRegistry).map(([category, items]) => (
          <VisualizationSection 
            key={category} 
            title={category} 
            items={items} 
          />
        ))}
      </div>

      <section className="content-section highlight-section">
        <h2 className="section-heading" style={{borderLeft:'none', textAlign:'left', fontSize:'1.8rem'}}>
            Best Model Analysis
        </h2>
        
        <div className="best-model-content">
          {metricsData.length > 0 ? (
            (() => {
              const testMetrics = metricsData.filter(r => r.Model && r.Model.includes('Test'));
              const bestModel = testMetrics.sort((a, b) => parseFloat(a.MAE) - parseFloat(b.MAE))[0];
              if (!bestModel) return <p>Calculating best model...</p>;
              const modelName = bestModel.Model.replace('_Test', '').replace('_Validation', '');
              return (
                <div style={{padding: '0 10px'}}>
                  <div style={{marginBottom: '40px'}}>
                     <h3 style={{fontSize: '3rem', margin: '0 0 0 0', fontWeight: '500', letterSpacing:'-1px'}}>{modelName}</h3>
                     <div style={{display:'inline-block', background:'rgba(77, 77, 77, 0.2)', borderRadius:'20px', padding:'5px 15px', fontSize:'0.9rem'}}>
                        Selected based on lowest Mean Absolute Error (MAE) on Test Data
                     </div>
                  </div>
                  <div style={{
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                      gap: '20px',
                      textAlign: 'left'
                  }}>
                    <div style={{background:'rgba(51, 51, 51, 0.1)', padding:'25px', borderRadius:'16px', backdropFilter:'blur(5px)', border:'1px solid rgba(255,255,255,0.1)'}}>
                        <div style={{fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'1px', opacity:0.8, marginBottom:'5px'}}>Mean Absolute Error</div>
                        <div style={{fontSize:'1.8rem', fontWeight:'500'}}>{parseFloat(bestModel.MAE).toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
                        <div style={{fontSize:'0.8rem', opacity:0.6, marginTop:'5px'}}>Avg. error in MW units</div>
                    </div>
                    <div style={{background:'rgba(51, 51, 51, 0.1)', padding:'25px', borderRadius:'16px', backdropFilter:'blur(5px)', border:'1px solid rgba(255,255,255,0.1)'}}>
                        <div style={{fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'1px', opacity:0.8, marginBottom:'5px'}}>RMSE</div>
                        <div style={{fontSize:'1.8rem', fontWeight:'500'}}>{parseFloat(bestModel.RMSE).toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
                        <div style={{fontSize:'0.8rem', opacity:0.6, marginTop:'5px'}}>Penalizes large errors</div>
                    </div>
                    <div style={{background:'rgba(51, 51, 51, 0.1)', padding:'25px', borderRadius:'16px', backdropFilter:'blur(5px)', border:'1px solid rgba(255,255,255,0.1)'}}>
                        <div style={{fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'1px', opacity:0.8, marginBottom:'5px'}}>MAPE</div>
                        <div style={{fontSize:'1.8rem', fontWeight:'500'}}>{parseFloat(bestModel.MAPE).toFixed(2)}%</div>
                        <div style={{fontSize:'0.8rem', opacity:0.6, marginTop:'5px'}}>Percentage error</div>
                    </div>
                    <div style={{background:'rgba(51, 51, 51, 0.1)', padding:'25px', borderRadius:'16px', backdropFilter:'blur(5px)', border:'1px solid rgba(255,255,255,0.1)'}}>
                        <div style={{fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'1px', opacity:0.8, marginBottom:'5px'}}>R² Score</div>
                        <div style={{fontSize:'1.8rem', fontWeight:'500'}}>
                            {bestModel.R2_Score ? parseFloat(bestModel.R2_Score).toFixed(4) : 'N/A'}
                        </div>
                        <div style={{fontSize:'0.8rem', opacity:0.6, marginTop:'5px'}}>Variance explained (max 1.0)</div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <p style={{padding:'40px', fontSize:'1.2rem', opacity:0.7}}>Loading Model Performance Metrics...</p>
          )}
        </div>
      </section>

      <section className="content-section">
        <div className="info-split">
          <div>
            <h3 className="sub-section-heading">Data Sources Description</h3>
            <ul className="simple-list">
              {dataSources.map((src, i) => (
                <li key={i}><strong>{src.title}:</strong> {src.source} ({src.unit})</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sub-section-heading">Metrics Explanation</h3>
            <ul className="simple-list">
              {metricsExplanation.map((m, i) => (
                <li key={i}><strong>{m.acronym}:</strong> {m.desc}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DashboardPage;