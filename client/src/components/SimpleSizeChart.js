import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { getSizeChartForProduct } from '@/utils/sizeChartData';

const SimpleSizeChart = ({ product, onClose }) => {
  // Get the appropriate size chart data
  const sizeChartData = getSizeChartForProduct(product);

  // If no size chart data is available, show a message
  if (!sizeChartData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Size Guide</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
            aria-label="Close size chart"
          >
            <FaTimes />
          </button>
        </div>
        <p className="text-gray-600">No size information available for this product.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{sizeChartData.title}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black"
          aria-label="Close size chart"
        >
          <FaTimes />
        </button>
      </div>

      {/* Size Chart Table - Fixed Cell Width Version */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {sizeChartData.columns.map((column, index) => (
                <th
                  key={index}
                  className="py-2 px-4 text-left font-medium border border-gray-200 whitespace-nowrap"
                  style={{ minWidth: '85px' }} // Fixed minimum width for all header cells
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeChartData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-2 px-4 border border-gray-200 whitespace-nowrap"
                    style={{ minWidth: '85px' }} // Fixed minimum width for all data cells
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleSizeChart;