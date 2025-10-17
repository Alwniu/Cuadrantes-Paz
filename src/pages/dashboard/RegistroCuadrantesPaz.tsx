// src/pages/dashboard/RegistroCuadrantesPaz.tsx
import { useState, useEffect, useRef } from 'react';
import { useCuadrantes } from '../../context/CuadrantesContext';

// Solo importamos lo esencial y manejamos los errores
let L: any = null;
let mapInstance: any = null;

// Función segura para cargar Leaflet
const loadLeaflet = async () => {
  if (L) return L;
  
  try {
    // Importación dinámica para evitar problemas en SSR
    const leafletModule = await import('leaflet');
    L = leafletModule.default;
    
    // Corregir el problema de los iconos en Vite
    delete (L as any).Icon.Default.prototype._getIconUrl;
    (L as any).Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    
    return L;
  } catch (error) {
    console.error('Error al cargar Leaflet:', error);
    return null;
  }
};

// Función para geocodificación inversa segura
const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    
    if (data.address?.suburb) return data.address.suburb;
    if (data.address?.neighbourhood) return data.address.neighbourhood;
    if (data.address?.quarter) return data.address.quarter;
    if (data.address?.city_district) return data.address.city_district;
    if (data.address?.town) return data.address.town;
    if (data.address?.city) return data.address.city;
    
    return 'Sector no identificado';
  } catch (error) {
    console.error('Error en geocodificación inversa:', error);
    return 'Sector no identificado';
  }
};

export default function RegistroCuadrantesPaz() {
  const { agregarCuadrante } = useCuadrantes();
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    municipio: 'Maturín',
    responsable: '',
    coordenadas: [] as [number, number][],
    sector: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Solo ejecutar en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Inicializar el mapa de forma segura
  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstance) return;

    const initMap = async () => {
      try {
        const Leaflet = await loadLeaflet();
        if (!Leaflet) {
          setMapError(true);
          return;
        }

        // Crear el mapa
        const map = Leaflet.map(mapRef.current!).setView([9.73, -63.18], 15);
        mapInstance = map;
        
        // Agregar capa base
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Manejar clics
        map.on('click', async (e: any) => {
          const { lat, lng } = e.latlng;
          
          // Limpiar capas anteriores
          map.eachLayer((layer: any) => {
            if (!(layer instanceof Leaflet.TileLayer)) {
              map.removeLayer(layer);
            }
          });

          // Crear marcador
          Leaflet.marker([lat, lng]).addTo(map);

          // Crear cuadrado de 1km
          const size = 0.009;
          const coords: [number, number][] = [
            [lat - size/2, lng - size/2],
            [lat - size/2, lng + size/2],
            [lat + size/2, lng + size/2],
            [lat + size/2, lng - size/2]
          ];

          // Crear polígono
          Leaflet.polygon(coords, {
            color: '#D32F2F',
            weight: 3,
            fillColor: '#FF5252',
            fillOpacity: 0.4
          }).addTo(map);

          // Obtener sector
          setIsProcessing(true);
          const sectorName = await reverseGeocode(lat, lng);
          setIsProcessing(false);
          
          setFormData(prev => ({ 
            ...prev, 
            coordenadas: coords,
            sector: sectorName,
            nombre: sectorName !== 'Sector no identificado' ? `Cuadrante - ${sectorName}` : prev.nombre
          }));
        });

      } catch (error) {
        console.error('Error al inicializar el mapa:', error);
        setMapError(true);
      }
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
    };
  }, [isClient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.coordenadas.length === 0) {
      alert('Por favor seleccione una ubicación en el mapa');
      return;
    }
    
    if (!formData.nombre || !formData.codigo || !formData.responsable) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    agregarCuadrante({
      ...formData,
      descripcion: ''
    });

    setFormData({
      nombre: '',
      codigo: '',
      municipio: 'Maturín',
      responsable: '',
      coordenadas: [],
      sector: ''
    });
  };

  // Renderizado seguro
  if (!isClient) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Registro de Cuadrantes de Paz</h2>
        <div className="bg-gray-100 rounded p-4">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
              Registro de Cuadrantes de Paz
            </h2>
            
            {mapError ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>No se pudo cargar el mapa. Por favor, intente nuevamente o contacte al administrador.</p>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Nombre del Cuadrante:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                  placeholder="Ej. Cuadrante - Los Godos"
                  required
                />
              </div>

              <div>
                <label htmlFor="codigo" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Código Identificador:
                </label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                  placeholder="Ej. CPZ001-MUN"
                  required
                />
              </div>

              <div>
                <label htmlFor="municipio" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Municipio:
                </label>
                <input
                  type="text"
                  id="municipio"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                  placeholder="Ej. Maturín"
                  required
                />
              </div>

              <div>
                <label htmlFor="responsable" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Responsable Asignado:
                </label>
                <input
                  type="text"
                  id="responsable"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                  placeholder="Ej. Teniente Carlos Soto"
                  required
                />
              </div>

              {formData.sector && (
                <div>
                  <label className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                    Sector Detectado:
                  </label>
                  <div className="w-full px-3 py-2 bg-gray-100 rounded-lg text-gray-700">
                    {formData.sector}
                  </div>
                </div>
              )}

              <div>
                <label className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Seleccione Ubicación del Cuadrante:
                </label>
                <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden border border-gray-300 relative">
                  <div ref={mapRef} className="w-full h-full cursor-crosshair bg-gray-100">
                    {!mapInstance && !mapError && (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">Cargando mapa...</p>
                      </div>
                    )}
                  </div>
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p>Obteniendo información del sector...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>• Haga clic en el mapa para seleccionar la ubicación del cuadrante</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg text-sm md:text-base disabled:opacity-50"
              >
                {isProcessing ? 'Procesando...' : 'Registrar Cuadrante'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}