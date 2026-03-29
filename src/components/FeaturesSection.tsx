import { Check } from "lucide-react";
import Icon from "@/components/ui/icon";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">МОДУЛИ_СИСТЕМЫ</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-lg leading-tight">
              Полноценная ГИС-система прямо в браузере
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs hidden md:block">
            Не нужно устанавливать ArcGIS или QGIS — все инструменты доступны онлайн.
          </p>
        </div>

        {/* Top row features */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Layer control */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">ФУНКЦИЯ</span>
              <span className="text-xs font-mono text-muted-foreground">УПРАВЛЕНИЕ_СЛОЯМИ</span>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6 space-y-2">
              {[
                { color: "#e74c3c", label: "Потеря растительности", active: true },
                { color: "#3498db", label: "Водные объекты", active: true },
                { color: "#f39c12", label: "Охранные зоны", active: false },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: l.color, opacity: l.active ? 1 : 0.3 }}
                  />
                  <span className={`text-xs ${l.active ? "text-foreground" : "text-muted-foreground"}`}>{l.label}</span>
                  <div className={`ml-auto w-6 h-3 rounded-full ${l.active ? "bg-primary" : "bg-border"}`} />
                </div>
              ))}
            </div>
            <h3 className="font-semibold text-lg mb-2">Управление слоями</h3>
            <p className="text-sm text-muted-foreground">
              Включайте и отключайте слои, управляйте прозрачностью, накладывайте карты как в ArcGIS.
            </p>
          </div>

          {/* GeoJSON import */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">ФУНКЦИЯ</span>
              <span className="text-xs font-mono text-muted-foreground">ЗАГРУЗКА_ДАННЫХ</span>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-3 gap-2">
                {["GeoJSON", "CSV", "ZIP/GDB", "SHP", "KML", "GeoTIFF"].map((fmt, i) => (
                  <div
                    key={fmt}
                    className={`text-center p-2 rounded-lg ${i < 3 ? "bg-card border border-border" : "border border-dashed border-border"}`}
                  >
                    <div className="w-6 h-6 mx-auto mb-1 rounded bg-secondary flex items-center justify-center">
                      <Icon name="FileText" size={12} />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground">{fmt}</span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Импорт из ArcGIS</h3>
            <p className="text-sm text-muted-foreground">Загружайте GeoJSON, CSV и другие форматы прямо из браузера без лишних шагов.</p>
          </div>

          {/* Privacy */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">ФУНКЦИЯ</span>
              <span className="text-xs font-mono text-muted-foreground">ЦВЕТОВАЯ_КЛАССИФИКАЦИЯ</span>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6 flex items-center justify-center">
              <div className="space-y-1.5 w-full">
                {[
                  { label: "Высокая потеря", color: "#e74c3c", width: "100%" },
                  { label: "Средняя", color: "#e67e22", width: "70%" },
                  { label: "Низкая", color: "#f1c40f", width: "45%" },
                  { label: "Норма", color: "#27ae60", width: "20%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[9px] font-mono text-muted-foreground w-24">{item.label}</span>
                    <div className="flex-1 h-1.5 bg-border rounded-full">
                      <div className="h-full rounded-full" style={{ width: item.width, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Цветовая градация</h3>
            <p className="text-sm text-muted-foreground">
              Автоматическая классификация объектов по значениям — красным цветом сразу видно проблемные зоны.
            </p>
          </div>
        </div>

        {/* Bottom row features */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Dashboard */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex gap-6">
              <div className="bg-secondary/50 rounded-xl p-4 flex-shrink-0 flex items-center justify-center">
                <div className="flex items-end gap-1 h-16 w-20">
                  {[4, 6, 5, 8, 7, 9, 6].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{ height: `${h * 8}%`, backgroundColor: i === 5 ? "hsl(var(--primary))" : "hsl(var(--accent))" }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">АНАЛИТИКА</span>
                </div>
                <h3 className="font-semibold text-2xl mb-1">Дашборд и графики</h3>
                <p className="text-sm text-muted-foreground">
                  Клик по объекту на карте — дашборд автоматически показывает данные по этой зоне. Фильтры по годам и показателям.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">ВРЕМЕННОЙ_РЯД</span>
                </div>
                <h3 className="font-semibold text-2xl mb-1">Шкала по годам</h3>
                <p className="text-sm text-muted-foreground">
                  Смотрите, как менялась ситуация год за годом. Сравнивайте слои и показатели за разные периоды.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 flex-shrink-0 flex flex-col justify-center gap-2">
                {["2020", "2021", "2022", "2023", "2024"].map((year, i) => (
                  <div key={year} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: i === 4 ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                    />
                    <span className="text-[10px] font-mono text-muted-foreground">{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
