import { useEffect, useState } from "react";
import { Bell, Clock, Mail } from "lucide-react";

const triggers = [
  { id: "schedule", name: "Schedule", description: "Run at a set interval", icon: Clock },
  { id: "webhook", name: "Webhook", description: "Invoke via HTTP request", icon: Bell },
  { id: "email", name: "Email (mock)", description: "On incoming email", icon: Mail },
];

export default function TriggerSelector({ value, onChange }) {
  const [selected, setSelected] = useState(value || triggers[0].id);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-slate-700">1) Choose a trigger</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {triggers.map((t) => {
          const Icon = t.icon;
          const active = selected === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`text-left rounded-xl border p-4 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                active ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
