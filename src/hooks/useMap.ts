import { useState, useCallback } from 'react';
import { ViewState } from 'react-map-gl';

interface MapStateExtended extends ViewState {
  width: string | number;
  height: string | number;
  bearing: number;
  pitch: number;
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

export const useMap = (initialState: Partial<MapStateExtended> = {}) => {
  const [viewState, setViewState] = useState<MapStateExtended>({
    latitude: 57.430398,
    longitude: 13.708269,
    zoom: 14,
    bearing: 0,
    pitch: 0,
    width: '100%',
    height: 'calc(100vh - 40px)',
    ...initialState
  });

  const onViewportChange = useCallback((nextViewport: Partial<MapStateExtended>) => {
    setViewState(prev => ({
      ...prev,
      ...nextViewport
    }));
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
    onViewportChange,
    flyTo,
  };
}; 