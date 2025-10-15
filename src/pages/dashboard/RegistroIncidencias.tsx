





export default function RegistrarIncidecias() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Incidencias</h2>
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Incidencia</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Robo</option>
                    <option>Accidente</option>
                    <option>Vandalismo</option>
                    <option>Otro</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={4}></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Dirección o coordenadas" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Registrar Incidencia
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}