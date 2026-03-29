import { useState } from "react";
import { EcoDataRecord } from "@/types/geo";
import Icon from "@/components/ui/icon";

interface DataManagerProps {
  data: EcoDataRecord[];
  onAdd: (record: Omit<EcoDataRecord, "id">) => Promise<void>;
  onUpdate: (record: EcoDataRecord) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const EMPTY_FORM = {
  name: "Потеря растительности",
  value: "",
  year: String(new Date().getFullYear()),
  description: "",
  zone: "",
};

const DataManager = ({ data, onAdd, onUpdate, onDelete }: DataManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!form.name || !form.value) return;
    setSaving(true);
    const payload = {
      name: form.name,
      value: parseFloat(form.value) || 0,
      year: parseInt(form.year) || 2024,
      description: form.description,
      zone: form.zone,
    };
    if (editId) {
      await onUpdate({ ...payload, id: editId });
      setEditId(null);
    } else {
      await onAdd(payload);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
    setSaving(false);
  };

  const handleEdit = (record: EcoDataRecord) => {
    setForm({
      name: record.name,
      value: String(record.value),
      year: String(record.year),
      description: record.description || "",
      zone: record.zone || "",
    });
    setEditId(record.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const fields = [
    { key: "name", label: "Показатель", type: "text" },
    { key: "value", label: "Значение (га)", type: "number" },
    { key: "year", label: "Год", type: "number" },
    { key: "zone", label: "Зона", type: "text" },
    { key: "description", label: "Описание", type: "text" },
  ];

  return (
    <div className="p-3 space-y-3">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-mono border border-dashed border-border py-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
        >
          <Icon name="Plus" size={12} />
          Добавить запись
        </button>
      )}

      {showForm && (
        <div className="bg-secondary/40 rounded-xl p-3 space-y-2">
          <p className="text-[10px] font-mono text-muted-foreground">
            {editId ? "РЕДАКТИРОВАТЬ" : "НОВАЯ ЗАПИСЬ"}
          </p>
          {fields.map((field) => (
            <div key={field.key}>
              <label className="text-[10px] font-mono text-muted-foreground">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full mt-0.5 text-xs font-mono bg-background border border-border rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary"
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 text-[10px] font-mono bg-primary text-primary-foreground py-1.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? "..." : editId ? "СОХРАНИТЬ" : "ДОБАВИТЬ"}
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

      <div className="space-y-1.5">
        {data.slice().reverse().slice(0, 30).map((record) => (
          <div key={record.id} className="bg-secondary/30 rounded-lg p-2.5 flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-medium truncate">
                  {record.zone || "—"}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">{record.year}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-muted-foreground truncate flex-1">{record.name}</span>
                <span className="text-[10px] font-mono font-medium text-primary flex-shrink-0">
                  {record.value} га
                </span>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => handleEdit(record)} className="text-muted-foreground hover:text-foreground">
                <Icon name="Pencil" size={11} />
              </button>
              <button onClick={() => onDelete(record.id)} className="text-muted-foreground hover:text-destructive">
                <Icon name="Trash2" size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.length > 30 && (
        <p className="text-[10px] font-mono text-muted-foreground text-center">
          Показано 30 из {data.length} записей
        </p>
      )}
    </div>
  );
};

export default DataManager;
