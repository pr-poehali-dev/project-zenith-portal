import { GeoLayer } from "@/types/geo";
import Icon from "@/components/ui/icon";

interface LayersPanelProps {
  layers: GeoLayer[];
  onToggle: (id: string) => void;
  onOpacityChange: (id: string, opacity: number) => void;
  onRemove: (id: string) => void;
}

const LayersPanel = ({ layers, onToggle, onOpacityChange, onRemove }: LayersPanelProps) => {
  return (
    <div className="p-3 space-y-2">
      {layers.length === 0 && (
        <div className="text-center py-8 text-xs font-mono text-muted-foreground">
          <p>Нет слоёв.</p>
          <p className="mt-1">Загрузите GeoJSON.</p>
        </div>
      )}
      {layers.map((layer) => (
        <div key={layer.id} className="bg-secondary/40 rounded-xl p-3 space-y-2">
          {/* Layer header */}
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0 cursor-pointer border"
              style={{
                backgroundColor: layer.visible ? layer.color : "transparent",
                borderColor: layer.color,
              }}
              onClick={() => onToggle(layer.id)}
            />
            <span
              className={`text-xs flex-1 truncate cursor-pointer ${layer.visible ? "text-foreground" : "text-muted-foreground"}`}
              onClick={() => onToggle(layer.id)}
              title={layer.name}
            >
              {layer.name}
            </span>
            <button
              onClick={() => onRemove(layer.id)}
              className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
            >
              <Icon name="X" size={12} />
            </button>
          </div>

          {/* Opacity slider */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground w-16">прозр.</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={layer.opacity}
              onChange={(e) => onOpacityChange(layer.id, parseFloat(e.target.value))}
              className="flex-1 h-1 accent-primary"
            />
            <span className="text-[10px] font-mono text-muted-foreground w-6">
              {Math.round(layer.opacity * 100)}%
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground capitalize">{layer.type}</span>
            <span className={`text-[10px] font-mono ${layer.visible ? "text-green-600" : "text-muted-foreground"}`}>
              {layer.visible ? "ВКЛ" : "ВЫКЛ"}
            </span>
          </div>
        </div>
      ))}

      {/* Info */}
      <div className="mt-4 p-3 bg-accent/30 rounded-xl text-[10px] font-mono text-muted-foreground space-y-1">
        <p className="text-foreground/70">Поддерживаемые форматы:</p>
        <p>• GeoJSON (.json, .geojson)</p>
        <p>• CSV с координатами</p>
        <p className="mt-2 text-foreground/70">Используйте кнопки вверху для загрузки файлов.</p>
      </div>
    </div>
  );
};

export default LayersPanel;
