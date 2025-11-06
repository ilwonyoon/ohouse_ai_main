"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ReactNode } from "react";

// Create emotion cache for client-side rendering
const clientSideEmotionCache = createCache({
  key: "css",
  prepend: true,
});

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      {children}
    </CacheProvider>
  );
}
