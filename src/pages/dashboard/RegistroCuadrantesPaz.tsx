

export default function RegistroCuadrantesPaz() {
  return (
    <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Cuadrantes de Paz</h2>
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Cuadrante</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Ejemplo: Cuadrante Centro"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Descripción del cuadrante"
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Dirección o coordenadas"
                />
            </div> 
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Registrar Cuadrante
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}