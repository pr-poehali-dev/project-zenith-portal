import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoLayer, SelectedFeature } from "@/types/geo";

interface MapViewProps {
  layers: GeoLayer[];
  selectedFeature: SelectedFeature | null;
  onFeatureSelect: (feature: SelectedFeature | null) => void;
}

const getColorByValue = (value: number, min: number, max: number): string => {
  const ratio = max === min ? 0.5 : (value - min) / (max - min);
  if (ratio < 0.25) return "#27ae60";
  if (ratio < 0.5) return "#f1c40f";
  if (ratio < 0.75) return "#e67e22";
  return "#e74c3c";
};

const MapView = ({ layers, selectedFeature, onFeatureSelect }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerGroupsRef = useRef<Record<string, L.Layer>>({});

  // Инициализация карты
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [44.76, 37.13],
      zoom: 12,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Обновление слоёв
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Удалить старые слои которые больше не в списке
    Object.keys(layerGroupsRef.current).forEach((id) => {
      if (!layers.find((l) => l.id === id)) {
        map.removeLayer(layerGroupsRef.current[id]);
        delete layerGroupsRef.current[id];
      }
    });

    layers.forEach((layer) => {
      if (!layer.data || layer.type !== "geojson") return;

      // Удалить и пересоздать если слой уже был
      if (layerGroupsRef.current[layer.id]) {
        map.removeLayer(layerGroupsRef.current[layer.id]);
      }

      // Считаем мин/макс для value field
      let min = Infinity;
      let max = -Infinity;
      if (layer.valueField) {
        const fc = layer.data as GeoJSON.FeatureCollection;
        (fc.features || []).forEach((f) => {
          const v = f.properties?.[layer.valueField!];
          if (typeof v === "number") {
            if (v < min) min = v;
            if (v > max) max = v;
          }
        });
      }

      const geoLayer = L.geoJSON(layer.data as GeoJSON.GeoJsonObject, {
        style: (feature) => {
          let fillColor = layer.color;
          if (layer.valueField && feature?.properties?.[layer.valueField] !== undefined) {
            fillColor = getColorByValue(feature.properties[layer.valueField], min, max);
          }
          return {
            fillColor,
            fillOpacity: layer.opacity * 0.6,
            color: layer.color,
            weight: 2,
            opacity: layer.opacity,
          };
        },
        onEachFeature: (feature, leafletLayer) => {
          leafletLayer.on("click", () => {
            onFeatureSelect({
              layerId: layer.id,
              layerName: layer.name,
              properties: feature.properties || {},
            });
          });
          leafletLayer.on("mouseover", (e) => {
            (e.target as L.Path).setStyle({ weight: 3, fillOpacity: layer.opacity * 0.9 });
          });
          leafletLayer.on("mouseout", (e) => {
            geoLayer.resetStyle(e.target as L.Path);
          });
        },
      });

      if (layer.visible) {
        geoLayer.addTo(map);
      }

      layerGroupsRef.current[layer.id] = geoLayer;
    });
  }, [layers, onFeatureSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border rounded-xl p-3 text-xs font-mono space-y-1.5 z-[1000]">
        <p className="text-muted-foreground mb-1">ЛЕГЕНДА</p>
        {[
          { color: "#e74c3c", label: "Критическая потеря" },
          { color: "#e67e22", label: "Высокая потеря" },
          { color: "#f1c40f", label: "Средняя потеря" },
          { color: "#27ae60", label: "Низкая / норма" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Click hint */}
      {!selectedFeature && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur border border-border rounded-full px-4 py-1.5 text-[11px] font-mono text-muted-foreground z-[1000]">
          Кликните на объект для просмотра данных
        </div>
      )}
    </div>
  );
};

export default MapView;
