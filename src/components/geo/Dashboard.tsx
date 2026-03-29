import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { GeoLayer, SelectedFeature, EcoDataRecord } from "@/types/geo";

interface DashboardProps {
  selectedFeature: SelectedFeature | null;
  ecoData: EcoDataRecord[];
  layers: GeoLayer[];
}

const Dashboard = ({ selectedFeature, ecoData }: DashboardProps) => {
  const [yearFilter, setYearFilter] = useState<number | "all">("all");

  const years = useMemo(() => {
    const set = new Set(ecoData.map((d) => d.year));
    return Array.from(set).sort();
  }, [ecoData]);

  // Данные по годам для линейного графика
  const byYear = useMemo(() => {
    const selectedZone = selectedFeature?.properties?.zone as string | undefined;
    const filtered = selectedZone
      ? ecoData.filter((d) => d.zone === selectedZone)
      : ecoData;

    const map: Record<number, number[]> = {};
    filtered.forEach((d) => {
      if (!map[d.year]) map[d.year] = [];
      map[d.year].push(d.value);
    });
    return Object.entries(map)
      .map(([year, values]) => ({
        year: parseInt(year),
        value: parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)),
      }))
      .sort((a, b) => a.year - b.year);
  }, [ecoData, selectedFeature]);

  // Данные по зонам
  const byZone = useMemo(() => {
    const filtered = yearFilter === "all" ? ecoData : ecoData.filter((d) => d.year === yearFilter);
    const map: Record<string, number[]> = {};
    filtered.forEach((d) => {
      const key = d.zone || d.name;
      if (!map[key]) map[key] = [];
      map[key].push(d.value);
    });
    return Object.entries(map)
      .map(([zone, values]) => ({
        zone,
        value: parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [ecoData, yearFilter]);

  const totalLoss = useMemo(() => {
    const filtered = yearFilter === "all" ? ecoData : ecoData.filter((d) => d.year === yearFilter);
    return filtered.reduce((a, b) => a + b.value, 0).toFixed(1);
  }, [ecoData, yearFilter]);

  return (
    <div className="p-3 space-y-4">
      {/* Header */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground">ДАШБОРД</p>
        <p className="text-sm font-medium mt-0.5">
          {selectedFeature ? selectedFeature.properties.name as string || "Выбранный объект" : "Все данные"}
        </p>
      </div>

      {/* Selected feature info */}
      {selectedFeature && (
        <div className="bg-secondary/50 rounded-xl p-3 space-y-1.5">
          <p className="text-[10px] font-mono text-muted-foreground">ОБЪЕКТ</p>
          {Object.entries(selectedFeature.properties).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-2">
              <span className="text-[10px] font-mono text-muted-foreground truncate">{key}:</span>
              <span className="text-[10px] font-mono text-foreground truncate max-w-[120px]">
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Year filter */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground mb-1.5">ФИЛЬТР ПО ГОДУ</p>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setYearFilter("all")}
            className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-colors ${yearFilter === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
          >
            ВСЕ
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYearFilter(y)}
              className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-colors ${yearFilter === y ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="bg-secondary/50 rounded-xl p-3">
        <p className="text-[10px] font-mono text-muted-foreground">СУММАРНАЯ ПОТЕРЯ (га)</p>
        <p className="font-serif text-2xl mt-1">{totalLoss}</p>
        <p className="text-[10px] font-mono text-muted-foreground">
          {yearFilter === "all" ? "за все годы" : `за ${yearFilter} год`}
        </p>
      </div>

      {/* Line chart — динамика */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground mb-2">
          ДИНАМИКА ПО ГОДАМ{selectedFeature?.properties?.zone ? ` — ${selectedFeature.properties.zone}` : ""}
        </p>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={byYear} margin={{ top: 4, right: 8, bottom: 4, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fontSize: 9, fontFamily: "monospace" }} />
            <YAxis tick={{ fontSize: 9, fontFamily: "monospace" }} />
            <Tooltip
              contentStyle={{ fontSize: 10, fontFamily: "monospace", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              formatter={(v: number) => [`${v} га`, "Потеря"]}
            />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart — по зонам */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground mb-2">
          ПОТЕРЯ ПО ЗОНАМ{yearFilter !== "all" ? ` (${yearFilter})` : ""}
        </p>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={byZone} margin={{ top: 4, right: 8, bottom: 4, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="zone" tick={{ fontSize: 9, fontFamily: "monospace" }} />
            <YAxis tick={{ fontSize: 9, fontFamily: "monospace" }} />
            <Tooltip
              contentStyle={{ fontSize: 10, fontFamily: "monospace", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              formatter={(v: number) => [`${v} га`, "Потеря"]}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Records count */}
      <div className="text-[10px] font-mono text-muted-foreground text-center pt-2 border-t border-border">
        {ecoData.length} записей в базе данных
      </div>
    </div>
  );
};

export default Dashboard;
