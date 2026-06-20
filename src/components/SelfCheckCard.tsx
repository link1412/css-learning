'use client';

import { useEffect, useState } from 'react';
import { selfCheck } from '@/data/self-check';
import { CheckCircle2, Circle, ClipboardCheck } from 'lucide-react';

/**
 * 章节末尾的「完成基准」自测清单。
 * - 题目来自 self-check.ts（按 moduleId）。
 * - 勾选状态按模块存 localStorage，刷新后保留。
 * - 显示完成进度；全部勾选时给出「过关」提示。
 */
export function SelfCheckCard({ slug }: { slug: string }) {
  const items = selfCheck[slug];
  const storageKey = `selfcheck:${slug}`;
  const [checked, setChecked] = useState<boolean[]>(() => (items ? items.map(() => false) : []));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!items) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as boolean[];
        if (Array.isArray(saved) && saved.length === items.length) setChecked(saved);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey, items]);

  if (!items || items.length === 0) return null;

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const done = checked.filter(Boolean).length;
  const allDone = hydrated && done === items.length;

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm">完成基准 · 自测</span>
        </div>
        <span className={`text-xs font-medium ${allDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
          {done}/{items.length}{allDone ? ' · 过关 ✓' : ''}
        </span>
      </div>
      <ul className="divide-y">
        {items.map((q, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 px-5 py-3 text-left hover:bg-muted/30 transition-colors"
            >
              {checked[i] ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 shrink-0 text-muted-foreground/50 mt-0.5" />
              )}
              <span className={`text-sm leading-relaxed ${checked[i] ? 'text-muted-foreground line-through' : 'text-foreground/90'}`}>
                {q}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 text-xs text-muted-foreground border-t bg-muted/20">
        答得上（能讲清、能举例）才勾选。全部勾上 = 本章过关，可进入下一章。
      </p>
    </div>
  );
}
