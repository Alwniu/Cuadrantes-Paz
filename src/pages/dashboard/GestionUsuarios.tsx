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

  const agregarUsuario = () => {
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
      <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Usuarios</h2>
      <p className="text-gray-600 mb-4">Aquí puedes gestionar los usuarios del sistema.</p>

      <div className="mb-6">
        <h3 className="font-bold mb-2">Agregar Usuario</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoUsuario.nombre}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={nuevoUsuario.email}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <select
            name="rol"
            value={nuevoUsuario.rol}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          >
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
          <button
            onClick={agregarUsuario}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Agregar
          </button>
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td className="p-2 border">{usuario.nombre}</td>
              <td className="p-2 border">{usuario.email}</td>
              <td className="p-2 border">{usuario.rol}</td>
              <td className="p-2 border">
                <button
                  onClick={() => eliminarUsuario(usuario.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }