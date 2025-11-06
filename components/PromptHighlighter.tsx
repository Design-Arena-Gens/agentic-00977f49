"use client";
import React from 'react';
import type { Issue } from "../lib/analyzer";

interface Props {
  text: string;
  issues: Issue[];
}

export default function PromptHighlighter({ text, issues }: Props) {
  if (!text) return null;
  const parts: Array<React.ReactNode> = [];
  let cursor = 0;
  const colorFor = (severity: Issue['severity']) =>
    severity === 'blocker' ? 'bg-red-200' : severity === 'warning' ? 'bg-amber-200' : 'bg-blue-200';

  for (const issue of issues) {
    if (cursor < issue.start) {
      parts.push(<span key={`t-${cursor}`}>{text.slice(cursor, issue.start)}</span>);
    }
    parts.push(
      <mark
        key={`m-${issue.id}-${issue.start}`}
        className={`${colorFor(issue.severity)} rounded px-0.5`}
        title={`${issue.category}: ${issue.reason}`}
      >
        {text.slice(issue.start, issue.end)}
      </mark>
    );
    cursor = issue.end;
  }
  if (cursor < text.length) parts.push(<span key={`t-end`}>{text.slice(cursor)}</span>);

  return (
    <div className="whitespace-pre-wrap break-words leading-relaxed text-[15px]">
      {parts}
    </div>
  );
}
