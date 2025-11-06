import { useMemo } from "react";
import { PlayCircle, Loader2, Check, AlertTriangle } from "lucide-react";

export default function RunPanel({ trigger, actions, onRun, running, results }) {
  const summary = useMemo(() => {
    return {
      trigger,
      actions: actions?.map((a) => ({ id: a.id, config: a.config })) || [],
    };
  }, [trigger, actions]);

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-slate-700">3) Test your flow</h2>
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
        <pre className="text-xs text-slate-700 max-w-[70%] overflow-x-auto whitespace-pre-wrap">{JSON.stringify(summary, null, 2)}</pre>
        <button
          onClick={onRun}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-indigo-500 disabled:opacity-50"
        >
          {running ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Running
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" /> Run
            </>
          )}
        </button>
      </div>
      {results && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
          <div className="text-sm font-medium text-slate-900">Run results</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {results.map((r, idx) => (
              <div key={idx} className={`rounded-lg border p-3 ${
                  r.success ? "border-green-300 bg-green-50" : "border-amber-300 bg-amber-50"
                }`}>
                <div className="flex items-center gap-2 text-sm font-medium">
                  {r.success ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" /> Success
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-amber-600" /> Warning
                    </>
                  )}
                </div>
                <pre className="mt-2 text-xs text-slate-700 whitespace-pre-wrap break-words">{JSON.stringify(r.output, null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
