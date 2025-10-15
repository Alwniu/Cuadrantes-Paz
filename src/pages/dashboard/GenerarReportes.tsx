

export default function GenerarReporteEstadistico() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reportes Estadísticos</h2>
        <p className="text-gray-600 mb-4">Visualiza y genera reportes estadísticos basados en las incidencias registradas.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((report) => (
            <div key={report} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Reporte {report}</h3>
                <p className="text-gray-600 mb-3">Descripción breve del reporte {report}.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Generar Reporte
                </button>
            </div>
          ))}
        </div>
      </div>
        <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendario de Incidencias</h3>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-700">
                {day}
            </div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div 
              key={day} 
              className={`text-center py-2 rounded ${
                day === 15 ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {day}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}