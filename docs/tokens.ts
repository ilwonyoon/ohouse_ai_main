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
    export const MICRO = '2px';
    export const EXTRA_SMALL = '4px';
    export const SMALL = '8px';
    export const MEDIUM_SMALL = '12px';
    export const MEDIUM = '16px';
    export const MEDIUM_LARGE = '20px';
    export const LARGE = '24px';
    export const EXTRA_LARGE = '32px';
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
    export namespace Horizontal {
      export const PAGE_EDGE = '16px';
      export const ELEMENT_SPACING = '12px';
      export const CONTENT_WIDTH = '343px';
    }

    export namespace Vertical {
      export const SECTION_SPACING = '20px';
      export const CARD_SPACING = '12px';
      export const TITLE_TO_CONTENT = '8px';
      export const CONTENT_LINES = '4px';
    }

    export namespace SafeArea {
      export const TOP = '48px';
      export const BOTTOM = '88.5px';
      export const HORIZONTAL = '16px';
    }

    export namespace Component {
      export namespace Padding {
        export const MICRO = '2px';
        export const COMPACT = '4px';
        export const TIGHT = '8px';
        export const DEFAULT = '12px';
        export const MEDIUM = '16px';
        export const LOOSE = '20px';
      }

      export namespace Margin {
        export const DEFAULT = '16px';
        export const LARGE = '20px';
      }

      export namespace Gap {
        export const ICON_TEXT = '4px';
        export const ELEMENT = '12px';
        export const SECTION = '20px';
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
// ANIMATION TOKENS
// ============================================================================

export namespace AnimationTokens {
  export namespace Duration {
    export const FAST = '150ms';
    export const NORMAL = '300ms';
    export const SLOW = '500ms';
    export const SLOWER = '800ms';
  }

  export namespace Easing {
    export const STANDARD = 'cubic-bezier(0.4, 0, 0.2, 1)';
    export const ENTRANCE = 'cubic-bezier(0, 0, 0.2, 1)';
    export const EXIT = 'cubic-bezier(0.4, 0, 1, 1)';
    export const INTERACTIVE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  }

  export namespace Transition {
    export const DEFAULT = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    export const COLOR = 'color 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    export const OPACITY = 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    export const TRANSFORM = 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    export const SHADOW = 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)';
  }
}

// ============================================================================
// STATE TOKENS
// ============================================================================

export namespace StateTokens {
  export interface ButtonState {
    background?: string;
    color?: string;
    opacity?: number;
    outline?: string;
    outlineOffset?: string;
    border?: string;
  }

  export const Button = {
    primary: {
      default: { background: '#2F3438', color: '#FFFFFF' },
      hover: { background: '#1a1d21', opacity: 0.85 },
      active: { background: '#0f1115', opacity: 0.70 },
      focus: { outline: '2px solid #0AA5FF', outlineOffset: '2px' },
      disabled: { background: '#C2C8CC', color: '#828C94', opacity: 0.5 }
    },
    secondary: {
      default: { background: '#FFFFFF', border: '1px #E6E6E6', color: '#2F3438' },
      hover: { background: '#F7F9FA', border: '1px #DADDE0' },
      active: { background: '#EAEDEF', border: '1px #DADDE0' },
      disabled: { background: '#F5F5F5', border: '1px #E6E6E6', color: '#828C94' }
    }
  };

  export const Input = {
    default: { background: '#FFFFFF', border: '1px #E6E6E6', color: '#828C94' },
    hover: { border: '1px #DADDE0' },
    focus: { border: '2px #0AA5FF', boxShadow: '0 0 0 3px rgba(10, 165, 255, 0.1)' },
    filled: { color: '#2F3438' },
    disabled: { background: '#F5F5F5', border: '1px #E6E6E6', color: '#C2C8CC' },
    error: { border: '2px #E74C3C', boxShadow: '0 0 0 3px rgba(231, 76, 60, 0.1)' },
    success: { border: '2px #27AE60' }
  };

  export const Card = {
    default: { background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' },
    hover: { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)', transform: 'translateY(-2px)' },
    active: { background: '#F7F9FA' }
  };
}

// ============================================================================
// UTILITY TOKENS
// ============================================================================

export namespace UtilityTokens {
  export namespace Shadow {
    export const NONE = 'none';
    export const XS = '0 1px 2px rgba(0, 0, 0, 0.05)';
    export const SM = '0 2px 8px rgba(0, 0, 0, 0.08)';
    export const MD = '0 4px 16px rgba(0, 0, 0, 0.12)';
    export const LG = '0 8px 24px rgba(0, 0, 0, 0.12)';
    export const XL = '0 12px 32px rgba(0, 0, 0, 0.16)';
  }

  export namespace Transform {
    export const SCALE_UP = 'scale(1.02)';
    export const SCALE_DOWN = 'scale(0.98)';
    export const SCALE_PRESS = 'scale(0.96)';
    export const LIFT = 'translateY(-2px)';
    export const LIFT_SM = 'translateY(-1px)';
  }

  export namespace ZIndex {
    export const BASE = 0;
    export const DROPDOWN = 100;
    export const STICKY = 200;
    export const FIXED = 300;
    export const MODAL = 400;
    export const TOAST = 500;
    export const TOOLTIP = 600;
  }

  export namespace BackdropFilter {
    export const BLUR = 'blur(8px)';
    export const BLUR_TIGHT = 'blur(2px)';
    export const BLUR_MEDIUM = 'blur(25px)';
  }
}

// ============================================================================
// ACCESSIBILITY TOKENS
// ============================================================================

export namespace AccessibilityTokens {
  export namespace Focus {
    export const OUTLINE = '2px solid #0AA5FF';
    export const OUTLINE_OFFSET = '2px';
    export const BORDER_RADIUS = 'inherit';
  }

  export namespace HighContrast {
    export const TEXT_DEFAULT = '#000000';
    export const TEXT_SECONDARY = '#333333';
    export const BORDER = '#000000';
    export const BACKGROUND = '#FFFFFF';
  }

  export namespace ReducedMotion {
    export const DURATION = '0.01ms';
    export const ANIMATION_ITERATION_COUNT = 1;
    export const TRANSITION_DURATION = '0.01ms';
  }
}

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export namespace ResponsiveTokens {
  export const MOBILE = '375px';
  export const TABLET = '768px';
  export const DESKTOP = '1024px';
  export const WIDE = '1440px';
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

export type DurationToken = 'fast' | 'normal' | 'slow' | 'slower';

export type EasingToken = 'standard' | 'entrance' | 'exit' | 'interactive';

export type ShadowToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BreakpointToken = 'mobile' | 'tablet' | 'desktop' | 'wide';
