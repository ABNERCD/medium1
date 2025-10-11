import React from 'react';
import { Link } from 'react-router-dom';

// Pequeños componentes para los iconos de características
const FeatureIcon = ({ icon }: { icon: string }) => (
  <div className="bg-gray-800 p-4 rounded-full mb-4">
    <i className={`fas ${icon} text-purple-400 text-2xl`}></i>
  </div>
);

export function HomePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      
      {/* ===== Encabezado (Header) ===== */}
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            MEDIUM
          </div>
          <Link to="/login">
            <button className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg
                               hover:bg-purple-700 transition-colors duration-300">
              Iniciar Sesión
            </button>
          </Link>
        </nav>
      </header>

      {/* ===== Sección Principal (Hero) ===== */}
      <main className="flex flex-col items-center justify-center text-center py-20 md:py-32 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            MEDIUM
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl animate-fade-in-up">
          No dejes pendientes en esta vida.
        </p>
        <Link to="/login">
          <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg 
                             hover:bg-purple-700 hover:scale-105 
                             transition-all duration-300 ease-in-out
                             shadow-lg shadow-purple-500/50">
            Comenzar Ahora
          </button>
        </Link>
      </main>

      {/* ===== Sección de Características (Features) ===== */}
      <section className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Todo en un Solo Lugar</h2>
          <p className="text-gray-400 mb-12">Gestiona, asegura y organiza tus voluntades más importantes.</p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <FeatureIcon icon="fa-shield-alt" />
              <h3 className="text-xl font-semibold mb-2">Seguridad Total</h3>
              <p className="text-gray-400">Tus documentos están protegidos con encriptación de extremo a extremo.</p>
            </div>
            <div className="flex flex-col items-center">
              <FeatureIcon icon="fa-users" />
              <h3 className="text-xl font-semibold mb-2">Colaboración Fácil</h3>
              <p className="text-gray-400">Invita a tus seres queridos o asesores a participar de forma segura.</p>
            </div>
            <div className="flex flex-col items-center">
              <FeatureIcon icon="fa-cloud-upload-alt" />
              <h3 className="text-xl font-semibold mb-2">Acceso Universal</h3>
              <p className="text-gray-400">Accede a tu información desde cualquier dispositivo, en cualquier momento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Pie de Página (Footer) ===== */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} MEDIUM. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Una idea original del Lic. Omar Martinez Vargas</p>
          <p className="text-sm">Desarrollado por Abner Cházaro Durán</p>
        </div>
      </footer>

    </div>
  );
}