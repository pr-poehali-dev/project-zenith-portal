import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" id="map">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
              <span>ГЕОПОРТАЛ ЗАПОВЕДНИКА — ВЕРСИЯ 1.0</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-balance">
              Природа,
              <br />
              видимая с высоты.
            </h1>

            <p className="text-muted-foreground text-lg max-w-md">
              Интерактивный геопортал для мониторинга эколого-экономических показателей заповедника «Утриш». Загружайте GeoJSON из ArcGIS, анализируйте данные, отслеживайте изменения по годам.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#portal"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Открыть геопортал
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
              >
                Узнать возможности
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 pt-4 border-t border-border">
              <div>
                <p className="font-serif text-2xl">37 км²</p>
                <p className="text-xs font-mono text-muted-foreground">ПЛОЩАДЬ ЗАПОВЕДНИКА</p>
              </div>
              <div>
                <p className="font-serif text-2xl">500+</p>
                <p className="text-xs font-mono text-muted-foreground">ВИДОВ РАСТЕНИЙ</p>
              </div>
              <div>
                <p className="font-serif text-2xl">ГИС</p>
                <p className="text-xs font-mono text-muted-foreground">АНАЛИЗ ДАННЫХ</p>
              </div>
            </div>
          </div>

          {/* Right visual — карта-мокап */}
          <div className="relative">
            <div className="relative bg-secondary/50 rounded-3xl p-8 border border-border/50 overflow-hidden">
              {/* Top labels */}
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-4">
                <span>№01 — ГЕОПОРТАЛ_УТРИШ</span>
                <span>СТАТУС: ОНЛАЙН</span>
              </div>

              {/* Стикер-легенда */}
              <div className="absolute -left-4 top-20 bg-[#fffef0] p-3 rounded shadow-sm rotate-[-3deg] border border-amber-100 w-40">
                <p className="text-xs font-mono text-foreground/80">ЛЕГЕНДА</p>
                <p className="text-sm font-serif italic mt-1">Потеря растительности</p>
              </div>

              {/* Карта-мокап */}
              <div className="bg-[#3a5a4a] rounded-2xl p-4 my-4 mx-auto relative min-h-[200px] overflow-hidden">
                {/* Имитация карты с сеткой */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Имитация полигонов слоя */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
                  <polygon points="60,40 140,30 160,80 120,100 70,90" fill="#e74c3c" fillOpacity="0.5" stroke="#c0392b" strokeWidth="1.5"/>
                  <polygon points="140,30 220,50 200,110 160,80" fill="#e67e22" fillOpacity="0.4" stroke="#d35400" strokeWidth="1.5"/>
                  <polygon points="70,90 120,100 110,150 60,140" fill="#f39c12" fillOpacity="0.4" stroke="#e67e22" strokeWidth="1.5"/>
                  <polygon points="120,100 200,110 190,160 110,150" fill="#27ae60" fillOpacity="0.3" stroke="#229954" strokeWidth="1.5"/>
                  {/* Точки мониторинга */}
                  <circle cx="100" cy="65" r="5" fill="#ffffff" stroke="#ccc" strokeWidth="1"/>
                  <circle cx="180" cy="75" r="5" fill="#ffffff" stroke="#ccc" strokeWidth="1"/>
                  <circle cx="150" cy="130" r="5" fill="#ffffff" stroke="#ccc" strokeWidth="1"/>
                </svg>

                {/* Подпись */}
                <div className="absolute bottom-3 left-3 text-[10px] text-white/70 font-mono">
                  <p>Слой: Потеря растительности</p>
                  <p>Источник: ArcGIS / GeoJSON</p>
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  <div className="w-6 h-6 bg-white/20 rounded text-white text-xs flex items-center justify-center font-mono">+</div>
                  <div className="w-6 h-6 bg-white/20 rounded text-white text-xs flex items-center justify-center font-mono">−</div>
                </div>
              </div>

              {/* Панель слоев */}
              <div className="bg-card border border-border rounded-xl p-3 text-xs font-mono space-y-2">
                <p className="text-muted-foreground">СЛОИ</p>
                {[
                  { name: "Потеря растительности", color: "#e74c3c", on: true },
                  { name: "Граница заповедника", color: "#2d4a3e", on: true },
                  { name: "Точки мониторинга", color: "#3498db", on: false },
                ].map((layer) => (
                  <div key={layer.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: layer.color, opacity: layer.on ? 1 : 0.3 }} />
                    <span className={layer.on ? "text-foreground" : "text-muted-foreground"}>{layer.name}</span>
                    <span className="ml-auto text-[10px]">{layer.on ? "ВКЛ" : "ВЫКЛ"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Всплывающее окно объекта */}
            <div className="absolute -right-2 top-32 bg-card border border-border rounded-xl p-3 shadow-sm max-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-sm bg-red-400" />
                <span className="text-xs font-medium">Зона 12-А</span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground">Год: 2023</p>
                <p className="text-[10px] text-muted-foreground">Потеря: 4.2 га</p>
                <p className="text-[10px] text-muted-foreground">Тип: Деградация</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
