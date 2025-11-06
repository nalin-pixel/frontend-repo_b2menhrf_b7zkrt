import { useCallback, useState } from "react";
import Header from "./components/Header";
import TriggerSelector from "./components/TriggerSelector";
import ActionBuilder from "./components/ActionBuilder";
import RunPanel from "./components/RunPanel";

function simulateRun(trigger, actions) {
  // Very light mock of executing actions; no external calls
  const outputs = [];
  for (const a of actions) {
    if (a.id === "web_request") {
      outputs.push({ success: true, output: { message: "POSTed to URL (mock)", url: a.config?.url || "", payload: a.config?.payload || "" } });
    } else if (a.id === "send_message") {
      outputs.push({ success: true, output: { channel: "mock", text: a.config?.text || "" } });
    } else if (a.id === "add_row") {
      outputs.push({ success: true, output: { sheet: a.config?.sheet || "", columns: { A: a.config?.colA || "", B: a.config?.colB || "" } } });
    } else if (a.id === "notify") {
      outputs.push({ success: true, output: { title: a.config?.title || "Notification" } });
    } else {
      outputs.push({ success: false, output: { error: "Unknown action" } });
    }
  }
  return outputs;
}

export default function App() {
  const [trigger, setTrigger] = useState("schedule");
  const [actions, setActions] = useState([]);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);

  const run = useCallback(() => {
    setRunning(true);
    setTimeout(() => {
      const res = simulateRun(trigger, actions);
      setResults(res);
      setRunning(false);
    }, 600);
  }, [trigger, actions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header onRun={run} disabledRun={running} />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-8">
            <TriggerSelector value={trigger} onChange={setTrigger} />
            <ActionBuilder value={actions} onChange={setActions} />
            <RunPanel trigger={trigger} actions={actions} onRun={run} running={running} results={results} />
          </div>
        </div>

        <section className="text-center text-slate-500 text-sm">
          <p>Build Zapier-style flows: pick a trigger, add actions, test and iterate. This is a local, mock-only demo.</p>
        </section>
      </main>
    </div>
  );
}
