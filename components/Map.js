import React, { useEffect, useRef } from 'react';

const Map = ({ apiKey }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Initialize map
    script.onload = () => {
      new window.google.maps.Map(mapRef.current, {
        // Add map options and markers
      });
    };

    return () => {
      // Clean up
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return <div ref={mapRef} style={{ height: '400px' }}></div>;
};

export default Map;