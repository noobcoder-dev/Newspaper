import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TelanganaArchivePage from './pages/TelanganaArchivePage';
import AndhraArchivePage from './pages/AndhraArchivePage';
import AdminLoginPage from './pages/AdminLoginPage';
import NewsViewerPage from './pages/NewsViewerPage';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          
          <Route path="/" element={<HomePage/>} />
          <Route path="/telangana-archive" element={<TelanganaArchivePage />} />
          <Route path="/andhra-archive" element={<AndhraArchivePage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/news-viewer" element={<NewsViewerPage />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
