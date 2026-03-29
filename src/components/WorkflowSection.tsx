interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  visual: "upload" | "layers" | "analyze" | "export";
}

const steps: WorkflowStep[] = [
  {
    number: "01",
    title: "Загрузка данных",
    description: "Загрузите GeoJSON из ArcGIS или CSV-таблицы с показателями мониторинга.",
    visual: "upload",
  },
  {
    number: "02",
    title: "Управление слоями",
    description: "Включайте и отключайте слои, меняйте прозрачность, накладывайте карты друг на друга.",
    visual: "layers",
  },
  {
    number: "03",
    title: "Анализ на карте",
    description: "Кликайте на объекты — графики и дашборд обновляются автоматически.",
    visual: "analyze",
  },
  {
    number: "04",
    title: "Выводы и отчёты",
    description: "Фильтруйте по годам, сравнивайте показатели, отслеживайте динамику изменений.",
    visual: "export",
  },
];

const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">КАК РАБОТАЕТ</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-md leading-tight">
              От данных ArcGIS до аналитики за минуты.
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs hidden md:block">
            Простой процесс без технических знаний. Загрузил — увидел — проанализировал.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 h-full">
                {/* Visual placeholder */}
                <div className="aspect-square bg-secondary/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                  {step.visual === "upload" && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 border-2 border-dashed border-primary/50 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📂</span>
                      </div>
                      <div className="text-[9px] font-mono text-muted-foreground text-center">
                        <p>GeoJSON</p>
                        <p>CSV</p>
                        <p>GDB → ZIP</p>
                      </div>
                    </div>
                  )}
                  {step.visual === "layers" && (
                    <div className="space-y-2 w-full px-4">
                      {[
                        { color: "#e74c3c", label: "Растительность", opacity: "100%" },
                        { color: "#3498db", label: "Водоёмы", opacity: "70%" },
                        { color: "#2d4a3e", label: "Граница", opacity: "100%" },
                      ].map((l) => (
                        <div key={l.label} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: l.color }} />
                          <div className="flex-1 h-2 bg-border rounded-full">
                            <div className="h-full bg-foreground/30 rounded-full" style={{ width: l.opacity }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {step.visual === "analyze" && (
                    <div className="w-full px-3">
                      <div className="bg-card border border-border rounded-lg p-2 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-mono text-muted-foreground">ДАШБОРД</span>
                          <span className="text-[9px] font-mono text-green-600">ОБНОВЛЁН</span>
                        </div>
                        <div className="flex items-end gap-1 h-10">
                          {[3, 5, 4, 7, 6, 8, 5].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-primary/50 rounded-sm"
                              style={{ height: `${h * 10}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {step.visual === "export" && (
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center gap-1 bg-accent/50 rounded-full px-3 py-1.5">
                        <span className="text-[10px] font-mono">2021</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-1 w-6 bg-border rounded" />
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="h-1 w-6 bg-border rounded" />
                      </div>
                      <div className="inline-flex items-center gap-1 bg-primary/20 rounded-full px-3 py-1.5">
                        <span className="text-[10px] font-mono">2024</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{step.number}</span>
                </div>
                <h3 className="font-medium text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
