import { useState, useCallback, useRef, useEffect } from "react";
import MapView from "@/components/geo/MapView";
import LayersPanel from "@/components/geo/LayersPanel";
import Dashboard from "@/components/geo/Dashboard";
import DataManager from "@/components/geo/DataManager";
import { GeoLayer, SelectedFeature, EcoDataRecord } from "@/types/geo";
import { SAMPLE_VEGETATION_LOSS } from "@/data/sampleData";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/027a2c9c-c760-4c47-9c37-cf537697f5fc";

const BOUNDARY_LAYER: GeoLayer = {
  id: "reserve-boundary",
  name: "Граница заповедника",
  type: "geojson",
  visible: true,
  opacity: 1,
  color: "#2d4a3e",
  data: {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      properties: { name: "Граница заповедника «Утриш»" },
      geometry: {
        type: "Polygon",
        coordinates: [[[37.05, 44.72],[37.20, 44.72],[37.20, 44.82],[37.05, 44.82],[37.05, 44.72]]],
      },
    }],
  },
};

const VEGETATION_LAYER: GeoLayer = {
  id: "vegetation-loss",
  name: "Потеря растительности",
  type: "geojson",
  visible: true,
  opacity: 0.7,
  color: "#e74c3c",
  data: SAMPLE_VEGETATION_LOSS,
  valueField: "loss_ha",
};

const GeoPortal = () => {
  const [layers, setLayers] = useState<GeoLayer[]>([VEGETATION_LAYER, BOUNDARY_LAYER]);
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);
  const [activeTab, setActiveTab] = useState<"layers" | "data">("layers");
  const [ecoData, setEcoData] = useState<EcoDataRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  // Загружаем эко-данные из бэкэнда при старте
  useEffect(() => {
    fetch(`${API}/eco`)
      .then((r) => r.json())
      .then((d) => {
        if (d.records) {
          setEcoData(d.records.map((r: EcoDataRecord & { id: number }) => ({
            ...r,
            id: String(r.id),
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLayerToggle = (id: string) =>
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));

  const handleOpacityChange = (id: string, opacity: number) =>
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, opacity } : l)));

  const handleLayerRemove = (id: string) =>
    setLayers((prev) => prev.filter((l) => l.id !== id));

  const handleGeoJsonUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        const newLayer: GeoLayer = {
          id: `layer-${Date.now()}`,
          name: file.name.replace(/\.(geojson|json)$/, ""),
          type: "geojson",
          visible: true,
          opacity: 0.7,
          color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          data,
        };
        setLayers((prev) => [...prev, newLayer]);
      } catch {
        alert("Ошибка при чтении GeoJSON файла");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const handleCsvUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split("\n").filter(Boolean);
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const records: EcoDataRecord[] = lines.slice(1).map((line, i) => {
        const cols = line.split(",").map((c) => c.trim());
        return {
          id: `csv-${Date.now()}-${i}`,
          name: cols[headers.indexOf("name")] || cols[0] || "Показатель",
          value: parseFloat(cols[headers.indexOf("value")] || cols[1]) || 0,
          year: parseInt(cols[headers.indexOf("year")] || cols[2]) || 2024,
          description: cols[headers.indexOf("description")] || "",
          zone: cols[headers.indexOf("zone")] || "",
        };
      });
      setEcoData((prev) => [...prev, ...records]);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  // Добавить запись в БД
  const handleDataAdd = useCallback(async (record: Omit<EcoDataRecord, "id">) => {
    const res = await fetch(`${API}/eco`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    const d = await res.json();
    setEcoData((prev) => [...prev, { ...record, id: String(d.id) }]);
  }, []);

  // Обновить запись в БД
  const handleDataUpdate = useCallback(async (record: EcoDataRecord) => {
    await fetch(`${API}/eco`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    setEcoData((prev) => prev.map((r) => (r.id === record.id ? record : r)));
  }, []);

  // Удалить запись из БД
  const handleDataDelete = useCallback(async (id: string) => {
    await fetch(`${API}/eco?id=${id}`, { method: "DELETE" });
    setEcoData((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-foreground rounded-sm flex items-center justify-center">
            <span className="text-[10px] font-mono">У</span>
          </div>
          <span className="font-mono text-sm font-medium">Утриш ГИС — Геопортал</span>
          <span className="text-[10px] font-mono text-muted-foreground bg-accent/50 px-2 py-0.5 rounded-full ml-2">
            {layers.filter((l) => l.visible).length} слоёв активно
          </span>
          {loading && (
            <span className="text-[10px] font-mono text-muted-foreground animate-pulse">загрузка данных...</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" accept=".geojson,.json" className="hidden" onChange={handleGeoJsonUpload} />
          <input ref={csvInputRef} type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs font-mono border border-border px-3 py-1.5 rounded-full hover:bg-secondary transition-colors"
          >
            <Icon name="Upload" size={12} />
            GeoJSON
          </button>
          <button
            onClick={() => csvInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs font-mono border border-border px-3 py-1.5 rounded-full hover:bg-secondary transition-colors"
          >
            <Icon name="Upload" size={12} />
            CSV
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex h-[680px]">
        {/* Left — слои / данные */}
        <div className="w-64 border-r border-border flex flex-col">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("layers")}
              className={`flex-1 text-xs font-mono py-2.5 transition-colors ${activeTab === "layers" ? "bg-background text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              СЛОИ
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex-1 text-xs font-mono py-2.5 transition-colors ${activeTab === "data" ? "bg-background text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              ДАННЫЕ
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeTab === "layers" ? (
              <LayersPanel
                layers={layers}
                onToggle={handleLayerToggle}
                onOpacityChange={handleOpacityChange}
                onRemove={handleLayerRemove}
              />
            ) : (
              <DataManager
                data={ecoData}
                onAdd={handleDataAdd}
                onUpdate={handleDataUpdate}
                onDelete={handleDataDelete}
              />
            )}
          </div>
        </div>

        {/* Center — карта */}
        <div className="flex-1 relative">
          <MapView
            layers={layers}
            onFeatureSelect={setSelectedFeature}
            selectedFeature={selectedFeature}
          />
        </div>

        {/* Right — дашборд */}
        <div className="w-72 border-l border-border overflow-y-auto">
          <Dashboard
            selectedFeature={selectedFeature}
            ecoData={ecoData}
            layers={layers}
          />
        </div>
      </div>
    </div>
  );
};

export default GeoPortal;
