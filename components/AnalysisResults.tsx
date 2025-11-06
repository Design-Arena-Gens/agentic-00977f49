"use client";
import React from 'react';
import type { Issue } from "../lib/analyzer";

function Badge({ children, color }: { children: React.ReactNode; color: 'red'|'amber'|'blue' }) {
  const map = { red: 'bg-red-100 text-red-800', amber: 'bg-amber-100 text-amber-800', blue: 'bg-blue-100 text-blue-800' } as const;
  return <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[color]}`}>{children}</span>;
}

export default function AnalysisResults({ issues }: { issues: Issue[] }) {
  if (!issues.length) return (
    <div className="rounded border border-gray-200 p-3 text-sm text-gray-600">No issues detected.</div>
  );

  return (
    <div className="space-y-3">
      {issues.map((i) => (
        <div key={i.id} className="rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {i.severity === 'blocker' && <Badge color="red">Blocker</Badge>}
              {i.severity === 'warning' && <Badge color="amber">Warning</Badge>}
              {i.severity === 'info' && <Badge color="blue">Info</Badge>}
              <span className="text-sm font-medium text-gray-800">{i.category}</span>
            </div>
            <span className="text-xs text-gray-500">{i.ruleId}</span>
          </div>
          <p className="mt-2 text-sm text-gray-700">{i.reason}</p>
          <div className="mt-2 text-sm">
            <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">{i.matchText}</span>
          </div>
          {i.suggestion !== undefined && (
            <p className="mt-2 text-sm text-gray-700"><span className="font-medium">Suggestion:</span> {i.suggestion || 'remove'}</p>
          )}
        </div>
      ))}
    </div>
  );
}
