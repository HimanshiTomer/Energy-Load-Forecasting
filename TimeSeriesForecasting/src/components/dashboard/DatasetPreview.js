import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../ui/DataTable';
import { datasetRegistry } from '../../data/fileRegistry';
import { fetchCsvData } from '../../utils/csvHelper';

const DatasetPreview = () => {
  const [selectedId, setSelectedId] = useState(datasetRegistry[0].id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const datasetInfo = datasetRegistry.find(d => d.id === selectedId);
      if (datasetInfo) {
        try {
          const csvData = await fetchCsvData(datasetInfo.path);
          setData(csvData);
        } catch (error) {
          console.error("Error loading CSV:", error);
          setData([]);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [selectedId]);

  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0056b3' }}>Data Explorer</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>Select a dataset to preview</p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select 
            value={selectedId} 
            onChange={(e) => setSelectedId(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', borderColor: '#ddd', minWidth: '200px' }}
          >
            {datasetRegistry.map(ds => (
              <option key={ds.id} value={ds.id}>{ds.name}</option>
            ))}
          </select>
          
          <Link 
            to={`/dataset/${selectedId}`}
            style={{ 
              background: '#0056b3', color: 'white', padding: '10px 20px', 
              borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' 
            }}
          >
            View Full Dataset
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <DataTable data={data} limit={10} />
      )}
    </div>
  );
};

export default DatasetPreview;