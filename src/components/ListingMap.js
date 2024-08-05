import { useEffect, useRef } from 'react';

export default function ListingMap({ location }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // This is a placeholder for actual map implementation
    // You would typically use a library like Google Maps or Mapbox here
    const map = document.createElement('div');
    map.style.width = '100%';
    map.style.height = '300px';
    map.style.backgroundColor = '#e5e7eb';
    map.style.display = 'flex';
    map.style.alignItems = 'center';
    map.style.justifyContent = 'center';
    map.innerHTML = `<p>Map of ${location}</p>`;
    
    if (mapRef.current) {
      mapRef.current.appendChild(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, [location]);

  return <div ref={mapRef} className="w-full h-[300px] rounded-lg overflow-hidden"></div>;
}