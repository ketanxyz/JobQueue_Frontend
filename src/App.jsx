import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import { ToastProvider } from './hooks/useToasts.jsx';
import { API_BASE_URL } from './api/client.js';

export default function App() {
  const [connection, setConnection] = useState('unknown');

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar apiBaseUrl={API_BASE_URL} connection={connection} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard onConnectionChange={setConnection} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
