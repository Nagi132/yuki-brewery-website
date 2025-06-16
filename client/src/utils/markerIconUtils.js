// Define multiple marker icon options
export const MARKER_ICONS = {
  classic: {
    svg: `<path fill="COLOR_PLACEHOLDER" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`,
    color: '#4F46E5' // Indigo
  },
  modern: {
    svg: `<path fill="COLOR_PLACEHOLDER" d="M12 2C8.14 2 5 5.14 5 9c0 7 7 13 7 13s7-6 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`,
    color: '#DC2626' // Red
  },
  elegant: {
    svg: `<path fill="COLOR_PLACEHOLDER" d="M12 2C8.14 2 5 5.14 5 9c0 7 7 13 7 13s7-6 7-13c0-3.86-3.14-7-7-7z"/><circle fill="white" cx="12" cy="9" r="2"/>`,
    color: '#7C3AED' // Purple
  },
  minimal: {
    svg: `<circle fill="COLOR_PLACEHOLDER" cx="12" cy="12" r="8"/><circle fill="white" cx="12" cy="12" r="3"/>`,
    color: '#059669' // Emerald
  },
  brewery: {
    svg: `<path fill="COLOR_PLACEHOLDER" d="M12 2C8.14 2 5 5.14 5 9c0 5.5 6.5 12.5 7 13c0.5-0.5 7-7.5 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`,
    color: '#000000' // Black color - Classic shape with sharper point
  }
};

// Create smooth animated marker icons using size-based scaling for Google Maps
export const createMarkerIcon = (style = 'classic', baseSize = 32, state = 'default') => {
  const iconData = MARKER_ICONS[style];
  let fillColor = iconData.color;
  let actualSize = baseSize;
  
  // Calculate actual sizes for smooth scaling effect
  if (state === 'active') {
    fillColor = '#4F46E5'; // Blue for active
    actualSize = baseSize; // Keep same size, just change color
  } else if (state === 'hover') {
    actualSize = Math.round(baseSize * 1.1); // 10% larger for hover
  } else if (state === 'click') {
    actualSize = Math.round(baseSize * 1.25); // 25% larger for click
  }

  // Replace color placeholder in SVG with current state color
  const styledSvg = iconData.svg.replace(/COLOR_PLACEHOLDER/g, fillColor);

  const svgString = `
    <svg width="${actualSize}" height="${actualSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow-${state}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="${state === 'hover' ? '3' : '2'}" stdDeviation="${state === 'hover' ? '4' : '3'}" flood-color="rgba(0,0,0,0.3)" flood-opacity="${state === 'hover' ? '0.6' : '0.5'}"/>
        </filter>
      </defs>
      <g filter="url(#shadow-${state})">
        ${styledSvg}
      </g>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`,
    scaledSize: typeof window !== 'undefined' && window.google ? new window.google.maps.Size(actualSize, actualSize) : undefined,
    anchor: typeof window !== 'undefined' && window.google ? new window.google.maps.Point(actualSize / 2, actualSize) : undefined,
  };
};

// Generate all marker icon states at once
export const generateMarkerIcons = (style = 'brewery', baseSize = 36) => {
  return {
    default: createMarkerIcon(style, baseSize, 'default'),
    hover: createMarkerIcon(style, baseSize, 'hover'),
    active: createMarkerIcon(style, baseSize, 'active'),
    click: createMarkerIcon(style, baseSize, 'click')
  };
};