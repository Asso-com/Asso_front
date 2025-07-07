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

const MapComponent = ({ onCenter, studentsWithLocation }: MapComponentProps) => {
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

  const initializeMap = () => {
    if (mapRef.current && window.google && window.google.maps) {
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 48.936616, lng: 2.324789 },
        zoom: 13,
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
        strokeColor: "#3182ce",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#3182ce",
        fillOpacity: 0.1,
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
            initialMap.setZoom(17);
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

    // Créer un nouveau marqueur spécial pour la sélection
    const selectedMarker = new window.google.maps.Marker({
      position: { lat, lng: lon },
      map: mapInstance,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 15,
        fillColor: "#FF0000",
        fillOpacity: 0.9,
        strokeColor: "#FFFFFF",
        strokeWeight: 3,
      },
      zIndex: 1000,
      animation: window.google.maps.Animation.BOUNCE,
    });

    // Arrêter l'animation après 2 secondes
    setTimeout(() => {
      selectedMarker.setAnimation(null);
    }, 2000);

    selectedMarkerRef.current = selectedMarker;

    // Trouver l'étudiant et afficher l'info window
    const student = studentsWithLocation.find(s => s.id === studentId);
    if (student) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 300px;">
            <h4 style="margin: 0 0 8px 0; color: #1a365d; font-size: 16px; font-weight: bold;">
              🎯 ${student.name}
            </h4>
            <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">
              🆔 ${student.registrationId}
            </p>
            <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">
              📧 ${student.email}
            </p>
            <p style="margin: 0 0 6px 0; color: #4a5568; font-size: 13px;">
              🏫 ${student.establishment}
            </p>
            <p style="margin: 0 0 8px 0; color: #4a5568; font-size: 13px;">
              📍 ${student.address}
            </p>
            <p style="margin: 0; color: ${student.enrolledInCurrentPeriod ? '#38A169' : '#D69E2E'}; font-size: 13px; font-weight: bold;">
              ${student.enrolledInCurrentPeriod ? '✅ Currently Enrolled' : '⏸️ Not Enrolled'}
            </p>
          </div>
        `,
      });
      infoWindow.open(mapInstance, selectedMarker);
    }
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

    // Nettoyer les anciens marqueurs
    markersRef.current.forEach(({ marker }) => marker.setMap(null));
    markersRef.current = [];

    // Créer des marqueurs SEULEMENT pour les étudiants avec location
    studentsWithLocation.forEach((student) => {
      const markerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: student.enrolledInCurrentPeriod ? "#48BB78" : "#ED8936",
        fillOpacity: 0.9,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      };

      const marker = new window.google.maps.Marker({
        position: { lat: student.lat, lng: student.lon },
        map: mapInstance,
        title: student.name,
        icon: markerIcon,
        optimized: true,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 280px;">
            <h4 style="margin: 0 0 6px 0; color: #1a365d; font-size: 14px; font-weight: bold;">
              ${student.name}
            </h4>
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
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
      });

      markersRef.current.push({ marker, student });
    });
  };

  useEffect(() => {
    if (map && isGoogleLoaded && studentsWithLocation.length > 0) {
      updateMarkers(map);
    }
  }, [map, studentsWithLocation, isGoogleLoaded]);

  return <Box ref={mapRef} width="100%" height="100vh" />;
};

export default MapComponent;