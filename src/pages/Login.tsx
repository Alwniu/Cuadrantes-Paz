// src/pages/Login.tsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de autenticación (reemplaza con tu lógica real)
    setTimeout(() => {
      // Aquí puedes validar credenciales reales
      // Por ahora, cualquier email y contraseña no vacía funciona
      if (email && password) {
        // Guardar estado de sesión
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Redirigir al dashboard
        navigate('/dashboard', { replace: true });
      } else {
        alert('Por favor ingresa email y contraseña');
        setLoading(false);
      }
    }, 800); // Simula carga de red
  };

  return (
    <div className="min-h-screen flex">
      {/* Sección de Bienvenida (Lado Izquierdo) */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Formas abstractas circulares */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-300 rounded-full opacity-15"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-8 text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-center tracking-tight">
            BIENVENIDO
          </h1>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-center text-blue-100">
            Cuadrantes de Paz
          </h2>
          <p className="text-lg lg:text-xl text-center max-w-md leading-relaxed text-blue-50">
            Sistema de monitoreo y coordinación territorial para la seguridad ciudadana en Maturín.
          </p>
        </div>
      </div>

      {/* Formulario de Inicio de Sesión (Lado Derecho) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar sesión</h2>
              <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de Correo */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  correo
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="tu@correo.com"
                  required
                />
              </div>

              {/* Campo de Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Opciones Adicionales */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    ¿Olvidaste la contraseña?
                  </a>
                </div>
              </div>

              {/* Botón Principal */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Ingresando...' : 'Sign in'}
              </button>
            </form>

            {/* Enlace de Registro */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Regístrate
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}