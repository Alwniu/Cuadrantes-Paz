// src/pages/Login.tsx
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cuadrantes from './../img/Cuadrantes.png';
import Policia from './../img/Poli.jpeg';

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

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/dashboard', { replace: true });
      } else {
        alert('Por favor ingresa email y contraseña');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${Policia})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md">
        {/* Fondo blanco transparente mejorado */}
        <div 
          className="rounded-2xl shadow-2xl p-6 md:p-8"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Más opaco para mejor legibilidad
            backdropFilter: 'blur(8px)', // Desenfoque más fuerte
            border: '1px solid rgba(255, 255, 255, 0.1)' // Borde sutil para definir el contenedor
          }}
        >
          {/* Logo/Ícono para todos los dispositivos */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <img className="rounded-full w-16 h-16" src={Cuadrantes} alt="Cuadrantes de Paz"/>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Cuadrantes de Paz</h1>
            <p className="text-gray-700 mt-1 font-medium">Maturín, Monagas</p>
          </div>

       

          {/* FORMULARIO TRADICIONAL */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Correo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white bg-opacity-80 text-gray-900 placeholder-gray-500"
                  placeholder="Correo"
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white bg-opacity-80 text-gray-900 placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-800">
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  Olvido la Contraseña?
                </a>
              </div>
            </div>

            {/* Botón Principal - ÚNICO en verde */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}