"use client";
import React from 'react';
import { analyzePrompt } from "../lib/analyzer";
import type { ModelId } from "../lib/modelProfiles";
import { MODEL_PROFILES } from "../lib/modelProfiles";
import PromptHighlighter from "../components/PromptHighlighter";
import AnalysisResults from "../components/AnalysisResults";
import SanitizedPrompt from "../components/SanitizedPrompt";

export default function Page() {
  const [model, setModel] = React.useState<ModelId>('Seedream-4');
  const [input, setInput] = React.useState<string>("");
  const [autoSanitize, setAutoSanitize] = React.useState<boolean>(true);

  const result = React.useMemo(() => analyzePrompt(input, model), [input, model]);

  return (
    <main className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-gray-700">Target model</label>
          <select
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
            value={model}
            onChange={(e) => setModel(e.target.value as ModelId)}
          >
            {MODEL_PROFILES.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
          <label className="ml-auto flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={autoSanitize} onChange={(e) => setAutoSanitize(e.target.checked)} />
            Auto-sanitize
          </label>
        </div>
        <textarea
          className="w-full rounded border border-gray-300 p-3"
          rows={10}
          placeholder="Paste the prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="rounded border border-gray-200 p-3">
          <h3 className="mb-2 text-sm font-medium text-gray-800">Highlighted prompt</h3>
          <PromptHighlighter text={input} issues={result.issues} />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-800">Findings</h3>
          <AnalysisResults issues={result.issues} />
        </div>
        <div>
          <SanitizedPrompt value={autoSanitize ? result.sanitizedPrompt : input} />
        </div>
      </section>
    </main>
  );
}
