import React, { useState, useEffect } from 'react';
import { FaDownload, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import DataTable from '../components/ui/DataTable';
import { rawDataRegistry } from '../data/fileRegistry';
import { fetchCsvData } from '../utils/csvHelper';

const RawDataPage = () => {
  const [activeTabId, setActiveTabId] = useState(rawDataRegistry[0].id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
   const [modal, setModal] = useState({ show: false, type: null, dataset: null });
  const activeDataset = rawDataRegistry.find(d => d.id === activeTabId);

  useEffect(() => {
    if (activeDataset) {
      setLoading(true);
      fetchCsvData(activeDataset.path)
        .then(res => {
          setData(res);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [activeDataset]);

  const handleActionClick = () => {
    if (activeDataset.type === 'redirect') {
      setModal({ 
        show: true, 
        type: 'redirect', 
        dataset: activeDataset 
      });
    } else {
      setModal({ 
        show: true, 
        type: 'download', 
        dataset: activeDataset 
      });
    }
  };

  const confirmAction = () => {
    if (modal.type === 'redirect') {
      window.open(modal.dataset.sourceUrl, '_blank');
    }
    else {
      const link = document.createElement('a');
      link.href = modal.dataset.path;
      link.download = `${modal.dataset.id}_data.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    closeModal();
  };

  const closeModal = () => setModal({ show: false, type: null, dataset: null });

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Raw Data Repository</h1>
      <div className="tabs-container">
        {rawDataRegistry.map(ds => (
          <button
            key={ds.id}
            className={`tab-btn ${activeTabId === ds.id ? 'active' : ''}`}
            onClick={() => setActiveTabId(ds.id)}
          >
            {ds.name}
          </button>
        ))}
      </div>

      <div className="content-section">
        <div className="dataset-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h2 style={{margin: 0, color: '#346fad'}}>{activeDataset.name}</h2>
            <p style={{margin: '5px 0 0 0', color: '#666'}}>
              {activeDataset.type === 'redirect' ? 'External Source' : 'Local Dataset'} • {loading ? '...' : `${data.length} Records`}
            </p>
          </div>
          
          <button className="btn-primary" onClick={handleActionClick}>
            {activeDataset.type === 'redirect' ? <FaExternalLinkAlt /> : <FaDownload />}
            {activeDataset.type === 'redirect' ? 'Go to Source' : 'Download CSV'}
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading Raw Data...</p>
        ) : (
          <DataTable data={data} />
        )}
      </div>

      {modal.show && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="custom-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={closeModal}><FaTimes /></button>
            
            <h3 className="modal-heading">
              {modal.type === 'redirect' ? 'External Redirect' : 'Confirm Download'}
            </h3>
            
            <div className="modal-body">
              {modal.type === 'redirect' ? (
                <p>
                  You are about to leave the dashboard and visit the official source at:<br/>
                  <strong style={{color: '#346fad', display:'block', margin:'10px 0', wordBreak: 'break-all'}}>
                    {modal.dataset.sourceUrl}
                  </strong>
                  Are you sure you want to proceed?
                </p>
              ) : (
                <p>
                  Are you sure you want to download <strong>{modal.dataset.name}</strong>?
                </p>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={confirmAction}>
                {modal.type === 'redirect' ? 'Yes, Proceed' : 'Yes, Download'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawDataPage;