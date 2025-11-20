import React, { useState, useMemo, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const DataTable = ({ data, limit = null }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, searchTerm, rowsPerPage]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const processedData = useMemo(() => {
    let items = [...data];
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      items = items.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(lowerTerm)
        )
      );
    }
    if (sortConfig.key !== null && sortConfig.direction !== null) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [data, sortConfig, searchTerm]);

  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  
  const displayData = limit 
    ? processedData.slice(0, limit) 
    : processedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') {
        setSortConfig({ key: null, direction: null });
        return;
      }
    }
    setSortConfig({ key, direction });
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (!data || data.length === 0) return <p className="table-info">No records found.</p>;

  return (
    <div className="table-wrapper">
      <div className="table-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-count">
          {totalItems} records found
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} onClick={() => handleSort(header)}>
                <div className="th-content">
                  {header}
                  {sortConfig.key === header ? (
                    sortConfig.direction === 'asc' ? <FaSortUp className="sort-icon active"/> : <FaSortDown className="sort-icon active"/>
                  ) : (
                    <FaSort className="sort-icon"/>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((row, idx) => (
              <tr key={idx}>
                {headers.map((col, cIdx) => (
                  <td key={cIdx}>{row[col]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr><td colSpan={headers.length} style={{textAlign:'center', padding:'20px'}}>No matching records</td></tr>
          )}
        </tbody>
      </table>

      {!limit && totalItems > 0 && (
        <div className="pagination-container">
          <div className="rows-selector">
            <span>Rows per page:</span>
            <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="page-controls">
            <span className="page-info">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            
            <div className="page-buttons">
              <button 
                className="pg-btn" 
                onClick={() => changePage(1)} 
                disabled={currentPage === 1} 
                title="First Page"
              >
                <FaAngleDoubleLeft />
              </button>
              <button 
                className="pg-btn" 
                onClick={() => changePage(currentPage - 1)} 
                disabled={currentPage === 1}
                title="Previous"
              >
                <FaChevronLeft />
              </button>
              <button 
                className="pg-btn" 
                onClick={() => changePage(currentPage + 1)} 
                disabled={currentPage === totalPages}
                title="Next"
              >
                <FaChevronRight />
              </button>
              <button 
                className="pg-btn" 
                onClick={() => changePage(totalPages)} 
                disabled={currentPage === totalPages}
                title="Last Page"
              >
                <FaAngleDoubleRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {limit && displayData.length > 0 && (
        <div className="table-info">Showing top {limit} results</div>
      )}
    </div>
  );
};

export default DataTable;