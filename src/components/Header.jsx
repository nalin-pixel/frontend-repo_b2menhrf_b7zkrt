import { Rocket, Play, Zap } from "lucide-react";

export default function Header({ onRun, disabledRun = false }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">FlowSpark</h1>
            <p className="text-sm text-slate-500 -mt-0.5">Mini workflow automation (Zapier-style)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onRun}
            disabled={disabledRun}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium shadow hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="h-4 w-4" /> Run Test
          </button>
          <a
            href="https://flames.blue"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <Rocket className="h-4 w-4" />
            Explore
          </a>
        </div>
      </div>
    </header>
  );
}
