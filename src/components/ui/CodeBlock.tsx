'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={cn('relative group rounded-xl overflow-hidden', className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface-elevated border-b border-white/5">
          <span className="text-sm text-text-secondary font-mono">{filename}</span>
          <span className="text-xs text-text-tertiary">{language}</span>
        </div>
      )}

      <div className="relative bg-surface p-4 overflow-x-auto">
        <pre className="font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-text-tertiary w-8 flex-shrink-0">
                  {i + 1}
                </span>
              )}
              <code className="text-text-primary">{line || ' '}</code>
            </div>
          ))}
        </pre>

        <motion.button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-surface-hover opacity-0 group-hover:opacity-100 transition-opacity"
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-text-secondary" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
