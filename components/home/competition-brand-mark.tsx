import { Swords } from 'lucide-react';

import { competitionLogoSrc } from '@/lib/competition/logo-url';
import type { CompetitionInfo } from '@/lib/competition/schedule';

type Props = {
  info: CompetitionInfo | null;
  /** Classes for the `<img>` when a URL exists */
  imgClassName: string;
  /** Wrapper when using the Swords fallback (no logo URL) */
  fallbackClassName: string;
};

export function CompetitionBrandMark({
  info,
  imgClassName,
  fallbackClassName,
}: Props) {
  const src = info ? competitionLogoSrc(info) : null;
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={info?.name ? `${info.name} logo` : 'Competition logo'}
        className={imgClassName}
      />
    );
  }
  return (
    <div className={fallbackClassName} aria-hidden>
      <Swords className="size-[65%] text-primary/75" strokeWidth={1.15} />
    </div>
  );
}
