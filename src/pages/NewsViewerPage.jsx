import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaArrowLeft, FaArrowRight, FaDownload, FaCalendarAlt, FaCrop, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import Calendar from '../components/Calendar'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

export default function NewsViewerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfFile } = location.state || {};
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isMobile, setIsMobile] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isClipping, setIsClipping] = useState(false);
  const [clipStart, setClipStart] = useState({ x: 0, y: 0 });
  const [clipEnd, setClipEnd] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(newPageNumber, numPages));
    });
  };

  const handleZoom = (factor) => {
    setScale((prevScale) => Math.max(0.5, Math.min(prevScale * factor, 2.0)));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfFile;
    link.download = 'newspaper.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleArchive = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    console.log(`Loading PDF for date: ${date.toDateString()}`);
  };

  const handleClip = () => {
    setIsClipping(!isClipping);
    if (isClipping) {
      const pdfContainer = pdfContainerRef.current;
      if (pdfContainer) {
        html2canvas(pdfContainer).then(canvas => {
          const clipWidth = Math.abs(clipEnd.x - clipStart.x);
          const clipHeight = Math.abs(clipEnd.y - clipStart.y);
          const clipX = Math.min(clipStart.x, clipEnd.x);
          const clipY = Math.min(clipStart.y, clipEnd.y);

          const clippedCanvas = document.createElement('canvas');
          clippedCanvas.width = clipWidth;
          clippedCanvas.height = clipHeight;
          const ctx = clippedCanvas.getContext('2d');
          ctx.drawImage(canvas, clipX, clipY, clipWidth, clipHeight, 0, 0, clipWidth, clipHeight);

          const dataURL = clippedCanvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'clipped_area.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    }
  };

  const handleMouseDown = (e) => {
    if (isClipping) {
      const rect = pdfContainerRef.current.getBoundingClientRect();
      setClipStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isClipping) {
      const rect = pdfContainerRef.current.getBoundingClientRect();
      setClipEnd({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseUp = () => {
    if (isClipping) {
      handleClip();
    }
  };

  if (!pdfFile) {
    return <div className="text-center mt-8">No PDF file specified</div>;
  }

  const ControlButtons = () => (
    <>
      <button onClick={() => handleZoom(1.1)} className="bg-gray-200 p-2 rounded">
        <FaSearchPlus />
      </button>
      <button onClick={() => handleZoom(0.9)} className="bg-gray-200 p-2 rounded">
        <FaSearchMinus />
      </button>
      <button onClick={handleDownload} className="bg-green-500 text-white p-2 rounded">
        <FaDownload />
      </button>
      <button onClick={handleArchive} className="bg-blue-500 text-white p-2 rounded">
        <FaCalendarAlt />
      </button>
      <button onClick={handleClip} className={`bg-purple-500 text-white p-2 rounded ${isClipping ? 'ring-2 ring-purple-300' : ''}`}>
        <FaCrop />
      </button>
    </>
  );

  const ClipOverlay = () => (
    isClipping && (
      <div
        className="absolute border-2 border-purple-500 bg-purple-200 bg-opacity-30 pointer-events-none"
        style={{
          left: Math.min(clipStart.x, clipEnd.x),
          top: Math.min(clipStart.y, clipEnd.y),
          width: Math.abs(clipEnd.x - clipStart.x),
          height: Math.abs(clipEnd.y - clipStart.y),
        }}
      />
    )
  );

  const MobileLayout = () => (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full mb-4"
        >
          <FaArrowLeft className="inline mr-2" /> Back to Archive
        </button>
        <div className="flex justify-between mb-4">
          <ControlButtons />
        </div>
      </div>
      <div className="flex-grow overflow-auto bg-gray-800 relative" ref={pdfContainerRef}>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={window.innerWidth - 32}
          />
        </Document>
        <ClipOverlay />
      </div>
      <div className="bg-white p-4 flex justify-between items-center">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <FaArrowLeft />
        </button>
        <p className="text-lg">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );

  const DesktopLayout = () => (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <FaArrowLeft className="inline mr-2" /> Back to Archive
          </button>
          <div className="space-x-2">
            <ControlButtons />
          </div>
        </div>

        <div className="flex justify-center mb-4 relative" ref={pdfContainerRef}>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          <ClipOverlay />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            <FaArrowLeft className="inline mr-2" /> Previous
          </button>
          <p className="text-lg">
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            Next <FaArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <Calendar onChange={handleDateChange} value={selectedDate} />
            <button 
              onClick={() => setShowCalendar(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}