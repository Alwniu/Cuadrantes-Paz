// src/utils/mockData.ts

export interface CuadranteData {
  id: string;
  nombre: string;
  sectores: string;
  tiempoRespuesta: number; // en minutos
  nivelSeguridad: 'alto' | 'medio' | 'bajo'; // percepción comunitaria
  casosResueltos: number;
  casosTotales: number;
  infraestructura: {
    puestosPoliciales: { id: string; nombre: string; lat: number; lng: number }[];
    camaras: { id: string; lat: number; lng: number }[];
    casasJusticia: { id: string; nombre: string; lat: number; lng: number }[];
  };
}

export const datosCuadrantes: Record<string, CuadranteData> = {
  'Cuadrante A - Alto Guri': {
    id: 'CP-001',
    nombre: 'Cuadrante A - Alto Guri',
    sectores: 'Alto Guri, Avenida Bella Vista',
    tiempoRespuesta: 3.8,
    nivelSeguridad: 'medio',
    casosResueltos: 42,
    casosTotales: 50,
    infraestructura: {
      puestosPoliciales: [
        { id: 'pp-001', nombre: 'PP Alto Guri', lat: 9.7415, lng: -63.1905 }
      ],
      camaras: [
        { id: 'cam-001', lat: 9.7420, lng: -63.1910 },
        { id: 'cam-002', lat: 9.7410, lng: -63.1900 }
      ],
      casasJusticia: [
        { id: 'cj-001', nombre: 'Casa Justicia Alto Guri', lat: 9.7425, lng: -63.1895 }
      ]
    }
  },
  'Cuadrante B - Los Cortijos': {
    id: 'CP-002',
    nombre: 'Cuadrante B - Los Cortijos',
    sectores: 'Los Cortijos, Avenida Cruz Peraza',
    tiempoRespuesta: 4.2,
    nivelSeguridad: 'bajo',
    casosResueltos: 38,
    casosTotales: 45,
    infraestructura: {
      puestosPoliciales: [
        { id: 'pp-002', nombre: 'PP Los Cortijos', lat: 9.7565, lng: -63.2035 }
      ],
      camaras: [
        { id: 'cam-003', lat: 9.7570, lng: -63.2040 }
      ],
      casasJusticia: []
    }
  },
  'Cuadrante C - Brisas del Aeropuerto': {
    id: 'CP-003',
    nombre: 'Cuadrante C - Brisas del Aeropuerto',
    sectores: 'Brisas del Aeropuerto, Avenida José Tadeo Monagas',
    tiempoRespuesta: 2.9,
    nivelSeguridad: 'alto',
    casosResueltos: 48,
    casosTotales: 50,
    infraestructura: {
      puestosPoliciales: [
        { id: 'pp-003', nombre: 'PP Brisas Aeropuerto', lat: 9.7565, lng: -63.1335 }
      ],
      camaras: [
        { id: 'cam-004', lat: 9.7570, lng: -63.1340 },
        { id: 'cam-005', lat: 9.7560, lng: -63.1330 }
      ],
      casasJusticia: [
        { id: 'cj-002', nombre: 'Casa Justicia Brisas', lat: 9.7555, lng: -63.1325 }
      ]
    }
  },
  'Cuadrante D - Juánico': {
    id: 'CP-004',
    nombre: 'Cuadrante D - Juánico',
    sectores: 'Juánico, Avenida Romulo Gallegos',
    tiempoRespuesta: 5.1,
    nivelSeguridad: 'bajo',
    casosResueltos: 35,
    casosTotales: 42,
    infraestructura: {
      puestosPoliciales: [
        { id: 'pp-004', nombre: 'PP Juánico', lat: 9.7465, lng: -63.1435 }
      ],
      camaras: [],
      casasJusticia: [
        { id: 'cj-003', nombre: 'Casa Justicia Juánico', lat: 9.7470, lng: -63.1430 }
      ]
    }
  },
  'Cuadrante E - Los Guaritos': {
    id: 'CP-005',
    nombre: 'Cuadrante E - Los Guaritos',
    sectores: 'Los Guaritos, Avenida Universidad',
    tiempoRespuesta: 3.5,
    nivelSeguridad: 'medio',
    casosResueltos: 40,
    casosTotales: 44,
    infraestructura: {
      puestosPoliciales: [
        { id: 'pp-005', nombre: 'PP Los Guaritos', lat: 9.7215, lng: -63.1635 }
      ],
      camaras: [
        { id: 'cam-006', lat: 9.7220, lng: -63.1640 }
      ],
      casasJusticia: []
    }
  },
  'Cuadrante F - Los Cocos': {
    id: 'CP-006',
    nombre: 'Cuadrante F - Los Cocos',
    sectores: 'Los Cocos, Avenida Bolívar',
    tiempoRespuesta: 4.0,
    nivelSeguridad: 'medio',
    casosResueltos: 39,
    casosTotales: 46,
    infraestructura: {
      puestosPoliciales: [
        { id: 'pp-006', nombre: 'PP Los Cocos', lat: 9.7365, lng: -63.1735 }
      ],
      camaras: [
        { id: 'cam-007', lat: 9.7370, lng: -63.1740 }
      ],
      casasJusticia: [
        { id: 'cj-004', nombre: 'Casa Justicia Los Cocos', lat: 9.7360, lng: -63.1730 }
      ]
    }
  }
};