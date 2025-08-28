import type { ProcessedStudentData } from "../Types/StudentLocationType";

export const createLocationMarker = (
  student: ProcessedStudentData,
  isSelected: boolean = false
): google.maps.Icon | undefined => {
  // Check if Google Maps API is loaded
  if (!window.google || !window.google.maps || !window.google.maps.Size || !window.google.maps.Point) {
    console.warn('Google Maps API not yet loaded, using default marker');
    return undefined; // This will use the default red marker
  }

  const size = isSelected ? 35 : 28;
  const circleRadius = size * 0.4;
  const emoji = "👨‍🎓";
  const bgColor = student.enrolledInCurrentPeriod ? "#4285F4" : "#FF8C00";
  const strokeColor = "#FFFFFF";
  const strokeWidth = 2;

  const svgMarker = `
    <svg width="${size}" height="${size + 10}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow${student.id}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <circle cx="${size / 2}" cy="${circleRadius + 2}" r="${circleRadius}"
              fill="${bgColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"
              filter="url(#shadow${student.id})"/>
      <path d="M ${size / 2 - 6} ${circleRadius * 2 + 2}
               L ${size / 2} ${size + 8}
               L ${size / 2 + 6} ${circleRadius * 2 + 2} Z"
            fill="${bgColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"
            filter="url(#shadow${student.id})"/>
      <text x="${size / 2}" y="${circleRadius + 6}" text-anchor="middle"
            font-size="${circleRadius * 1.2}" font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Arial, sans-serif">
        ${emoji}
      </text>
      ${
        isSelected
          ? `<circle cx="${size / 2}" cy="${circleRadius + 2}" r="${circleRadius + 4}"
              fill="none" stroke="#FF0000" stroke-width="2" stroke-dasharray="4,4">
              <animateTransform attributeName="transform" type="rotate"
                values="0 ${size / 2} ${circleRadius + 2};360 ${size / 2} ${circleRadius + 2}"
                dur="2s" repeatCount="indefinite"/>
            </circle>`
          : ""
      }
    </svg>
  `;

  try {
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgMarker),
      scaledSize: new window.google.maps.Size(size, size + 10),
      anchor: new window.google.maps.Point(size / 2, size + 8),
    };
  } catch (error) {
    console.error('Error creating custom marker:', error);
    return undefined; // Fallback to default marker
  };
};