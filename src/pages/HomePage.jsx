import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Set the workerSrc property to the path of the latest PDF worker file
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

const HomePage = () => {
  const [loadingState, setLoadingState] = useState({ andhra: true, telangana: true });
  const [errorState, setErrorState] = useState({ andhra: null, telangana: null });

  // Define the PDF file paths
  const pdfFiles = {
    "andhra pradesh": {
      latest: "/23_sep_2024.pdf" // Latest Andhra PDF
    },
    "telangana": {
      latest: "/22_sep_2024.pdf" // Latest Telangana PDF
    }
  };

  const onLoadSuccess = useCallback((key) => {
    setLoadingState((prev) => ({ ...prev, [key]: false }));
  }, []);

  const onLoadError = useCallback((key, error) => {
    setErrorState((prev) => ({ ...prev, [key]: error.message }));
    setLoadingState((prev) => ({ ...prev, [key]: false }));
  }, []);

  // Function to determine scale based on window width
  const getScale = () => {
    const width = window.innerWidth;
    if (width < 640) return 0.3; // Small devices
    if (width < 768) return 0.4; // Medium devices
    return 0.5; // Large devices
  };

  const scale = getScale();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Subhodayam Telugu Daily</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Andhra Pradesh PDF */}
        <Link to="/andhra-archive"> {/* Add Link here */}
          <div>
            <h2 className="text-lg font-semibold mb-2 bg-orange-500 text-white p-1 pl-2">ANDHRA PRADESH</h2>
            <div className="border border-gray-300 aspect-[3/4] bg-gray-100 flex items-center justify-center">
              {loadingState.andhra && <p>Loading PDF...</p>}
              {errorState.andhra && <p className="text-red-500">{errorState.andhra}</p>}
              <Document
                file={pdfFiles["andhra pradesh"].latest}
                onLoadSuccess={() => onLoadSuccess('andhra')}
                onLoadError={(error) => onLoadError('andhra', error)}
              >
                <Page 
                  pageNumber={1} 
                  scale={scale} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false} 
                />
              </Document>
            </div>
          </div>
        </Link>

        {/* Telangana PDF */}
        <Link to="/telangana-archive"> {/* Add Link here */}
          <div>
            <h2 className="text-lg font-semibold mb-2 bg-orange-500 text-white p-1 pl-2">TELANGANA</h2>
            <div className="border border-gray-300 aspect-[3/4] bg-gray-100 flex items-center justify-center">
              {loadingState.telangana && <p>Loading PDF...</p>}
              {errorState.telangana && <p className="text-red-500">{errorState.telangana}</p>}
              <Document
                file={pdfFiles["telangana"].latest}
                onLoadSuccess={() => onLoadSuccess('telangana')}
                onLoadError={(error) => onLoadError('telangana', error)}
              >
                <Page 
                  pageNumber={1} 
                  scale={scale} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false} 
                />
              </Document>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
