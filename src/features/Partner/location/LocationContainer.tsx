import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import PartnerLocationList from './components/PartnerLocationList';
import MapControls from './components/MapControls';
import useLocationPartners, { PARTNERS_PER_PAGE } from './hooks/useLocationPartners';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB2t6SKuPzb_lo3qNnUuYFqdiI4UC1tjZA';

declare global {
  interface Window {
    google: any;
  }
}

interface SelectedLocation {
  lat: number;
  lng: number;
  name: string;
}

interface PartnerMarker {
  marker: any;
  partner: any;
}

const LocationContainer: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<PartnerMarker[]>([]);
  const infoWindowRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);

  const { partners, isLoading, isError, hasMore, totalCount, currentCount, loadMore, isLoadingMore } =
    useLocationPartners();

  // Style du conteneur de la carte
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  // Styles de la carte
  const mapStyles = [
    {
      elementType: "geometry.stroke",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ color: "#17919C" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "landscape",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "landscape.natural",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "landscape.natural.landcover",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "landscape.natural.terrain",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "poi",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.attraction",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "poi.business",
      stylers: [{ color: "#D3E7F0" }, { visibility: "off" }],
    },
    {
      featureType: "poi.park",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "poi.school",
      stylers: [{ color: "#D3E7F0" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#fafafa" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ color: "#17919C" }, { visibility: "off" }],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      stylers: [{ color: "#D3E7F0" }],
    },
  ];

  // Coordonnées du polygone pour Villeneuve-la-Garenne
  const villeneuveLaGarenneCoords = [
    { lat: 48.9440, lng: 2.3160 },
    { lat: 48.9445, lng: 2.3400 },
    { lat: 48.9350, lng: 2.3450 },
    { lat: 48.9280, lng: 2.3400 },
    { lat: 48.9260, lng: 2.3200 },
    { lat: 48.9300, lng: 2.3100 },
    { lat: 48.9440, lng: 2.3160 }, // Fermer le polygone
  ];

  useEffect(() => {
    console.log('🔄 LocationContainer mounted - Resetting map to initial state');
    markersRef.current.forEach(({ marker }) => marker.setMap(null));
    markersRef.current = [];
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
    setSelectedLocation(null);
    console.log('🧹 Map reset completed');

    return () => {
      console.log('🔄 LocationContainer unmounting');
      markersRef.current.forEach(({ marker }) => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || mapInstanceRef.current) {
      console.log('❌ Map initialization skipped: mapRef or google not available');
      return;
    }

    const mapOptions = {
      center: { lat: 48.936616, lng: 2.324789 },
      zoom: 15.5,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: mapStyles, // Appliquer les styles personnalisés
    };

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
    infoWindowRef.current = new window.google.maps.InfoWindow();

    // Ajouter le polygone pour Villeneuve-la-Garenne
    const villeneuvePolygon = new window.google.maps.Polygon({
      paths: villeneuveLaGarenneCoords,
      strokeColor: '#FF0000', // Bordure rouge
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.1, // Remplissage léger pour ne pas masquer la carte
    });
    villeneuvePolygon.setMap(mapInstanceRef.current);
    console.log('🗺️ Villeneuve-la-Garenne polygon added');

   

    setIsMapLoaded(true);
    console.log('✅ Google Maps initialized');
  }, []);

  const addNewMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !window.google) {
      console.log('❌ addNewMarkers skipped: map not available');
      return;
    }

    if (!partners.length) {
      console.log('❌ addNewMarkers skipped: no partners available');
      return;
    }

    console.log(`🗺️ Synchronizing markers, partners: ${partners.length}, existing markers: ${markersRef.current.length}`);
    const partnerIds = new Set(partners.map((p) => p.id));
    markersRef.current = markersRef.current.filter(({ partner }) => {
      const shouldKeep = partnerIds.has(partner.id);
      if (!shouldKeep) {
        console.log(`🗑️ Removing marker for partner ${partner.name} (id: ${partner.id})`);
        partner.marker.setMap(null);
      }
      return shouldKeep;
    });

    const newPartners = partners.filter(
      (partner) => !markersRef.current.some(({ partner: existing }) => existing.id === partner.id)
    );
    if (newPartners.length === 0) {
      console.log('❌ No new partners to add');
      return;
    }

    console.log(`🗺️ Adding ${newPartners.length} new markers to map`);

    newPartners.forEach((partner) => {
      if (!partner.geo_point_2d) {
        console.log(`❌ Skipping partner ${partner.name} due to missing geo_point_2d`);
        return;
      }

      try {
        const marker = new window.google.maps.Marker({
          position: {
            lat: partner.geo_point_2d.lat,
            lng: partner.geo_point_2d.lon,
          },
          map: mapInstanceRef.current,
          title: partner.name,
          optimized: true,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: '#3182ce',
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 1,
          },
        });

        marker.addListener('click', () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }
          infoWindowRef.current.setContent(`
            <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 250px;">
              <h4 style="margin: 0 0 6px 0; color: #1a365d; font-size: 14px; font-weight: bold;">${partner.name}</h4>
              ${partner.shortTitle ? `<p style="margin: 0 0 4px 0; color: #666; font-size: 12px; font-style: italic;">${partner.shortTitle}</p>` : ''}
              <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 12px;">📍 ${partner.address}</p>
              <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 12px;">🏙️ ${partner.city}</p>
            </div>
          `);
          infoWindowRef.current.open(mapInstanceRef.current, marker);
          setSelectedLocation({
            lat: partner.geo_point_2d.lat,
            lng: partner.geo_point_2d.lon,
            name: partner.name,
          });
        });

        markersRef.current.push({ marker, partner });
      } catch (error) {
        console.error(`❌ Error adding marker for partner ${partner.name}:`, error);
      }
    });

    if (markersRef.current.length > 0 && partners.length <= PARTNERS_PER_PAGE) {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        markersRef.current.forEach(({ marker }) => bounds.extend(marker.getPosition()));
        mapInstanceRef.current.fitBounds(bounds);
        setTimeout(() => {
          if (mapInstanceRef.current.getZoom() > 12) {
            mapInstanceRef.current.setZoom(12);
          }
        }, 100);
      } catch (error) {
        console.error('❌ Error adjusting map bounds:', error);
      }
    }

    console.log(`✅ Added ${newPartners.length} markers. Total: ${markersRef.current.length}`);
  }, [partners]);

  const handleSeeOnMap = useCallback((location: SelectedLocation) => {
    if (!mapInstanceRef.current) {
      console.log('❌ handleSeeOnMap skipped: map not available');
      return;
    }

    mapInstanceRef.current.setCenter({ lat: location.lat, lng: location.lng });
    mapInstanceRef.current.setZoom(16);

    const targetMarker = markersRef.current.find(({ partner }) => partner.name === location.name);
    if (targetMarker) {
      setTimeout(() => {
        window.google.maps.event.trigger(targetMarker.marker, 'click');
      }, 300);
    }

    setSelectedLocation(location);
  }, []);

  const handleLoadMore = useCallback(async () => {
    console.log('🔄 Loading more partners...');
    await loadMore();
  }, [loadMore]);

  const handleFitBounds = useCallback(() => {
    if (!mapInstanceRef.current || !markersRef.current.length) {
      console.log('❌ handleFitBounds skipped: map or markers not available');
      return;
    }

    try {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(({ marker }) => bounds.extend(marker.getPosition()));
      mapInstanceRef.current.fitBounds(bounds);

      setTimeout(() => {
        if (mapInstanceRef.current.getZoom() > 12) {
          mapInstanceRef.current.setZoom(12);
        }
      }, 100);
    } catch (error) {
      console.error('❌ Error in handleFitBounds:', error);
    }
  }, []);

  useEffect(() => {
    if (window.google?.maps) {
      console.log('🔄 Google Maps already loaded, initializing map');
      initializeMap();
      return;
    }

    console.log('🔄 Loading Google Maps script');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('✅ Google Maps script loaded');
      setTimeout(initializeMap, 50);
    };
    script.onerror = () => console.error('❌ Failed to load Google Maps script');
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      existingScript?.remove();
      console.log('🧹 Google Maps script removed');
    };
  }, [initializeMap]);

  useEffect(() => {
    console.log(`🔍 LocationContainer useEffect for markers, isMapLoaded: ${isMapLoaded}, partners: ${partners.length}, markers: ${markersRef.current.length}`);
    if (isMapLoaded && partners.length > 0) {
      console.log('🔄 Map loaded and partners available, adding markers');
      addNewMarkers();
    }
  }, [isMapLoaded, partners, addNewMarkers]);

  return (
    <Flex height="100vh" overflow="hidden">
      <Box width="30%" height="100%" borderRight="2px solid #e2e8f0" overflow="hidden">
        <PartnerLocationList
          partners={partners}
          isLoading={isLoading}
          isError={isError}
          onSeeOnMap={handleSeeOnMap}
          selectedLocation={selectedLocation}
          totalCount={totalCount}
          currentCount={currentCount}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      </Box>
      <Box width="70%" height="100%" position="relative">
        <Box ref={mapRef} style={containerStyle} bg="gray.100" />
        {isMapLoaded && (
          <MapControls
            mapInstance={mapInstanceRef.current}
            markersCount={markersRef.current.length}
            totalCount={totalCount}
            currentCount={currentCount}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            onFitBounds={handleFitBounds}
          />
        )}
        {(!isMapLoaded || isLoading) && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(255,255,255,0.95)"
            zIndex={999}
          >
            <Box textAlign="center">
              <Box
                width="60px"
                height="60px"
                border="4px solid #e2e8f0"
                borderTop="4px solid #3182ce"
                borderRadius="50%"
                animation="spin 0.8s linear infinite"
                mx="auto"
                mb={4}
              />
              <Box fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
                {isLoading ? 'Loading fresh 100 partners...' : 'Initializing map...'}
              </Box>
              <Box fontSize="sm" color="gray.600">
                {currentCount > 0 && `${currentCount} partners loaded`}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default LocationContainer;