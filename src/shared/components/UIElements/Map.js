// src/components/Map.js
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

const MapComponent = ({ center, zoom }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([center.lng, center.lat]),
                zoom: zoom,
            }),
        });

        return () => map.setTarget(null);
    }, [center, zoom]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
