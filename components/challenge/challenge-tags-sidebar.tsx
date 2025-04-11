'use client';

import { ChallengeTag } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';

const TAGS: ChallengeTag[] = [
  'all',
  'general',
  'web',
  'forensics',
  'pwn',
  'rev',
  'crypto',
  'osint',
];

const ChallengeTagsSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag') || 'all';

  const handleTagClick = (tag: ChallengeTag) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tag', tag);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="w-36 pr-4 sticky top-0 h-full">
      <div className="h-16 flex items-center justify-end">
        <h3 className="tracking-widest text-foreground uppercase text-xs">
          Categories
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {TAGS.map((tag) => (
          <div
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              'h-8 px-4 flex flex-col justify-center uppercase text-sm text-right border-r-1',
              'transition-all duration-150 cursor-pointer',
              selectedTag === tag
                ? 'text-foreground border-r-2 border-primary font-bold'
                : 'text-muted-foreground border-muted-foreground font-medium hover:border-secondary-foreground hover:text-secondary-foreground'
            )}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ChallengeTagsSidebar };
