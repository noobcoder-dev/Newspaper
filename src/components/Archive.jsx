import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';

// Set the workerSrc property to the path of the latest PDF worker file
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

const Archive = ({ state, currentMonth, currentYear, setCurrentMonth, days, months }) => {
  const navigate = useNavigate();

  const pdfFiles = {
    "andhra pradesh": {
      first: "/23_sep_2024.pdf",
      second: "/22_sep_2024.pdf"
    },
    "telangana": {
      first: "/17_sep_2024.pdf",
      second: "/14_sep_2024.pdf"
    }
  };

  const handleOpenViewer = (pdfFile) => {
    navigate('/news-viewer', { state: { pdfFile } });
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Archive - {state.toUpperCase()}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* First PDF */}
        <div 
          className="bg-white p-4 rounded-lg shadow flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105" 
          onClick={() => handleOpenViewer(pdfFiles[state].first)}
        >
          <div className="flex justify-center items-center mb-4 w-full h-48 md:h-64 overflow-hidden">
            <Document
              file={pdfFiles[state].first}
              onLoadSuccess={() => {}}
              onLoadError={() => {}}
            >
              <Page 
                pageNumber={1} 
                scale={0.5} 
                renderTextLayer={false} 
                renderAnnotationLayer={false} 
                width={300}
              />
            </Document>
          </div>
          <div className="text-center mt-2">
            <p className="text-base md:text-lg font-bold">E Paper {state === 'andhra pradesh' ? '23' : '17'} Sep 2024</p>
          </div>
        </div>

        {/* Second PDF */}
        <div 
          className="bg-white p-4 rounded-lg shadow flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105" 
          onClick={() => handleOpenViewer(pdfFiles[state].second)}
        >
          <div className="flex justify-center items-center mb-4 w-full h-48 md:h-64 overflow-hidden">
            <Document
              file={pdfFiles[state].second}
              onLoadSuccess={() => {}}
              onLoadError={() => {}}
            >
              <Page 
                pageNumber={1} 
                scale={0.5} 
                renderTextLayer={false} 
                renderAnnotationLayer={false} 
                width={300}
              />
            </Document>
          </div>
          <div className="text-center mt-2">
            <p className="text-base md:text-lg font-bold">E Paper {state === 'andhra pradesh' ? '22' : '14'} Sep 2024</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-4">
        <Calendar
          currentMonth={currentMonth}
          currentYear={currentYear}
          setCurrentMonth={setCurrentMonth}
          days={days}
          months={months}
        />
      </div>

      {/* Optional Pagination */}
      <div className="flex flex-wrap justify-center mt-4 space-x-1 md:space-x-2">
        {['First', '«', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '»', 'Last'].map((item, index) => (
          <button 
            key={index} 
            className="px-2 py-1 bg-white rounded hover:bg-gray-200 transition mb-2 text-sm md:text-base"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Archive; 