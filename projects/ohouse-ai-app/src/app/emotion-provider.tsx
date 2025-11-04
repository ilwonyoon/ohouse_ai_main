'use client';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ReactNode } from 'react';

// speedy: false를 사용하여 FOUC(Flash of Unstyled Content) 방지
// 프로덕션에서는 true로 변경하여 성능 최적화
const cache = createCache({ 
  key: 'css',
  speedy: false 
});

export function EmotionProvider({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
}
