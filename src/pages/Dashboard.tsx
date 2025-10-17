// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroCuadrantesPaz from './dashboard/RegistroCuadrantesPaz';
import RegistrarIncidecias from './dashboard/RegistroIncidencias';
import GenerarReporteEstadistico from './dashboard/GenerarReportes';
import UbicacionCuadrantesPaz from './dashboard/CuadrantesPaz';
import GestionUsuarios from './dashboard/GestionUsuarios';
import { Home, MapPin, AlertTriangle, Users, BarChart3, Menu, X, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // En escritorio, siempre abierto
      } else {
        setIsSidebarOpen(false); // En móvil, cerrado por defecto
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    navigate('/login', { replace: true });
  };

  // Datos simulados (sin cambios)
  const deviceData = [
    { name: 'Computer', percentage: 75, color: 'bg-emerald-500' },
    { name: 'Smartphone', percentage: 65, color: 'bg-green-500' },
    { name: 'Tablet', percentage: 30, color: 'bg-purple-500' },
    { name: 'Smart TV', percentage: 15, color: 'bg-yellow-500' },
    { name: 'Wearable', percentage: 10, color: 'bg-red-500' },
    { name: 'Other', percentage: 5, color: 'bg-gray-500' },
  ];

  const countryData = [
    { name: 'Estados Unidos', value: '42.5%', flag: '🇺🇸' },
    { name: 'Brasil', value: '28.3%', flag: '🇧🇷' },
    { name: 'Reino Unido', value: '15.7%', flag: '🇬🇧' },
    { name: 'Alemania', value: '8.2%', flag: '🇩🇪' },
    { name: 'Francia', value: '5.3%', flag: '🇫🇷' },
  ];

  const weeklyAccessData = Array.from({ length: 28 }, (_, i) => ({
    date: `Jan ${String(i + 1).padStart(2, '0')}`,
    value: Math.floor(Math.random() * 100) + 50,
  }));

  // Componentes de secciones (sin cambios)
  const RegistroIncidecias = () => <RegistrarIncidecias/>;
  const RegistroCuadrante1 = () => <RegistroCuadrantesPaz/>;
  const UbicacionCuadrantes = () => <UbicacionCuadrantesPaz/>;

  // Componente para la sección principal (Dashboard widgets) - con colores VERDES
  const DashboardWidgets = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Widget 2: Dispositivos */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Dispositivos</h3>
        <div className="space-y-4">
          {deviceData.map((device) => (
            <div key={device.name} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{device.name}</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-emerald-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${device.color}`} 
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-800 w-10">{device.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Países</h3>
        <div className="space-y-3">
          {countryData.map((country) => (
            <div key={country.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 text-lg">{country.flag}</span>
                <span className="text-sm text-gray-700">{country.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{country.value}</span>
            </div>
          ))}
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendario</h3>
        <div className="text-center mb-4">
          <h4 className="font-bold text-gray-800">Enero 2024</h4>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div 
              key={day} 
              className={`text-center text-sm py-1 rounded ${
                day === 15 ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-700 hover:bg-emerald-50'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Acceso Semanal</h3>
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {weeklyAccessData.map((day, index) => (
            <div key={index} className="flex flex-col items-center min-w-16">
              <span className="text-xs text-gray-600 mb-2">{day.date}</span>
              <div className="w-8 bg-emerald-100 rounded-full">
                <div 
                  className="bg-emerald-500 rounded-full" 
                  style={{ height: `${Math.min(day.value / 2, 80)}px` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'RegistroIncidencia':
        return <RegistroIncidecias/>;
      case 'RegistroPaz':
        return <RegistroCuadrante1/>;
      case 'UbicacionCuadrantes':
        return <UbicacionCuadrantes/>;
      case 'GenerarReportes':
        return <GenerarReporteEstadistico/>;
      case 'GestionUsuario':
        return <GestionUsuarios/>;
      default:
        return <DashboardWidgets />;
    }
  };

  // Íconos actualizados con Lucide React
  const menuItems = [
    { name: 'Inicio', key: 'inicio', icon: Home },
    { name: 'Registrar Cuadrante de Paz', key: 'RegistroPaz', icon: MapPin },
    { name: 'Registrar Incidencias', key: 'RegistroIncidencia', icon: AlertTriangle },
    { name: 'Reportes Estadísticos', key: 'GenerarReportes', icon: BarChart3 },
    { name: 'Gestionar Usuarios', key: 'GestionUsuario', icon: Users },
    { name: 'Ubicación Cuadrantes de Paz', key: 'UbicacionCuadrantes', icon: MapPin }
  ];

  // Función para manejar clic en sidebar (cierra en móvil)
  const handleSidebarItemClick = (key: string) => {
    setActiveSection(key);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-emerald-50">
      {/* Overlay para móvil */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Menú de Navegación Principal (VERDE) */}
      {/* CAMBIO CLAVE: Eliminar h-screen y usar min-h-screen */}
      <div 
        className={`fixed lg:static z-50 min-h-screen bg-gradient-to-b from-emerald-700 to-emerald-800 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-72`}
      >
        <div className="p-6 border-b border-emerald-600 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Cuadrantes de Paz</h1>
            <p className="text-emerald-200 text-sm">Maturín, Monagas</p>
          </div>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-emerald-200"
            >
              <X size={24} />
            </button>
          )}
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.key}>
                  <button 
                    onClick={() => handleSidebarItemClick(item.key)}
                    className={`w-full text-left flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                      activeSection === item.key 
                        ? 'bg-emerald-600 text-white font-medium shadow-lg' 
                        : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    <IconComponent size={20} className="mr-3" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Barra Superior - Búsqueda y Cerrar Sesión (VERDE) */}
        <header className="bg-white shadow-sm p-4 flex items-center border-b border-emerald-100">
          {/* Botón de menú para móviles */}
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4 text-emerald-600 hover:text-emerald-800 lg:hidden"
            >
              <Menu size={24} />
            </button>
          )}
          
          {/* Barra de búsqueda - responsive */}
          <div className="relative flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Buscar cuadrantes, sectores, incidentes..."
              className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <div className="absolute left-3 top-2.5 text-emerald-400">
              🔍
            </div>
          </div>
          
          {/* Botón de Cerrar Sesión - MEJORADO Y RESPONSIVE */}
          <div className="ml-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center group"
              aria-label="Cerrar sesión"
            >
              <LogOut size={18} className="text-white" />
              <span className="ml-2 hidden md:inline font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* Contenido Principal - SIN overflow-auto aquí */}
        <main className="flex-1 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}