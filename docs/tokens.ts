/**
 * Design System Type Definitions
 * Generated from Figma: Ohouse-AI--AI-interior-
 * Last Updated: 2025-11-04
 */

// ============================================================================
// PRIMITIVE TOKENS
// ============================================================================

export namespace PrimitiveTokens {
  export namespace Colors {
    export namespace Neutral {
      export const _50 = '#FFFFFF';
      export const _100 = '#F5F5F5';
      export const _500 = '#828C94';
      export const _600 = '#2F3438';
    }

    export namespace Border {
      export const DEFAULT = '#E6E6E6';
      export const LIGHT = '#DADDE0';
    }

    export namespace Brand {
      export const PRIMARY = '#0AA5FF';
    }
  }

  export namespace Typography {
    export namespace FontFamily {
      export const PRIMARY = 'Pretendard';
      export const FALLBACK = 'sans-serif';
    }

    export namespace FontWeight {
      export const REGULAR = 400;
      export const MEDIUM = 500;
      export const SEMIBOLD = 600;
      export const BOLD = 700;
    }

    export namespace FontSize {
      export const XS = '10px';
      export const SM = '13px';
      export const MD = '14px';
      export const LG = '15px';
      export const XL = '16px';
      export const XXL = '17px';
    }

    export namespace LineHeight {
      export const TIGHT = '14px';
      export const MEDIUM = '18px';
      export const DEFAULT = '20px';
      export const BODY = '24px';
      export const HEADING = '26px';
    }

    export namespace LetterSpacing {
      export const TIGHT = '-0.3px';
    }
  }

  export namespace Spacing {
    export const XS = '2px';
    export const SM = '4px';
    export const MD = '6px';
    export const LG = '8px';
    export const XL = '10px';
    export const XXL = '12px';
    export const XXXL = '16px';
    export const HUGE = '20px';
  }

  export namespace BorderRadius {
    export const TIGHT = '8px';
    export const SMOOTH = '12px';
    export const FULL = '100px';
  }

  export namespace Blur {
    export const TIGHT = '2px';
    export const MEDIUM = '25px';
  }
}

// ============================================================================
// SEMANTIC TOKENS
// ============================================================================

export namespace SemanticTokens {
  export namespace Color {
    export namespace Background {
      export const DEFAULT = '#FFFFFF';
      export const INVERSE = '#2F3438';
      export const GROUPED = '#FFFFFF';
    }

    export namespace Foreground {
      export const DEFAULT = '#2F3438';
      export const SECONDARY = '#828C94';
      export const INVERSE = '#FFFFFF';
      export const BRAND = '#0AA5FF';
    }

    export namespace Border {
      export const DEFAULT = '#E6E6E6';
      export const LIGHT = '#DADDE0';
    }
  }

  export interface TypographyStyle {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
    letterSpacing: string;
    fontFamily: string;
    usage?: string;
  }

  export namespace Typography {
    export namespace Heading {
      export const H1: TypographyStyle = {
        fontSize: '17px',
        fontWeight: 600,
        lineHeight: '26px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Page titles, top navigation'
      };
    }

    export namespace Body {
      export const LARGE: TypographyStyle = {
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '20px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Large primary text'
      };

      export const DEFAULT: TypographyStyle = {
        fontSize: '15px',
        fontWeight: 600,
        lineHeight: '24px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Feature card titles, emphasis'
      };

      export const REGULAR: TypographyStyle = {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '18px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Body text, descriptions'
      };

      export const MEDIUM: TypographyStyle = {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Button text, action labels'
      };
    }

    export namespace Detail {
      export const MEDIUM: TypographyStyle = {
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '18px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Supplementary text, secondary descriptions'
      };

      export const SMALL: TypographyStyle = {
        fontSize: '10px',
        fontWeight: 500,
        lineHeight: '14px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Small labels, badges'
      };

      export const SMALL_BOLD: TypographyStyle = {
        fontSize: '10px',
        fontWeight: 700,
        lineHeight: '14px',
        letterSpacing: '-0.3px',
        fontFamily: 'Pretendard',
        usage: 'Small bold labels'
      };
    }
  }

  export namespace Spacing {
    export namespace Component {
      export namespace Padding {
        export const COMPACT = '4px';
        export const TIGHT = '8px';
        export const DEFAULT = '10px';
        export const LOOSE = '12px';
      }

