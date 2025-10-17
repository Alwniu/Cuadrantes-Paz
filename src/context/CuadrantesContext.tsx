// src/context/CuadrantesContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

export interface Cuadrante {
  id: string;
  nombre: string;
  codigo: string;
  municipio: string;
  responsable: string;
  coordenadas: [number, number][];
  descripcion: string;
  sector?: string;
}

interface CuadrantesContextType {
  cuadrantes: Cuadrante[];
  agregarCuadrante: (cuadrante: Omit<Cuadrante, 'id'>) => void;
  eliminarCuadrante: (id: string) => void;
}

const CuadrantesContext = createContext<CuadrantesContextType>({
  cuadrantes: [],
  agregarCuadrante: () => {},
  eliminarCuadrante: () => {}
});

export const useCuadrantes = () => {
  return useContext(CuadrantesContext);
};

export const CuadrantesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cuadrantes, setCuadrantes] = useState<Cuadrante[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cuadrantesPaz');
      if (saved) {
        setCuadrantes(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error al cargar cuadrantes:', error);
      setCuadrantes([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cuadrantesPaz', JSON.stringify(cuadrantes));
    } catch (error) {
      console.error('Error al guardar cuadrantes:', error);
    }
  }, [cuadrantes]);

  const agregarCuadrante = (cuadrante: Omit<Cuadrante, 'id'>) => {
    const nuevoCuadrante: Cuadrante = {
      ...cuadrante,
      id: Date.now().toString(),
    };
    setCuadrantes(prev => [...prev, nuevoCuadrante]);
  };

  const eliminarCuadrante = (id: string) => {
    setCuadrantes(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CuadrantesContext.Provider value={{ cuadrantes, agregarCuadrante, eliminarCuadrante }}>
      {children}
    </CuadrantesContext.Provider>
  );
};