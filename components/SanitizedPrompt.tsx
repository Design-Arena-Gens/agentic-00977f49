"use client";
import React from 'react';

export default function SanitizedPrompt({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div>
      <textarea
        className="w-full rounded border border-gray-300 p-3 font-mono text-sm"
        rows={6}
        readOnly
        value={value}
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">Sanitized prompt</span>
        <button onClick={onCopy} className="rounded bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
