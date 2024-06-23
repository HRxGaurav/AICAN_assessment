import React, { useState } from 'react';
import shortIcon from '../../assets/icon/shortIcon.svg';

const TableComponent = ({ columns, data, enablePagination = true, onDelete, onEdit }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  
  const pageSize = 5;
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handleSort = (column) => {
    if (sortConfig && sortConfig.key === column) {
      setSortConfig({
        key: column,
        direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending',
      });
    } else {
      
      setSortConfig({ key: column, direction: 'ascending' });
    }
  };

  
  const compareValues = (key, direction = 'ascending') => {
    return function (a, b) {
      const valueA = a[key];
      const valueB = b[key];

      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }
      return direction === 'descending' ? comparison * -1 : comparison;
    };
  };
  

  
  const formatDate = (dateString) => {
    
    if (!dateString) return '';

    
    const date = new Date(dateString);
  
    
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
  
    
    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  
    return formattedDate;
  };


  const sortedData = sortConfig ? [...currentData].sort(compareValues(sortConfig.key, sortConfig.direction)) : currentData;

  const handleDelete = (itemId) => {
    onDelete(itemId);
  };

  const handleEdit = (itemId) => {
    onEdit(itemId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {column}
                <button onClick={() => handleSort(column)}><img src={shortIcon} alt="Sort Icon" className="ml-2 -mb-1 w-4 h-4" /></button>
              </th>
            ))}
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4 whitespace-nowrap text-center">
                  {column === 'Date of Birth' ? formatDate(row[column]) : row[column]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                
                <button onClick={() => handleEdit(row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {enablePagination && (
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="mr-2">Page:</span>
            {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-full ${currentPage === i + 1 ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-100`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div>
            <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)} of {data.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
