import { useEffect, useMemo, useState } from "react";
import { Globe, MessageSquare, Sheet, Link, CheckCircle2 } from "lucide-react";

const actions = [
  { id: "web_request", name: "Web Request", description: "POST data to a URL", icon: Link },
  { id: "send_message", name: "Send Message", description: "Simulate Slack/Discord", icon: MessageSquare },
  { id: "add_row", name: "Add Row", description: "Mock Google Sheet row", icon: Sheet },
  { id: "notify", name: "Notify", description: "Show in-app notification", icon: Globe },
];

export default function ActionBuilder({ value = [], onChange }) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  function addAction(actionId) {
    const action = actions.find((a) => a.id === actionId);
    if (!action) return;
    setSelected((prev) => [...prev, { ...action, config: {} }]);
  }

  function updateConfig(index, key, val) {
    setSelected((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], config: { ...copy[index].config, [key]: val } };
      return copy;
    });
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-slate-700">2) Add actions</h2>
      <div className="grid sm:grid-cols-4 gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          const added = selected.some((s) => s.id === a.id);
          return (
            <button
              key={a.id}
              onClick={() => addAction(a.id)}
              className={`text-left rounded-xl border p-4 transition shadow-sm hover:shadow-md ${
                added ? "border-green-500 bg-green-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    added ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 flex items-center gap-2">
                    {a.name}
                    {added && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Action settings</div>
          <div className="space-y-3">
            {selected.map((s, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-white">
                <div className="font-medium text-slate-900 mb-3">{idx + 1}. {s.name}</div>
                {s.id === "web_request" && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      onChange={(e) => updateConfig(idx, "url", e.target.value)}
                      placeholder="https://example.com/webhook"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      onChange={(e) => updateConfig(idx, "payload", e.target.value)}
                      placeholder='{"hello": "world"}'
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                )}
                {s.id === "send_message" && (
                  <input
                    onChange={(e) => updateConfig(idx, "text", e.target.value)}
                    placeholder="Message text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                )}
                {s.id === "add_row" && (
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      onChange={(e) => updateConfig(idx, "sheet", e.target.value)}
                      placeholder="Sheet name"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      onChange={(e) => updateConfig(idx, "colA", e.target.value)}
                      placeholder="Column A"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      onChange={(e) => updateConfig(idx, "colB", e.target.value)}
                      placeholder="Column B"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                )}
                {s.id === "notify" && (
                  <input
                    onChange={(e) => updateConfig(idx, "title", e.target.value)}
                    placeholder="Notification title"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
