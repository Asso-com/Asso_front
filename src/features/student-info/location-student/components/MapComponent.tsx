import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import mapStyles from '../constants/mapStyles';
import type { ProcessedStudentData } from '../Types/StudentLocationType';

declare global {
  interface Window {
    google: typeof google;
    initMap?: () => void;
  }
}

interface MapComponentProps {
  onCenter?: (centerFunc: (lat: number, lon: number, studentId: string) => void) => void;
  studentsWithLocation: ProcessedStudentData[];
  selectedStudentId: string | null;
}

const MapComponent = ({ onCenter, studentsWithLocation, selectedStudentId }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<{ marker: google.maps.Marker; student: ProcessedStudentData }[]>([]);
  const selectedMarkerRef = useRef<google.maps.Marker | null>(null);
  const villeneuvePolygonRef = useRef<google.maps.Polygon | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // Coordonnées du contour de Villeneuve-la-Garenne
  const villeneuveCoords = [
    { lat: 48.944, lng: 2.316 },
    { lat: 48.9445, lng: 2.34 },
    { lat: 48.935, lng: 2.345 },
    { lat: 48.928, lng: 2.34 },
    { lat: 48.926, lng: 2.32 },
    { lat: 48.93, lng: 2.31 },
    { lat: 48.944, lng: 2.316 },
  ];

  // Fonction pour créer un marqueur comme dans l'image
  const createLocationMarker = (student: ProcessedStudentData, isSelected: boolean = false) => {
    const size = isSelected ? 35 : 28;
    const circleRadius = size * 0.4;
    const emoji = '👨‍🎓';
    const bgColor = student.enrolledInCurrentPeriod ? '#4285F4' : '#FF8C00'; // Bleu Google ou orange
    const strokeColor = '#FFFFFF';
    const strokeWidth = 2;
    
    const svgMarker = `
      <svg width="${size}" height="${size + 10}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow${student.id}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        
        <!-- Cercle principal -->
        <circle cx="${size/2}" cy="${circleRadius + 2}" r="${circleRadius}" 
                fill="${bgColor}" 
                stroke="${strokeColor}" 
                stroke-width="${strokeWidth}" 
                filter="url(#shadow${student.id})"/>
        
        <!-- Triangle pointu vers le bas -->
        <path d="M ${size/2 - 6} ${circleRadius + circleRadius + 2} 
                 L ${size/2} ${size + 8} 
                 L ${size/2 + 6} ${circleRadius + circleRadius + 2} Z" 
              fill="${bgColor}" 
              stroke="${strokeColor}" 
              stroke-width="${strokeWidth}"
              filter="url(#shadow${student.id})"/>
        
        <!-- Emoji centré dans le cercle -->
        <text x="${size/2}" y="${circleRadius + 6}" 
              text-anchor="middle" 
              font-size="${circleRadius * 1.2}" 
              font-family="Arial, sans-serif">${emoji}</text>
        
        ${isSelected ? `
          <!-- Anneau de sélection -->
          <circle cx="${size/2}" cy="${circleRadius + 2}" r="${circleRadius + 4}" 
                  fill="none" 
                  stroke="#FF0000" 
                  stroke-width="2" 
                  stroke-dasharray="4,4">
            <animateTransform attributeName="transform" 
                            type="rotate" 
                            values="0 ${size/2} ${circleRadius + 2};360 ${size/2} ${circleRadius + 2}" 
                            dur="2s" 
                            repeatCount="indefinite"/>
          </circle>
        ` : ''}
      </svg>
    `;

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgMarker),
      scaledSize: new window.google.maps.Size(size, size + 10),
      anchor: new window.google.maps.Point(size/2, size + 8), // Ancrage à la pointe
    };
  };

  // Fonction pour créer le marqueur de sélection spécial
  const createSelectedMarker = () => {
    const size = 42;
    const circleRadius = size * 0.4;
    const emoji = '🎯';
    
    const svgMarker = `
      <svg width="${size}" height="${size + 12}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glowSelected" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(255,0,0,0.5)"/>
          </filter>
        </defs>
        
        <!-- Cercle extérieur pulsant -->
        <circle cx="${size/2}" cy="${circleRadius + 2}" r="${circleRadius + 6}" 
                fill="none" 
                stroke="#FF0000" 
                stroke-width="2" 
                stroke-dasharray="6,6"
                opacity="0.8">
          <animateTransform attributeName="transform" 
                          type="rotate" 
                          values="0 ${size/2} ${circleRadius + 2};360 ${size/2} ${circleRadius + 2}" 
                          dur="2s" 
                          repeatCount="indefinite"/>
          <animate attributeName="r" 
                   values="${circleRadius + 6};${circleRadius + 8};${circleRadius + 6}" 
                   dur="1.5s" 
                   repeatCount="indefinite"/>
        </circle>
        
        <!-- Cercle principal -->
        <circle cx="${size/2}" cy="${circleRadius + 2}" r="${circleRadius}" 
                fill="#FF4444" 
                stroke="#FFFFFF" 
                stroke-width="3" 
                filter="url(#glowSelected)"/>
        
        <!-- Triangle pointu vers le bas -->
        <path d="M ${size/2 - 7} ${circleRadius + circleRadius + 2} 
                 L ${size/2} ${size + 10} 
                 L ${size/2 + 7} ${circleRadius + circleRadius + 2} Z" 
              fill="#FF4444" 
              stroke="#FFFFFF" 
              stroke-width="3"
              filter="url(#glowSelected)"/>
        
        <!-- Emoji centré -->
        <text x="${size/2}" y="${circleRadius + 6}" 
              text-anchor="middle" 
              font-size="${circleRadius * 1.1}" 
              font-family="Arial, sans-serif">${emoji}</text>
        
        <!-- Effet de pulsation -->
        <circle cx="${size/2}" cy="${circleRadius + 2}" r="${circleRadius}" 
                fill="#FF4444" 
                stroke="none" 
                opacity="0.3">
          <animate attributeName="r" 
                   values="${circleRadius};${circleRadius + 4};${circleRadius}" 
                   dur="1s" 
                   repeatCount="indefinite"/>
          <animate attributeName="opacity" 
                   values="0.3;0.1;0.3" 
                   dur="1s" 
                   repeatCount="indefinite"/>
        </circle>
      </svg>
    `;

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgMarker),
      scaledSize: new window.google.maps.Size(size, size + 12),
      anchor: new window.google.maps.Point(size/2, size + 10),
    };
  };

  const initializeMap = () => {
    if (mapRef.current && window.google && window.google.maps) {
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 48.936616, lng: 2.324789 },
        zoom: 15,
        styles: mapStyles,
        gestureHandling: 'greedy',
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        scaleControl: false,
      });
      
      // Ajouter le contour de Villeneuve-la-Garenne
      const villeneuvePolygon = new window.google.maps.Polygon({
        paths: villeneuveCoords,
        strokeColor: "#4285F4",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#4285F4",
        fillOpacity: 0.15,
      });
      villeneuvePolygon.setMap(initialMap);
      villeneuvePolygonRef.current = villeneuvePolygon;
      
      setMap(initialMap);
      setIsGoogleLoaded(true);
      updateMarkers(initialMap);
      
      if (onCenter) {
        onCenter((lat: number, lon: number, studentId: string) => {
          initialMap.panTo({ lat, lng: lon });
          setTimeout(() => {
            initialMap.setZoom(18);
            addSelectedMarker(initialMap, lat, lon, studentId);
          }, 200);
        });
      }
    }
  };

  const addSelectedMarker = (mapInstance: google.maps.Map, lat: number, lon: number, studentId: string) => {
    // Supprimer l'ancien marqueur sélectionné
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
    }

    // Trouver l'étudiant
    const student = studentsWithLocation.find(s => s.id === studentId);
    if (!student) return;

    // Créer un nouveau marqueur spécial pour la sélection
    const selectedMarker = new window.google.maps.Marker({
      position: { lat, lng: lon },
      map: mapInstance,
      icon: createSelectedMarker(),
      zIndex: 1000,
      animation: window.google.maps.Animation.DROP,
    });

    selectedMarkerRef.current = selectedMarker;

    // Créer l'info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 300px; border-radius: 8px;">
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 24px; margin-right: 10px;">🎯</span>
            <h4 style="margin: 0; color: #1a365d; font-size: 16px; font-weight: bold;">
              ${student.name}
            </h4>
          </div>
          
          <div style="background: #f8f9fa; padding: 8px; border-radius: 6px; margin-bottom: 8px;">
            <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">
              🆔 <strong>ID:</strong> ${student.registrationId}
            </p>
            <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">
              📧 <strong>Email:</strong> ${student.email}
            </p>
            <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 13px;">
              🏫 <strong>School:</strong> ${student.establishment}
            </p>
            <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 13px;">
              📍 <strong>Address:</strong> ${student.address}
            </p>
          </div>
          
          <div style="text-align: center; padding: 6px; border-radius: 6px; background: ${student.enrolledInCurrentPeriod ? '#d4edda' : '#fff3cd'};">
            <p style="margin: 0; color: ${student.enrolledInCurrentPeriod ? '#155724' : '#856404'}; font-size: 13px; font-weight: bold;">
              ${student.enrolledInCurrentPeriod ? '✅ Currently Enrolled' : '⏸️ Not Enrolled'}
            </p>
          </div>
        </div>
      `,
      disableAutoPan: false,
      pixelOffset: new window.google.maps.Size(0, -15),
    });

    infoWindow.open(mapInstance, selectedMarker);

    selectedMarker.addListener('click', () => {
      infoWindow.close();
    });
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      const checkGoogle = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogle);
          initializeMap();
        }
      }, 100);
      
      return () => clearInterval(checkGoogle);
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB2t6SKuPzb_lo3qNnUuYFqdiI4UC1tjZA&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      setIsGoogleLoaded(true);
      initializeMap();
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Maps API');
    };
    
    document.head.appendChild(script);

    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  const updateMarkers = (mapInstance: google.maps.Map) => {
    if (!window.google || !window.google.maps) return;

    markersRef.current.forEach(({ marker }) => marker.setMap(null));
    markersRef.current = [];

    studentsWithLocation.forEach((student) => {
      const marker = new window.google.maps.Marker({
        position: { lat: student.lat, lng: student.lon },
        map: mapInstance,
        title: student.name,
        icon: createLocationMarker(student, selectedStudentId === student.id),
        optimized: false,
        zIndex: selectedStudentId === student.id ? 999 : 1,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: Arial, sans-serif; max-width: 280px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 20px; margin-right: 8px;">👨‍🎓</span>
              <h4 style="margin: 0; color: #1a365d; font-size: 14px; font-weight: bold;">
                ${student.name}
              </h4>
            </div>
            
            <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">
              🆔 ${student.registrationId}
            </p>
            <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">
              📧 ${student.email}
            </p>
            <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 12px;">
              🏫 ${student.establishment}
            </p>
            <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 12px;">
              📍 ${student.address}
            </p>
            <p style="margin: 0; color: ${student.enrolledInCurrentPeriod ? '#38A169' : '#D69E2E'}; font-size: 12px; font-weight: bold;">
              ${student.enrolledInCurrentPeriod ? '✅ Currently Enrolled' : '⏸️ Not Enrolled'}
            </p>
          </div>
        `,
        pixelOffset: new window.google.maps.Size(0, -10),
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
      });

      markersRef.current.push({ marker, student });
    });
  };

  useEffect(() => {
    if (map && isGoogleLoaded) {
      updateMarkers(map);
    }
  }, [map, studentsWithLocation, selectedStudentId, isGoogleLoaded]);

  return <Box ref={mapRef} width="100%" height="100vh" />;
};

export default MapComponent;