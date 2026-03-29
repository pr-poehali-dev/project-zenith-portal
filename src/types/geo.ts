export interface GeoLayer {
  id: string;
  name: string;
  type: "geojson" | "tile";
  visible: boolean;
  opacity: number;
  color: string;
  data?: GeoJSON.FeatureCollection | GeoJSON.Feature;
  tileUrl?: string;
  valueField?: string;
}

export interface SelectedFeature {
  layerId: string;
  layerName: string;
  properties: Record<string, unknown>;
  coordinates?: [number, number];
}

export interface EcoDataRecord {
  id: string;
  name: string;
  value: number;
  year: number;
  description?: string;
  zone?: string;
}
