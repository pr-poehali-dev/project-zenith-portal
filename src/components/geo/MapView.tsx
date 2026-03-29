import { useEffect, useRef } from "react";
import { GeoLayer, SelectedFeature } from "@/types/geo";

declare global {
  interface Window {
     
    ymaps: Record<string, unknown>;
  }
}

interface MapViewProps {
  layers: GeoLayer[];
  selectedFeature: SelectedFeature | null;
  onFeatureSelect: (feature: SelectedFeature | null) => void;
}

const YMAP_API_KEY = import.meta.env.VITE_YANDEX_MAPS_KEY || "";

const COLOR_STOPS = [
  { max: 2.5, color: "#27ae60" },
  { max: 5.0, color: "#f1c40f" },
  { max: 7.5, color: "#e67e22" },
  { max: Infinity, color: "#e74c3c" },
];

function getColor(value: number): string {
  return COLOR_STOPS.find((s) => value <= s.max)?.color ?? "#e74c3c";
}

function getValueRange(features: GeoJSON.Feature[], field: string): [number, number] {
  const vals = features
    .map((f) => (f.properties as Record<string, unknown>)?.[field])
    .filter((v): v is number => typeof v === "number");
  if (!vals.length) return [0, 10];
  return [Math.min(...vals), Math.max(...vals)];
}

let scriptLoaded = false;

function loadYMaps(apiKey: string): Promise<void> {
  return new Promise((resolve) => {
    if (window.ymaps) { resolve(); return; }
    if (scriptLoaded) {
      const wait = () => (window.ymaps ? resolve() : setTimeout(wait, 100));
      wait(); return;
    }
    scriptLoaded = true;
    const src = apiKey
      ? `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`
      : `https://api-maps.yandex.ru/2.1/?lang=ru_RU`;
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => window.ymaps.ready(resolve);
    document.head.appendChild(s);
  });
}

function buildBalloon(props: Record<string, unknown>): string {
  const rows = Object.entries(props)
    .map(([k, v]) => `<tr><td style="padding:2px 6px;color:#666;font-size:11px">${k}</td><td style="padding:2px 6px;font-size:11px"><b>${v}</b></td></tr>`)
    .join("");
  return `<table style="border-collapse:collapse">${rows}</table>`;
}

const MapView = ({ layers, onFeatureSelect, selectedFeature }: MapViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Record<string, unknown> | null>(null);
  const geoObjectsRef = useRef<Record<string, Record<string, unknown>>>({});

  useEffect(() => {
    loadYMaps(YMAP_API_KEY).then(() => {
      if (!containerRef.current || mapRef.current) return;
      mapRef.current = new window.ymaps.Map(containerRef.current, {
        center: [44.77, 37.13],
        zoom: 12,
        controls: ["zoomControl", "fullscreenControl"],
      });
    });
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
        scriptLoaded = false;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Удалить исчезнувшие слои
    Object.keys(geoObjectsRef.current).forEach((id) => {
      if (!layers.find((l) => l.id === id)) {
        map.geoObjects.remove(geoObjectsRef.current[id]);
        delete geoObjectsRef.current[id];
      }
    });

    layers.forEach((layer) => {
      if (geoObjectsRef.current[layer.id]) {
        map.geoObjects.remove(geoObjectsRef.current[layer.id]);
        delete geoObjectsRef.current[layer.id];
      }
      if (!layer.data || layer.type !== "geojson") return;

      const fc = layer.data as GeoJSON.FeatureCollection;
      const features = fc.features || [];
      const collection = new window.ymaps.GeoObjectCollection();

      features.forEach((feature: GeoJSON.Feature) => {
        const geom = feature.geometry;
        const props = (feature.properties || {}) as Record<string, unknown>;
        if (!geom) return;

        let fillColor = layer.color.replace("#", "");
        if (layer.valueField && props[layer.valueField] !== undefined) {
          fillColor = getColor(props[layer.valueField] as number).replace("#", "");
        }

        const opacityHex = Math.round(layer.opacity * 200)
          .toString(16)
          .padStart(2, "0");

        let obj: Record<string, unknown> | null = null;

        if (geom.type === "Polygon") {
          const coords = (geom as GeoJSON.Polygon).coordinates[0].map(
            ([lng, lat]) => [lat, lng]
          );
          obj = new window.ymaps.Polygon([coords], {
            hintContent: (props.name as string) || (props.zone as string) || "Объект",
            balloonContent: buildBalloon(props),
          }, {
            fillColor: fillColor + opacityHex,
            strokeColor: fillColor,
            strokeWidth: 2,
          });
        } else if (geom.type === "Point") {
          const [lng, lat] = (geom as GeoJSON.Point).coordinates;
          obj = new window.ymaps.Placemark([lat, lng], {
            hintContent: (props.name as string) || "Точка",
            balloonContent: buildBalloon(props),
          }, {
            preset: "islands#circleIcon",
            iconColor: "#" + fillColor,
          });
        } else if (geom.type === "LineString") {
          const coords = (geom as GeoJSON.LineString).coordinates.map(
            ([lng, lat]) => [lat, lng]
          );
          obj = new window.ymaps.Polyline(coords, {
            hintContent: (props.name as string) || "Линия",
            balloonContent: buildBalloon(props),
          }, {
            strokeColor: "#" + fillColor,
            strokeWidth: 3,
          });
        }

        if (obj) {
          obj.events.add("click", () => {
            onFeatureSelect({ layerId: layer.id, layerName: layer.name, properties: props });
          });
          collection.add(obj);
        }
      });

      if (layer.visible) {
        map.geoObjects.add(collection);
      }
      geoObjectsRef.current[layer.id] = collection;
    });
  }, [layers, onFeatureSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border rounded-xl p-3 text-xs font-mono space-y-1.5 z-10 pointer-events-none">
        <p className="text-muted-foreground mb-1">ЛЕГЕНДА — потеря (га)</p>
        {[
          { color: "#e74c3c", label: "> 7.5 га — критично" },
          { color: "#e67e22", label: "5–7.5 га — высокая" },
          { color: "#f1c40f", label: "2.5–5 га — средняя" },
          { color: "#27ae60", label: "< 2.5 га — норма" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {!selectedFeature && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur border border-border rounded-full px-4 py-1.5 text-[11px] font-mono text-muted-foreground z-10 pointer-events-none whitespace-nowrap">
          Кликните на зону для просмотра данных
        </div>
      )}

      {!YMAP_API_KEY && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-[11px] font-mono text-amber-700 z-10 pointer-events-none text-center">
          ⚠️ Добавьте VITE_YANDEX_MAPS_KEY в переменные окружения
        </div>
      )}
    </div>
  );
};

export default MapView;