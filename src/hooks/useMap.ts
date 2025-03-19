import { useState, useEffect, useCallback } from 'react';
import { ViewState } from 'react-map-gl';

interface MapState extends ViewState {
  zoom: number;
  longitude: number;
  latitude: number;
}

export const useMap = (initialState: Partial<MapState> = {}) => {
  const [viewState, setViewState] = useState<MapState>({
    zoom: 12,
    longitude: 0,
    latitude: 0,
    ...initialState,
  });

  const onMove = useCallback(({ viewState }: { viewState: MapState }) => {
    setViewState(viewState);
  }, []);

  const flyTo = useCallback((longitude: number, latitude: number, zoom: number = 12) => {
    setViewState((prev) => ({
      ...prev,
      longitude,
      latitude,
      zoom,
    }));
  }, []);

  return {
    viewState,
    onMove,
    flyTo,
  };
}; 