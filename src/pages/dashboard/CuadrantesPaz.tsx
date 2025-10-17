// ...existing code...
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCuadrantes } from '../../context/CuadrantesContext';

export default function UbicacionCuadrantesPaz() {
  const mapStyles = `
    @media (max-width: 1023px) {
      .leaflet-container {
        z-index: 10 !important;
      }
    }
  `;

  const mapRef = useRef<HTMLDivElement>(null);
  const { cuadrantes, eliminarCuadrante } = useCuadrantes();
  const mapInstance = useRef<L.Map | null>(null);
  const polygonsRef = useRef<Map<string, L.Polygon>>(new Map());
  const connectionsRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([9.73, -63.18], 13);
    mapInstance.current = map;
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  // Calcular el centro de un polígono
  const getPolygonCenter = (coords: [number, number][]): [number, number] => {
    const sumLat = coords.reduce((sum, coord) => sum + coord[0], 0);
    const sumLng = coords.reduce((sum, coord) => sum + coord[1], 0);
    return [sumLat / coords.length, sumLng / coords.length];
  };

  // Actualizar polígonos y conexiones cuando cambien los cuadrantes
  useEffect(() => {
    if (!mapInstance.current) return;

    // Limpiar polígonos anteriores
    polygonsRef.current.forEach(polygon => {
      mapInstance.current?.removeLayer(polygon);
    });
    polygonsRef.current.clear();

    // Limpiar conexiones anteriores (si hay)
    if (connectionsRef.current) {
      mapInstance.current.removeLayer(connectionsRef.current);
      connectionsRef.current = null;
    }

    const centers: [number, number][] = [];

    // Agregar nuevos polígonos (más pequeños)
    cuadrantes.forEach(cuadrante => {
      if (cuadrante.coordenadas.length >= 1) {
        const polygon = L.polygon(cuadrante.coordenadas as any, {
          color: '#D32F2F',
          weight: 1, // Más delgado
          fillColor: '#FF5252',
          fillOpacity: 0.1 // Menos opaco
        }).addTo(mapInstance.current!);

        // Guardar centro para las conexiones
        const center = getPolygonCenter(cuadrante.coordenadas);
        centers.push(center);

        // Popup con botón de eliminación
        const popupContent = `
          <div style="font-weight: bold; color: #D32F2F;">${cuadrante.codigo} - ${cuadrante.nombre}</div>
          <div style="font-size: 12px; margin-top: 8px;">
            <div><strong>Responsable:</strong> ${cuadrante.responsable}</div>
            <div><strong>Municipio:</strong> ${cuadrante.municipio}</div>
            <div><strong>Sector:</strong> ${cuadrante.sector || 'No especificado'}</div>
            <div style="margin-top: 10px;">
              <button onclick="eliminarCuadrante('${cuadrante.id}')" 
                      style="background: #D32F2F; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                Eliminar
              </button>
            </div>
          </div>
        `;

        polygon.bindPopup(popupContent);
        polygonsRef.current.set(String(cuadrante.id), polygon);
      }
    });

    // Crear conexiones entre todos los cuadrantes (si hay más de uno)
    if (centers.length > 1) {
      const lines: L.Polyline[] = [];
      for (let i = 0; i < centers.length; i++) {
        for (let j = i + 1; j < centers.length; j++) {
          const line = L.polyline([centers[i], centers[j]], {
            color: '#0066CC',
            weight: 2,
            opacity: 0.7,
            dashArray: '5,5'
          });
          lines.push(line);
        }
      }
      // Agrupar todas las líneas en una sola capa para poder eliminarlas fácilmente
      const group = L.layerGroup(lines).addTo(mapInstance.current!);
      connectionsRef.current = group;
    }

    // Centrar el mapa si hay cuadrantes
    if (cuadrantes.length > 0) {
      const bounds = L.latLngBounds([]);
      cuadrantes.forEach(c => {
        if (c.coordenadas.length >= 3) {
          c.coordenadas.forEach(coord => {
            bounds.extend([coord[0], coord[1]]);
          });
        }
      });
      if (bounds.isValid()) {
        mapInstance.current!.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [cuadrantes]);

  // Exponer la función de eliminación globalmente para los popups
  useEffect(() => {
    (window as any).eliminarCuadrante = eliminarCuadrante;
    
    return () => {
      delete (window as any).eliminarCuadrante;
    };
  }, [eliminarCuadrante]);

  return (
    <>
    <style>{mapStyles}</style>
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
              Visualización Georreferenciada
            </h2>
            
            <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden mb-6">
              <div ref={mapRef} className="w-full h-full"></div>
            </div>

            <div className="cuadrante-info">
              <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
                Lista de Cuadrantes Activos
              </h2>
              
              {cuadrantes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm md:text-base">No hay cuadrantes registrados</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cuadrantes.map(cuadrante => (
                    <div 
                      key={cuadrante.id} 
                      className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600 hover:bg-red-100 transition duration-200"
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-red-700">{cuadrante.codigo} - {cuadrante.nombre}</strong><br />
                            <span>Estado: <span className="font-medium">Activo</span></span><br />
                            <span>Responsable: {cuadrante.responsable}</span><br />
                            {cuadrante.sector && (
                              <span>Sector: {cuadrante.sector}</span>
                            )}
                          </div>
                          <button
                            onClick={() => eliminarCuadrante(cuadrante.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition duration-200"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
// ...existing code...