import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

const CTASection = () => {
  return (
    <section id="contacts" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16 overflow-hidden">
          {/* Decorative corner icons */}
          <div className="absolute top-8 left-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <Icon name="Map" size={16} />
          </div>
          <div className="absolute top-8 right-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <Icon name="Layers" size={16} />
          </div>
          <div className="absolute bottom-8 left-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <Icon name="BarChart2" size={16} />
          </div>
          <div className="absolute bottom-8 right-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <Icon name="Upload" size={16} />
          </div>
          <div className="absolute top-1/2 right-16 -translate-y-1/2 w-10 h-10 border border-border rounded-lg hidden md:flex items-center justify-center">
            <Icon name="Filter" size={16} />
          </div>
          <div className="absolute bottom-1/3 left-16 w-10 h-10 border border-border rounded-lg hidden md:flex items-center justify-center">
            <span className="text-muted-foreground text-lg">🌿</span>
          </div>

          {/* Main content */}
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              Загрузите ваши данные
              <br />
              и откройте геопортал.
            </h2>
            <p className="text-muted-foreground mb-8">
              Подготовьте файл GeoJSON из ArcGIS — геопортал покажет ваши данные на карте, раскрасит зоны по значениям и построит графики по годам.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="#portal"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Открыть геопортал
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
              >
                Как загрузить данные
              </a>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 justify-center mt-10 pt-8 border-t border-border">
              <div className="text-center">
                <p className="font-serif text-xl">GeoJSON</p>
                <p className="text-xs font-mono text-muted-foreground">ФОРМАТ ArcGIS</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl">CSV</p>
                <p className="text-xs font-mono text-muted-foreground">ТАБЛИЦЫ ДАННЫХ</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl">OSM</p>
                <p className="text-xs font-mono text-muted-foreground">ПОДЛОЖКА КАРТЫ</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl">Recharts</p>
                <p className="text-xs font-mono text-muted-foreground">АНАЛИТИКА</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
