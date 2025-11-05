import { CSSObject, SerializedStyles } from '@emotion/react';
import type {} from '@emotion/react/types';

declare module 'react' {
  interface HTMLAttributes<T> {
    css?: CSSObject | SerializedStyles | (CSSObject | SerializedStyles)[];
  }

  interface SVGAttributes<T> {
    css?: CSSObject | SerializedStyles | (CSSObject | SerializedStyles)[];
  }
}
