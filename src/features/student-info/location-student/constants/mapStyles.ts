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
        featureType: "poi",
        stylers: [{ color: "#D3E7F0" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }],
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

export default mapStyles;