      export namespace Margin {
        export const DEFAULT = '16px';
        export const LARGE = '20px';
      }
    }
  }

  export namespace Radius {
    export const BUTTON = '8px';
    export const CARD = '12px';
  }
}

// ============================================================================
// COMPONENT SPECIFICATIONS
// ============================================================================

export namespace ComponentTokens {
  export interface TopNavigation {
    height: string;
    backgroundColor: string;
    padding: string;
    iconSize: string;
    title: {
      fontSize: string;
      fontWeight: number;
      color: string;
    };
  }

  export interface Tab {
    height: string;
    activeBorder: {
      height: string;
      color: string;
    };
    activeTextColor: string;
    inactiveTextColor: string;
    borderBottom: string;
    typography: {
      fontSize: string;
      fontWeight: number;
    };
  }

  export interface BottomNavigation {
    height: string;
    iconSize: string;
    activeColor: string;
    inactiveColor: string;
    homeIndicator: {
      width: string;
      height: string;
      color: string;
    };
  }

  export interface FeatureCardLarge {
    width: string;
    height: string;
    imageHeight: string;
    imageBorderRadius: string;
    infoHeight: string;
    button: {
      width: string;
      height: string;
    };
  }

  export interface FeatureCardSmall {
    width: string;
    height: string;
    border: string;
    borderRadius: string;
    imageHeight: string;
    gradientOverlay: string;
  }

  export interface Button {
    primary: {
      backgroundColor: string;
      textColor: string;
      padding: string;
      borderRadius: string;
      fontSize: string;
      fontWeight: number;
      width: string;
      height: string;
    };
  }

  export interface Badge {
    padding: string;
    borderRadius: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    backgroundColor: string;
    backdropFilter: string;
  }

  export const TopNavigation: TopNavigation = {
    height: '44px',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    iconSize: '24px',
    title: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#2F3438'
    }
  };

  export const Tab: Tab = {
    height: '44px',
    activeBorder: {
      height: '2px',
      color: '#2F3438'
    },
    activeTextColor: '#2F3438',
    inactiveTextColor: '#828C94',
    borderBottom: '1px #EAEDEF',
    typography: {
      fontSize: '15px',
      fontWeight: 700
    }
  };

  export const BottomNavigation: BottomNavigation = {
    height: '88.5px',
    iconSize: '24px',
    activeColor: '#0AA5FF',
    inactiveColor: '#2F3438',
    homeIndicator: {
      width: '134px',
      height: '5px',
      color: '#000000'
    }
  };

  export const FeatureCardLarge: FeatureCardLarge = {
    width: '351px',
    height: '263px',
    imageHeight: '175px',
    imageBorderRadius: '12px',
    infoHeight: '88px',
    button: {
      width: '47px',
      height: '28px'
    }
  };

  export const FeatureCardSmall: FeatureCardSmall = {
    width: '167px',
    height: '250px',
    border: '0.5px #E6E6E6',
    borderRadius: '12px',
    imageHeight: '171px',
    gradientOverlay: 'linear-gradient(to-b, rgba(0,0,0,0), rgba(0,0,0,0.1))'
  };

  export const Button: Button = {
    primary: {
      backgroundColor: '#2F3438',
      textColor: '#FFFFFF',
      padding: '8px 4px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 500,
      width: '47px',
      height: '28px'
    }
  };

  export const Badge: Badge = {
    padding: '4px 4px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 500,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.1)',
    backdropFilter: 'blur(2px)'
  };
}

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export namespace LayoutTokens {
  export const VIEWPORT = {
    width: '375px',
    height: '1765px'
  };

  export const SAFE_AREA = {
    horizontal: '16px'
  };

  export const CONTAINER_WIDTH = '343px';
}

// ============================================================================
// EXPORT TYPES FOR USAGE
// ============================================================================

export type ColorToken = 
  | 'bg-default'
  | 'bg-inverse'
  | 'fg-default'
  | 'fg-secondary'
  | 'fg-inverse'
  | 'fg-brand'
  | 'border-default'
  | 'border-light';

export type TypographyToken =
  | 'heading-h1'
  | 'body-large'
  | 'body-default'
  | 'body-regular'
  | 'body-medium'
  | 'detail-medium'
  | 'detail-small'
  | 'detail-small-bold';

export type SpacingToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'huge';

export type RadiusToken = 'tight' | 'smooth' | 'full';
