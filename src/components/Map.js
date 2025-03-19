import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useState, useCallback, useRef } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
// import {featurecollection} from "../geojsonSource.js"
//import {featurecollection} from "../data/areas.js"
import { lineCollection } from "../assets/border.js";
import { houseCollection } from "../assets/houses.js";
import { getCollection } from '../utils/firestore.js';
import { dataLayer } from "../utils/map-style.js";
import { geoPointToArrayList } from "../utils/Utils.js";

const Map = ({ sendDataToParent }) => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [data, setData] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 57.430398,
    longitude: 13.708269,
    zoom: 14,
    bearing: 0,
    pitch: 0,
    width: '100%',
    height: 'calc(100vh - 40px)'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getCollection("areas");
        if (!querySnapshot || !Array.isArray(querySnapshot)) {
          console.warn('No areas data received');
          return;
        }

        const temp = {
          type: "FeatureCollection",
          features: [],
        };

        await Promise.all(
          querySnapshot.map(async (doc) => {
            if (!doc || !doc.data) {
              console.warn('Invalid document:', doc);
              return;
            }

            const coordinates = doc.data().coordinates;
            if (!coordinates) {
              console.warn('No coordinates found in document:', doc);
              return;
            }

            let newCoords = geoPointToArrayList(coordinates);
            var polygon = turf.polygon([newCoords]);
            var area = turf.area(polygon);
            let hectar = (area / 10000).toFixed(2);
            let idString = "";

            switch (doc.data().areaID) {
              case "100":
                idString = "";
                break;
              case "200":
                idString = "";
                break;
              case "166":
                idString = "16B";
                break;
              default:
                idString = doc.data().areaID;
            }

            temp.features.push({
              type: "Feature",
              geometry: { type: "Polygon", coordinates: [newCoords] },
              properties: {
                color: parseInt(doc.data().areaID),
                area: hectar,
                label: idString,
              },
              id: doc.data().areaID,
            });
          })
        );

        setData(temp);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchData();
  }, []);

  const _onHover = useCallback((event) => {
    if (!event || !event.features || !isMapLoaded) return;
    
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    
    const hovFeature = features.find((f) => f.layer.id === "area-fill");
    if (hovFeature) {
      setHoveredFeature({ hovFeature, x: offsetX, y: offsetY });
    } else {
      setHoveredFeature(null);
    }
  }, [isMapLoaded]);

  const _onClick = useCallback((event) => {
    if (!event || !event.features || event.features.length === 0 || !isMapLoaded) return;
    const feature = event.features[0].id;
    sendDataToParent(feature);
  }, [sendDataToParent, isMapLoaded]);

  const _renderTooltip = () => {
    if (!hoveredFeature) return null;

    let idString = "";
    switch (hoveredFeature.hovFeature.id) {
      case 100:
        idString = "Myr";
        break;
      case 200:
        idString = "Inägomark";
        break;
      case 166:
        idString = "16B";
        break;
      default:
        idString = `Bestånd ${hoveredFeature.hovFeature.id}`;
    }

    return (
      <div
        className="tooltip"
        style={{
          border: "1px solid black",
          left: hoveredFeature.x + 10,
          top: hoveredFeature.y,
        }}
      >
        <div>{idString}</div>
        <div>Area: {hoveredFeature.hovFeature.properties.area} ha</div>
      </div>
    );
  };

  const _getCursor = useCallback(({ isHovering, isDragging }) => {
    return isHovering ? "pointer" : "default";
  }, []);

  const onViewportChange = useCallback((nextViewport) => {
    setViewport(prev => ({
      ...prev,
      ...nextViewport
    }));
  }, []);

  const onMapLoad = useCallback(() => {
    setIsMapLoaded(true);
  }, []);

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/samochips/ckjlyko950ecl19oa2kmadjxl"
      getCursor={_getCursor}
      onHover={_onHover}
      onClick={_onClick}
      attributionControl={false}
      onViewportChange={onViewportChange}
      onLoad={onMapLoad}
      interactiveLayerIds={isMapLoaded ? ['area-fill'] : []}
      dragPan={true}
      dragRotate={false}
      touchZoom={true}
      doubleClickZoom={true}
      scrollZoom={true}
      touchPitch={false}
      keyboard={false}
    >
      {data && (
        <Source type="geojson" data={data}>
          <Layer
            id="area-fill"
            type="fill"
            paint={{
              'fill-color': [
                'match',
                ['get', 'color'],
                100, '#FF0000',
                200, '#00FF00',
                166, '#0000FF',
                '#CCCCCC'
              ],
              'fill-opacity': 0.5,
              'fill-outline-color': '#000000'
            }}
          />
          <Layer
            id="area-outline"
            type="line"
            paint={{
              'line-color': '#000000',
              'line-width': 1
            }}
          />
          <Layer
            id="area-labels"
            type="symbol"
            layout={{
              'text-field': ['get', 'label'],
              'text-size': 12
            }}
            paint={{
              'text-color': '#000000'
            }}
          />
        </Source>
      )}

      <Source id="polylineLayer" type="geojson" data={lineCollection}>
        <Layer
          id="lineLayer"
          type="line"
          paint={{
            'line-color': 'rgba(255, 0, 0, 0.7)',
            'line-width': 3,
            'line-dasharray': [1, 2]
          }}
        />
      </Source>

      <Source type="geojson" data={houseCollection}>
        <Layer
          id="polygonLayer"
          type="fill"
          paint={{
            'fill-color': 'rgba(255, 255, 255, 0.5)'
          }}
        />
      </Source>

      {_renderTooltip()}
    </ReactMapGL>
  );
};

export default Map;
