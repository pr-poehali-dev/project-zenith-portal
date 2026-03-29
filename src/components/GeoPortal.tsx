import { useState, useCallback, useRef } from "react";
import MapView from "@/components/geo/MapView";
import LayersPanel from "@/components/geo/LayersPanel";
import Dashboard from "@/components/geo/Dashboard";
import DataManager from "@/components/geo/DataManager";
import { GeoLayer, SelectedFeature, EcoDataRecord } from "@/types/geo";
import { SAMPLE_VEGETATION_LOSS } from "@/data/sampleData";
import Icon from "@/components/ui/icon";

const INITIAL_LAYERS: GeoLayer[] = [
  {
    id: "vegetation-loss",
    name: "Потеря растительности",
    type: "geojson",
    visible: true,
    opacity: 0.7,
    color: "#e74c3c",
    data: SAMPLE_VEGETATION_LOSS,
    valueField: "loss_ha",
  },
  {
    id: "reserve-boundary",
    name: "Граница заповедника",
    type: "geojson",
    visible: true,
    opacity: 1,
    color: "#2d4a3e",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Граница заповедника «Утриш»" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [37.05, 44.72],
              [37.20, 44.72],
              [37.20, 44.82],
              [37.05, 44.82],
              [37.05, 44.72],
            ]],
          },
        },
      ],
    },
  },
];

const GeoPortal = () => {
  const [layers, setLayers] = useState<GeoLayer[]>(INITIAL_LAYERS);
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);
  const [activeTab, setActiveTab] = useState<"layers" | "data">("layers");
  const [ecoData, setEcoData] = useState<EcoDataRecord[]>([
    { id: "1", name: "Потеря растительности", value: 4.2, year: 2020, description: "Зона 12-А", zone: "12-А" },
    { id: "2", name: "Потеря растительности", value: 5.1, year: 2021, description: "Зона 12-А", zone: "12-А" },
    { id: "3", name: "Потеря растительности", value: 3.8, year: 2022, description: "Зона 12-А", zone: "12-А" },
    { id: "4", name: "Потеря растительности", value: 6.3, year: 2023, description: "Зона 12-А", zone: "12-А" },
    { id: "5", name: "Потеря растительности", value: 2.9, year: 2024, description: "Зона 12-А", zone: "12-А" },
    { id: "6", name: "Потеря растительности", value: 7.1, year: 2020, description: "Зона 8-Б", zone: "8-Б" },
    { id: "7", name: "Потеря растительности", value: 6.5, year: 2021, description: "Зона 8-Б", zone: "8-Б" },
    { id: "8", name: "Потеря растительности", value: 8.2, year: 2022, description: "Зона 8-Б", zone: "8-Б" },
    { id: "9", name: "Потеря растительности", value: 5.4, year: 2023, description: "Зона 8-Б", zone: "8-Б" },
    { id: "10", name: "Потеря растительности", value: 4.1, year: 2024, description: "Зона 8-Б", zone: "8-Б" },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleLayerToggle = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const handleOpacityChange = (id: string, opacity: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, opacity } : l))
    );
  };

  const handleLayerRemove = (id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
  };

  const handleGeoJsonUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        const newLayer: GeoLayer = {
          id: `layer-${Date.now()}`,
          name: file.name.replace(".geojson", "").replace(".json", ""),
          type: "geojson",
          visible: true,
          opacity: 0.7,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
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
      const records: EcoDataRecord[] = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map((c) => c.trim());
        const rec: EcoDataRecord = {
          id: `csv-${Date.now()}-${i}`,
          name: cols[headers.indexOf("name")] || cols[0] || "Показатель",
          value: parseFloat(cols[headers.indexOf("value")] || cols[1]) || 0,
          year: parseInt(cols[headers.indexOf("year")] || cols[2]) || 2024,
          description: cols[headers.indexOf("description")] || "",
          zone: cols[headers.indexOf("zone")] || "",
        };
        records.push(rec);
      }
      setEcoData((prev) => [...prev, ...records]);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-foreground rounded-sm flex items-center justify-center">
            <span className="text-[10px] font-mono">У</span>
          </div>
          <span className="font-mono text-sm font-medium">Утриш ГИС — Геопортал</span>
          <span className="text-[10px] font-mono text-muted-foreground bg-accent/50 px-2 py-0.5 rounded-full ml-2">
            {layers.filter((l) => l.visible).length} слоев активно
          </span>
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
        {/* Left panel — layers */}
        <div className="w-64 border-r border-border flex flex-col">
          {/* Tabs */}
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
              <DataManager data={ecoData} onDataChange={setEcoData} />
            )}
          </div>
        </div>

        {/* Center — map */}
        <div className="flex-1 relative">
          <MapView
            layers={layers}
            onFeatureSelect={setSelectedFeature}
            selectedFeature={selectedFeature}
          />
        </div>

        {/* Right panel — dashboard */}
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
