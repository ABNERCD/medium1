import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/Header'; // <-- IMPORTA EL HEADER

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* <-- AÑADE EL HEADER AQUÍ */}
      <main className="py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;