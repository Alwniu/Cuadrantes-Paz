// src/pages/dashboard/GestionUsuarios.tsx
import { useState } from 'react';

const usuariosIniciales = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Administrador' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com', rol: 'Usuario' },
];

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', rol: 'Usuario' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoUsuario.nombre && nuevoUsuario.email) {
      setUsuarios([
        ...usuarios,
        { ...nuevoUsuario, id: Date.now() }
      ]);
      setNuevoUsuario({ nombre: '', email: '', rol: 'Usuario' });
    }
  };

  const eliminarUsuario = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    // Este div se adaptará perfectamente al área de contenido del dashboard
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 md:p-6">
              {/* Formulario de creación */}
              <div className="mb-8">
                <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
                  Crear Usuario
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                      Nombre completo:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={nuevoUsuario.nombre}
                      onChange={handleChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                      placeholder="Ingresa el nombre completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                      Correo electrónico:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={nuevoUsuario.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-sm md:text-base"
                      placeholder="ejemplo@correo.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="rol" className="block font-medium text-gray-700 mb-2 text-sm md:text-base">
                      Rol:
                    </label>
                    <select
                      id="rol"
                      name="rol"
                      value={nuevoUsuario.rol}
                      onChange={handleChange}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white text-sm md:text-base"
                    >
                      <option value="Usuario">Usuario</option>
                      <option value="Operador">Operador</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
                  >
                    Guardar Usuario
                  </button>
                </form>
              </div>

              {/* Lista de usuarios */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-emerald-700 mb-4">
                  Usuarios Registrados
                </h2>
                
                {usuarios.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm md:text-base">No hay usuarios registrados</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {usuarios.map(usuario => (
                      <div 
                        key={usuario.id} 
                        className="bg-emerald-50 p-3 md:p-4 rounded-lg border-l-4 border-emerald-600"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <strong className="text-sm md:text-base text-gray-800 truncate">
                                {usuario.nombre}
                              </strong>
                              <span className="text-xs md:text-sm text-emerald-700 font-medium bg-emerald-100 px-2 py-1 rounded">
                                {usuario.rol}
                              </span>
                            </div>
                            <div className="text-xs md:text-sm text-gray-600 mt-1 truncate">
                              {usuario.email}
                            </div>
                          </div>
                          <button
                            onClick={() => eliminarUsuario(usuario.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm font-medium transition duration-200 whitespace-nowrap"
                          >
                            Eliminar
                          </button>
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
    </div>
  );
}