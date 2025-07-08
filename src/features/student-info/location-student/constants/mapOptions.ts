export const mapStyles = [
    {
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                color: "#17919C",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "landscape",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "landscape.natural",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "landscape.natural.landcover",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "landscape.natural.terrain",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.attraction",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                color: "#D3E7F0",
            },
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.park",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "poi.place_of_worship",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "poi.school",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#fafafa",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
            {
                color: "#17919C",
            },
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        stylers: [
            {
                color: "#D3E7F0",
            },
        ],
    },
];

export const villeneuveCoords = [
    { lat: 48.944, lng: 2.316 },
    { lat: 48.9445, lng: 2.34 },
    { lat: 48.935, lng: 2.345 },
    { lat: 48.928, lng: 2.34 },
    { lat: 48.926, lng: 2.32 },
    { lat: 48.93, lng: 2.31 },
    { lat: 48.944, lng: 2.316 },
];

// Map container style
export const containerStyle = {
    width: "100%",
    height: "100%",
};

// Map center
export const center = {
    lat: 48.936616,
    lng: 2.324789,
};



// Map options
export const mapOptions = {
    zoom: 15,
   // mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    styles: mapStyles,
    mapTypeControl: true,
    gestureHandling: "greedy" as const,
    scaleControl: true,
    //   zoom: 15,

    // restriction: {
    //     latLngBounds: null,
    //     strictBounds: false,
    // },
};


// Polygon options for QPV
export const qpvPolygonOptions = {
    strokeOpacity: 0.8,
    strokeWeight: 0.7,
    fillColor: "#fff",
    strokeColor: "#098FCE",
    fillOpacity: 0.5,
};

// Polygon options for Villeneuve
export const villeneuvePolygonOptions = {
    strokeColor: "#4285F4",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#4285F4",
    fillOpacity: 0.15,
};