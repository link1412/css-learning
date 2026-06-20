'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 渲染 Mermaid 图表为 SVG。
 * - mermaid 库（~500KB）通过动态 import 懒加载，仅在含图表的页面才下载。
 * - 跟随站点明/暗主题：监听 <html> 的 class 变化并重新渲染。
 * - 健壮性：等容器有实际宽度再渲染（避免在 0 宽度容器，如初始折叠/未布局的
 *   Accordion 中渲染出空 SVG），并在容器尺寸变化时重渲染。
 */
export function MermaidDiagram({ code, caption }: { code: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | undefined;
    let lastWidth = 0;

    async function render(): Promise<boolean> {
      const el = ref.current;
      if (!el) return false;
      const width = el.clientWidth;
      if (width === 0) return false; // 容器尚无宽度，稍后重试
      try {
        const mermaid = (await import('mermaid')).default;
        const isDark = document.documentElement.classList.contains('dark');
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'neutral',
          securityLevel: 'strict',
          fontFamily: 'inherit',
        });
        const id = 'm' + Math.random().toString(36).slice(2);
        const { svg } = await mermaid.render(id, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          lastWidth = width;
          setError(null);
        }
        return true;
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
        return true; // 已得到（错误）结果，停止重试
      }
    }

    // 等到容器有宽度再首次渲染（用 rAF 轮询，最多约 1 秒）
    let tries = 0;
    function attempt() {
      if (cancelled) return;
      render().then((done) => {
        if (!done && tries++ < 60) requestAnimationFrame(attempt);
      });
    }
    attempt();

    // 容器尺寸变化（如 Accordion 展开）时重渲染
    if (ref.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        const w = ref.current?.clientWidth ?? 0;
        if (w > 0 && w !== lastWidth) render();
      });
      ro.observe(ref.current);
    }

    // 主题切换时重渲染
    const mo = new MutationObserver(() => render());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelled = true;
      ro?.disconnect();
      mo.disconnect();
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
