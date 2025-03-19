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
    if (!event || !event.features) return;
    
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    
    const hovFeature = features.find((f) => f.layer.id === "data");
    if (hovFeature) {
      setHoveredFeature({ hovFeature, x: offsetX, y: offsetY });
    } else {
      setHoveredFeature(null);
    }
  }, []);

  const _onClick = useCallback((event) => {
    if (!event || !event.features || event.features.length === 0) return;
    const feature = event.features[0].id;
    sendDataToParent(feature);
  }, [sendDataToParent]);

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
      interactiveLayerIds={['data']}
      dragPan={true}
      dragRotate={false}
      touchZoom={true}
      doubleClickZoom={true}
      scrollZoom={true}
      touchPitch={false}
      keyboard={false}
      preserveDrawingBuffer={true}
      renderWorldCopies={false}
      maxZoom={20}
      minZoom={1}
    >
      {data && (
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
          <Layer
            id="lineLayer2"
            type="line"
            source="data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "rgba(0, 0, 0, 0.7)",
              "line-width": 1,
            }}
          />
          <Layer
            type="symbol"
            layout={{
              "text-size": 13,
              "text-field": "{label}",
            }}
          />
        </Source>
      )}

      <Source id="polylineLayer" type="geojson" data={lineCollection}>
        <Layer
          id="lineLayer"
          type="line"
          source="my-data"
          layout={{
            "line-join": "bevel",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "rgba(255, 0, 0, 0.7)",
            "line-width": 3,
            "line-dasharray": [1, 2],
          }}
        />
      </Source>

      <Source type="geojson" data={houseCollection}>
        <Layer
          id="polygonLayer"
          type="fill"
          source="houseCollection"
          paint={{
            "fill-color": "rgba(255, 255, 255, 0.5)",
          }}
        />
      </Source>

      {_renderTooltip()}
    </ReactMapGL>
  );
};

export default Map;
