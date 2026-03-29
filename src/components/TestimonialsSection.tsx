interface DataFact {
  id: string;
  quote: string;
  author: string;
  role: string;
}

const facts: DataFact[] = [
  {
    id: "ФАК-001",
    quote:
      "Заповедник «Утриш» — один из немногих субсредиземноморских лесов на территории России. Здесь произрастает более 500 видов растений, многие из которых занесены в Красную книгу.",
    author: "Заповедник «Утриш»",
    role: "КРАСНОДАРСКИЙ КРАЙ",
  },
  {
    id: "ФАК-002",
    quote:
      "Площадь охраняемой территории составляет около 37 км². Заповедник основан в 2010 году для защиты уникальных можжевелово-фисташковых лесов.",
    author: "Утриш",
    role: "ОСНОВАН В 2010 ГОДУ",
  },
  {
    id: "ФАК-003",
    quote:
      "Мониторинг потери растительности — ключевая задача управления заповедником. Геопортал позволяет отслеживать изменения и принимать оперативные решения по охране.",
    author: "Система мониторинга",
    role: "ГЕОПОРТАЛ УТРИШ",
  },
  {
    id: "ФАК-004",
    quote:
      "Данные из базы GDB формата (ArcGIS) автоматически конвертируются в GeoJSON для отображения на карте. Поддерживается импорт CSV с эколого-экономическими показателями.",
    author: "Технология ГИС",
    role: "ФОРМАТ ARCGIS → GEOJSON",
  },
  {
    id: "ФАК-005",
    quote:
      "Интерактивная карта позволяет специалистам видеть проблемные зоны в реальном времени — без установки ArcGIS Desktop или QGIS на компьютер.",
    author: "Веб-геопортал",
    role: "ДОСТУПНО В БРАУЗЕРЕ",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">О ЗАПОВЕДНИКЕ</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-md leading-tight">
              Факты, которые важно знать
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs hidden md:block">
            Геопортал создан для поддержки научного мониторинга уникальной экосистемы.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {facts.slice(0, 3).map((fact) => (
            <div key={fact.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">ДАННЫЕ</span>
                <span className="text-xs font-mono text-primary">{fact.id}</span>
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-xl">🌿</div>
              </div>
              <p className="text-sm leading-relaxed mb-6">{fact.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{fact.author}</p>
                  <p className="text-xs font-mono text-muted-foreground">{fact.role}</p>
                </div>
                <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
                  <span className="text-[8px]">-&gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {facts.slice(3, 4).map((fact) => (
            <div key={fact.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">ДАННЫЕ</span>
                <span className="text-xs font-mono text-primary">{fact.id}</span>
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-xl">🗺️</div>
              </div>
              <p className="text-sm leading-relaxed mb-6">{fact.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{fact.author}</p>
                  <p className="text-xs font-mono text-muted-foreground">{fact.role}</p>
                </div>
                <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
                  <span className="text-[8px]">-&gt;</span>
                </div>
              </div>
            </div>
          ))}

          {/* Добавить свой слой */}
          <div className="bg-secondary/50 border border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mb-3">
              <span className="text-lg">+</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">ДОБАВИТЬ СЛОЙ</span>
            <p className="text-sm text-muted-foreground mt-1">Загрузите свои данные GeoJSON или CSV.</p>
          </div>

          {facts.slice(4).map((fact) => (
            <div key={fact.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">ДАННЫЕ</span>
                <span className="text-xs font-mono text-primary">{fact.id}</span>
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-xl">💻</div>
              </div>
              <p className="text-sm leading-relaxed mb-6">{fact.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{fact.author}</p>
                  <p className="text-xs font-mono text-muted-foreground">{fact.role}</p>
                </div>
                <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
                  <span className="text-[8px]">-&gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
