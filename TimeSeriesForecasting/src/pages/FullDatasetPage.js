import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import DataTable from '../components/ui/DataTable';
import { datasetRegistry } from '../data/fileRegistry';
import { fetchCsvData } from '../utils/csvHelper';

const FullDatasetPage = () => {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const datasetInfo = datasetRegistry.find(d => d.id === datasetId);

  useEffect(() => {
    if (datasetInfo) {
      fetchCsvData(datasetInfo.path).then(res => {
        setData(res);
        setLoading(false);
      });
    }
  }, [datasetInfo]);

  if (!datasetInfo) return <h2>Dataset not found</h2>;

  return (
    <div>
      <button 
        onClick={() => navigate(-1)}
        style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', background: 'none', 
          border: 'none', color: '#0056b3', cursor: 'pointer', fontSize: '1rem', marginBottom: '20px' 
        }}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{datasetInfo.name}</h1>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>{data.length} rows loaded</p>
        </div>

        {loading ? <p>Loading full dataset...</p> : <DataTable data={data} />}
      </div>
    </div>
  );
};

export default FullDatasetPage;