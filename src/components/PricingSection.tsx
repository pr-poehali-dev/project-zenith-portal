import { Check } from "lucide-react";

interface DataModule {
  name: string;
  status: string;
  description: string;
  layers: string[];
  available?: boolean;
  current?: boolean;
}

const modules: DataModule[] = [
  {
    name: "ТЕКУЩИЙ ЭТАП",
    status: "В работе",
    description: "Базовый мониторинг растительности.",
    layers: [
      "Потеря растительности (GeoJSON)",
      "Граница заповедника",
      "Цветовая классификация зон",
      "Дашборд с графиками",
      "Фильтр по годам",
    ],
    current: true,
  },
  {
    name: "СЛЕДУЮЩИЙ ЭТАП",
    status: "Планируется",
    description: "Расширенный экологический мониторинг.",
    layers: [
      "Водные объекты и реки",
      "Охранные буферные зоны",
      "Точки мониторинга (CSV)",
      "Слой пожаров и вырубок",
      "Экономические показатели",
    ],
    available: true,
  },
  {
    name: "ПЕРСПЕКТИВА",
    status: "В проработке",
    description: "Полная аналитическая платформа.",
    layers: [
      "Всё из предыдущих этапов",
      "Спутниковые снимки (WMS)",
      "Редактирование данных онлайн",
      "Экспорт отчётов",
      "Сравнение периодов",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="data" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">ДОРОЖНАЯ КАРТА</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4">
            Что уже есть
            <br />
            и что будет дальше
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-[#fffef0] px-3 py-1 rounded shadow-sm rotate-[-2deg] border border-amber-100">
              <span className="text-xs font-mono">ВЕРСИЯ_1.0</span>
            </div>
            <p className="text-muted-foreground text-sm">Добавляем данные и функции по вашему запросу</p>
            <div className="bg-[#fffef0] px-3 py-1 rounded shadow-sm rotate-[2deg] border border-amber-100">
              <span className="text-xs font-mono">ГИБКО</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {modules.map((module) => (
            <div
              key={module.name}
              className={`bg-card border rounded-2xl p-6 relative flex flex-col ${
                module.current ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {module.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-mono px-3 py-1 rounded-full">
                  СЕЙЧАС
                </div>
              )}

              <div className="mb-6">
                <span className="text-xs font-mono text-muted-foreground">{module.name}</span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-serif">{module.status}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{module.description}</p>
              </div>

              <div className="space-y-3 flex-1">
                {module.layers.map((layer) => (
                  <div key={layer} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-accent-foreground" />
                    </div>
                    <span className="text-sm">{layer}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-full text-sm font-medium transition-colors mt-6 ${
                  module.current
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                {module.current ? "ОТКРЫТЬ ГЕОПОРТАЛ" : "ОБСУДИТЬ"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
