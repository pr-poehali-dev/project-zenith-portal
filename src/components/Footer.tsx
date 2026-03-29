import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 border-2 border-foreground rounded-sm flex items-center justify-center">
                <span className="text-[10px] font-mono">У</span>
              </div>
              <span className="font-serif">Утриш ГИС.</span>
            </Link>
            <p className="text-xs font-mono text-muted-foreground">
              ГЕОПОРТАЛ ЗАПОВЕДНИКА
              <br />
              «УТРИШ» v1.0
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-4">СИСТЕМА МОНИТОРИНГА</p>
          </div>

          {/* Directory */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground mb-4">РАЗДЕЛЫ</h4>
            <ul className="space-y-2">
              {["Карта", "Слои", "Дашборд", "Данные"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Data */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground mb-4">ФОРМАТЫ ДАННЫХ</h4>
            <ul className="space-y-2">
              {["GeoJSON (ArcGIS)", "CSV таблицы", "ZIP / GDB", "OpenStreetMap"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono text-muted-foreground mb-4">СТАТУС СИСТЕМЫ</h4>
            <div className="bg-secondary/50 rounded-xl p-4 font-mono text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Заповедник «Утриш»</span>
              </div>
              <div className="space-y-1">
                <p className="text-primary">КАРТА [АКТИВНА]</p>
                <p className="text-muted-foreground">Слои загружаются из GeoJSON</p>
                <p className="text-muted-foreground">Дашборд работает штатно</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">2025 ГЕОПОРТАЛ ЗАПОВЕДНИКА «УТРИШ»</p>
          <p className="text-xs text-muted-foreground">КРАСНОДАРСКИЙ КРАЙ, РОССИЯ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
