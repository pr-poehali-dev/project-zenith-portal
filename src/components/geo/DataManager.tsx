import { useState } from "react";
import { EcoDataRecord } from "@/types/geo";
import Icon from "@/components/ui/icon";

interface DataManagerProps {
  data: EcoDataRecord[];
  onDataChange: (data: EcoDataRecord[]) => void;
}

const EMPTY_FORM = { name: "Потеря растительности", value: "", year: new Date().getFullYear(), description: "", zone: "" };

const DataManager = ({ data, onDataChange }: DataManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSave = () => {
    if (!form.name || !form.value) return;
    if (editId) {
      onDataChange(data.map((d) =>
        d.id === editId
          ? { ...d, name: form.name, value: parseFloat(String(form.value)), year: form.year, description: form.description, zone: form.zone }
          : d
      ));
      setEditId(null);
    } else {
      const newRecord: EcoDataRecord = {
        id: `manual-${Date.now()}`,
        name: form.name,
        value: parseFloat(String(form.value)),
        year: form.year,
        description: form.description,
        zone: form.zone,
      };
      onDataChange([...data, newRecord]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const handleEdit = (record: EcoDataRecord) => {
    setForm({ name: record.name, value: String(record.value), year: record.year, description: record.description || "", zone: record.zone || "" });
    setEditId(record.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    onDataChange(data.filter((d) => d.id !== id));
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="p-3 space-y-3">
      {/* Add button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-mono border border-dashed border-border py-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
        >
          <Icon name="Plus" size={12} />
          Добавить запись
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-secondary/40 rounded-xl p-3 space-y-2">
          <p className="text-[10px] font-mono text-muted-foreground">{editId ? "РЕДАКТИРОВАТЬ" : "НОВАЯ ЗАПИСЬ"}</p>
          {[
            { key: "name", label: "Показатель", type: "text" },
            { key: "value", label: "Значение (га)", type: "number" },
            { key: "year", label: "Год", type: "number" },
            { key: "zone", label: "Зона", type: "text" },
            { key: "description", label: "Описание", type: "text" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-[10px] font-mono text-muted-foreground">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: field.type === "number" ? parseFloat(e.target.value) || e.target.value : e.target.value }))}
                className="w-full mt-0.5 text-xs font-mono bg-background border border-border rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary"
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              className="flex-1 text-[10px] font-mono bg-primary text-primary-foreground py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {editId ? "СОХРАНИТЬ" : "ДОБАВИТЬ"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 text-[10px] font-mono border border-border py-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              ОТМЕНА
            </button>
          </div>
        </div>
      )}

      {/* Records list */}
      <div className="space-y-1.5">
        {data.slice().reverse().slice(0, 20).map((record) => (
          <div key={record.id} className="bg-secondary/30 rounded-lg p-2.5 flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-medium truncate">{record.zone || "—"}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{record.year}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-muted-foreground truncate">{record.name}</span>
                <span className="text-[10px] font-mono font-medium text-primary ml-auto flex-shrink-0">{record.value} га</span>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => handleEdit(record)} className="text-muted-foreground hover:text-foreground">
                <Icon name="Pencil" size={11} />
              </button>
              <button onClick={() => handleDelete(record.id)} className="text-muted-foreground hover:text-destructive">
                <Icon name="Trash2" size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.length > 20 && (
        <p className="text-[10px] font-mono text-muted-foreground text-center">
          Показано 20 из {data.length} записей
        </p>
      )}
    </div>
  );
};

export default DataManager;
