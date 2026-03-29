import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-foreground rounded-sm flex items-center justify-center">
            <span className="text-xs font-mono">У</span>
          </div>
          <span className="font-serif text-lg tracking-tight">Утриш ГИС</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Возможности
          </a>
          <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Как работает
          </a>
          <a href="#data" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Данные
          </a>
          <a href="#contacts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Контакты
          </a>
        </nav>

        <a href="#map" className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
          Открыть карту
        </a>
      </div>
    </header>
  );
};

export default Header;
