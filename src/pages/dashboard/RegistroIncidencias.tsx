// src/pages/dashboard/RegistroIncidencias.tsx
import { useState } from 'react';

// Datos iniciales de incidencias de ejemplo
const incidenciasIniciales = [
  {
    id: 1,
    tipo: 'Delito',
    descripcion: 'Robo reportado cerca del parque central.',
    ubicacion: 'CPZ001',
    fecha: '2025-07-21T18:30',
    estado: 'En proceso'
  },
  {
    id: 2,
    descripcion: 'Accidente vehicular con heridos leves.',
    tipo: 'Emergencia',
    ubicacion: '9.741, -63.189',
    fecha: '2025-07-20T15:15',
    estado: 'Resuelto'
  }
];

export default function RegistrarIncidecias() {
  const [incidencias, setIncidencias] = useState(incidenciasIniciales);
  const [nuevaIncidencia, setNuevaIncidencia] = useState({
    tipo: 'Delito',
    descripcion: '',
    ubicacion: '',
    fecha: '',
    estado: 'Pendiente'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNuevaIncidencia({ ...nuevaIncidencia, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaIncidencia.descripcion && nuevaIncidencia.ubicacion) {
      setIncidencias([
        ...incidencias,
        { ...nuevaIncidencia, id: Date.now() }
      ]);
      setNuevaIncidencia({
        tipo: 'Delito',
        descripcion: '',
        ubicacion: '',
        fecha: '',
        estado: 'Pendiente'
      });
    }
  };

  return (
    // ✅ ESTRUCTURA SIMPLE: Solo un div con padding
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">
            {/* Formulario de registro */}
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
                Registrar Nueva Incidencia
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="tipo" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                    Tipo de Evento:
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={nuevaIncidencia.tipo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white text-sm md:text-base"
                  >
                    <option value="Delito">Delito</option>
                    <option value="Accidente">Accidente</option>
                    <option value="Emergencia">Emergencia</option>
                    <option value="Vandalismo">Vandalismo</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="descripcion" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                    Descripción:
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={nuevaIncidencia.descripcion}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Ej. Robo a mano armada en la Av. Bolívar..."
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="ubicacion" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                    Ubicación (coordenadas o cuadrante):
                  </label>
                  <input
                    type="text"
                    id="ubicacion"
                    name="ubicacion"
                    value={nuevaIncidencia.ubicacion}
                    onChange={handleChange}
                    placeholder="Ej. Cuadrante CPZ001 o 9.745, -63.183"
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="fecha" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                    Fecha y Hora:
                  </label>
                  <input
                    type="datetime-local"
                    id="fecha"
                    name="fecha"
                    value={nuevaIncidencia.fecha}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="estado" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                    Estado del Evento:
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={nuevaIncidencia.estado}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white text-sm md:text-base"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Resuelto">Resuelto</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  Registrar Incidencia
                </button>
              </form>
            </div>

            {/* Historial de incidencias */}
            <div className="incidencias">
              <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
                Historial de Incidencias
              </h2>
              
              {incidencias.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm md:text-base">No hay incidencias registradas</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {incidencias.map(incidencia => (
                    <div 
                      key={incidencia.id} 
                      className="bg-emerald-50 p-3 md:p-4 rounded-lg border-l-4 border-emerald-600"
                    >
                      <div className="space-y-1">
                        <div>
                          <strong className="text-emerald-700">Tipo:</strong> {incidencia.tipo}
                        </div>
                        <div>
                          <strong className="text-emerald-700">Estado:</strong> {incidencia.estado}
                        </div>
                        <div>
                          <strong className="text-emerald-700">Ubicación:</strong> {incidencia.ubicacion}
                        </div>
                        <div>
                          <strong className="text-emerald-700">Fecha:</strong> {new Date(incidencia.fecha).toLocaleString('es-ES')}
                        </div>
                        <div className="text-gray-700 mt-2">
                          {incidencia.descripcion}
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
  );
}