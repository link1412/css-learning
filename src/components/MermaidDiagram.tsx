'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 渲染 Mermaid 图表为 SVG。
 * - mermaid 库（~500KB）通过动态 import 懒加载，仅在含图表的页面才下载。
 * - 跟随站点明/暗主题：监听 <html> 的 class 变化并重新渲染。
 */
export function MermaidDiagram({ code, caption }: { code: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        const isDark = document.documentElement.classList.contains('dark');
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'neutral',
          securityLevel: 'strict',
          fontFamily: 'inherit',
        });
        const { svg } = await mermaid.render(idRef.current, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    }

    render();

    // 主题切换时重渲染
    const observer = new MutationObserver(() => render());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [code]);

  if (error) {
    // 渲染失败时回退为原始 mermaid 源码，信息不丢失
    return (
      <div className="my-3">
        <pre className="rounded-lg bg-muted/50 border p-4 overflow-x-auto text-xs font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
        <p className="text-xs text-muted-foreground mt-1.5 italic">图表渲染失败，已回退为源码</p>
      </div>
    );
  }

  return (
    <figure className="my-4">
      <div
        ref={ref}
        className="flex justify-center rounded-lg border bg-card p-4 overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
      />
      {caption && (
        <figcaption className="text-xs text-muted-foreground mt-1.5 italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
