// src/pages/dashboard/GenerarReportes.tsx
import { useState } from 'react';

export default function GenerarReporteEstadistico() {
  const [filtros, setFiltros] = useState({
    tipo: 'Todos',
    estado: 'Todos',
    cuadrante: 'Todos',
    periodo: ''
  });

  const [reporteGenerado, setReporteGenerado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para generar el reporte
    setReporteGenerado(true);
  };

  const handleDownload = (formato: string) => {
    // Aquí iría la lógica para descargar el reporte
    alert(`Descargando reporte en formato ${formato}`);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">

            <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
              Filtros del Reporte
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="tipo" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Tipo de Incidencia:
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={filtros.tipo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white text-sm md:text-base"
                >
                  <option value="Todos">Todos</option>
                  <option value="Delito">Delito</option>
                  <option value="Accidente">Accidente</option>
                  <option value="Emergencia">Emergencia</option>
                  <option value="Vandalismo">Vandalismo</option>
                </select>
              </div>

              <div>
                <label htmlFor="estado" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Estado:
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={filtros.estado}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white text-sm md:text-base"
                >
                  <option value="Todos">Todos</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Resuelto">Resuelto</option>
                </select>
              </div>

              <div>
                <label htmlFor="cuadrante" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Cuadrante:
                </label>
                <select
                  id="cuadrante"
                  name="cuadrante"
                  value={filtros.cuadrante}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white text-sm md:text-base"
                >
                  <option value="Todos">Todos</option>
                  <option value="CPZ001">CPZ001 - Los Godos</option>
                  <option value="CPZ002">CPZ002 - La Pica</option>
                  <option value="CPZ003">CPZ003 - El Furrial</option>
                  <option value="CPZ004">CPZ004 - Brisas del Guarapiche</option>
                </select>
              </div>

              <div>
                <label htmlFor="periodo" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                  Periodo:
                </label>
                <input
                  type="month"
                  id="periodo"
                  name="periodo"
                  value={filtros.periodo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  Generar Reporte
                </button>
              </div>
            </form>

            {/* Vista previa del reporte */}
            {reporteGenerado && (
              <div className="reporte-preview bg-emerald-50 p-4 md:p-5 rounded-lg border-l-4 border-emerald-600 mb-6">
                <h3 className="font-bold text-emerald-700 mb-3 text-sm md:text-base">
                  Resumen Preliminar:
                </h3>
                <div className="space-y-1 text-sm md:text-base">
                  <p><strong>Total de Incidencias:</strong> 38</p>
                  <p><strong>Delitos:</strong> 22 | <strong>Accidentes:</strong> 10 | <strong>Emergencias:</strong> 6</p>
                  <p><strong>Resueltas:</strong> 25 | <strong>En proceso:</strong> 8 | <strong>Pendientes:</strong> 5</p>
                </div>
              </div>
            )}

            {/* Botones de descarga */}
            {reporteGenerado && (
              <div className="download-buttons flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleDownload('PDF')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-sm md:text-base"
                >
                  📄 Descargar PDF
                </button>
                <button
                  onClick={() => handleDownload('Excel')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-sm md:text-base"
                >
                  📊 Exportar a Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}