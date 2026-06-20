import { moduleMaturity, MATURITY_INFO } from '@/data/modules';
import { t } from '@/lib/i18n';

/**
 * 显示模块主规范的成熟度徽章（REC / CR / CRD / WD），配色区分稳定度。
 * 纯展示组件，用原生 title 提供阶段含义说明。
 */
export function SpecMaturityBadge({ slug }: { slug: string }) {
  const maturity = moduleMaturity[slug];
  if (!maturity) return null;

  const info = MATURITY_INFO[maturity];
  return (
    <span
      title={`${maturity} · ${t(info.label)} — ${t(info.desc)}（成熟度依据主规范，具体以规范页头日期为准）`}
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${info.className}`}
    >
      <span className="font-mono">{maturity}</span>
      <span className="opacity-80">{t(info.label)}</span>
    </span>
  );
}
