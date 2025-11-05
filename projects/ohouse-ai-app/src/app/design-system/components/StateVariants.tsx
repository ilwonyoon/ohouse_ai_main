'use client';

import { css } from '@emotion/react';

export default function StateVariants() {
  const stateTypes = [
    { name: 'Default', description: 'Initial, uninteracted state' },
    { name: 'Hover', description: 'Pointer over element' },
    { name: 'Active/Pressed', description: 'Element is being interacted with' },
    { name: 'Focus', description: 'Keyboard focus (accessibility)' },
    { name: 'Disabled', description: 'Cannot be interacted with' },
    { name: 'Loading', description: 'Async operation in progress' },
    { name: 'Error', description: 'Validation or system error' },
    { name: 'Success', description: 'Positive completion' },
  ];

  return (
    <div>
      <h2 css={css`font-size: 28px; font-weight: 700; color: #2f3438; margin-bottom: 8px;`}>
        ✨ States & Variants
      </h2>
      <p css={css`font-size: 16px; color: #828c94; margin-bottom: 40px; line-height: 1.5;`}>
        All interactive components support multiple states for clear user feedback and accessibility.
      </p>

      <div css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 40px;
      `}>
        {stateTypes.map((state) => (
          <div
            key={state.name}
            css={css`
              border: 1px solid #e6e6e6;
              border-radius: 12px;
              padding: 20px;
              background: #f7f9fa;

              h3 {
                margin: 0 0 8px 0;
                font-size: 15px;
                font-weight: 600;
                color: #2f3438;
              }

              p {
                margin: 0;
                font-size: 13px;
                color: #828c94;
              }
            `}
          >
            <h3>{state.name}</h3>
            <p>{state.description}</p>
          </div>
        ))}
      </div>

      {/* Button State Examples */}
      <div css={css`margin-top: 50px;`}>
        <h3 css={css`font-size: 20px; font-weight: 700; color: #2f3438; margin-bottom: 24px;`}>
          Button States Example
        </h3>

        <div css={css`display: flex; gap: 12px; flex-wrap: wrap;`}>
          <button css={css`
            padding: 8px 16px;
            background-color: #2f3438;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 200ms ease-out;

            &:hover {
              background-color: #1a1d21;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            &:active {
              background-color: #0f1115;
              transform: scale(0.96);
            }

            &:focus-visible {
              outline: 2px solid #0aa5ff;
              outline-offset: 2px;
            }
          `}>
            Default
          </button>

          <button css={css`
            padding: 8px 16px;
            background-color: #c2c8cc;
            color: #828c94;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: not-allowed;
            opacity: 0.5;
          `} disabled>
            Disabled
          </button>

          <button css={css`
            padding: 8px 16px;
            background-color: #f7f9fa;
            color: #2f3438;
            border: 1px solid #e6e6e6;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 200ms ease-out;

            &:hover {
              border-color: #0aa5ff;
              color: #0aa5ff;
            }
          `}>
            Secondary
          </button>

          <button css={css`
            padding: 8px 16px;
            background-color: #0aa5ff;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 200ms ease-out;

            &:hover {
              background-color: #0087cc;
            }
          `}>
            Brand/CTA
          </button>
        </div>
      </div>

      {/* State Documentation */}
      <div css={css`
        background: #f7f9fa;
        border-radius: 12px;
        padding: 40px;
        margin-top: 40px;
      `}>
        <h3 css={css`font-size: 18px; font-weight: 700; color: #2f3438; margin-top: 0; margin-bottom: 16px;`}>
          See Full Specifications
        </h3>
        <p css={css`
          font-size: 14px;
          color: #828c94;
          margin: 0 0 16px 0;
          line-height: 1.6;
        `}>
          Complete state and variant specifications including hover effects, focus indicators, disabled states, loading animations, error states, and transitions are documented in:
        </p>
        <ul css={css`
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          color: #828c94;
        `}>
          <li>STATES_AND_VARIANTS.md - Complete state specifications</li>
          <li>ANIMATIONS.md - Transition and animation details</li>
          <li>tokens.ts - StateTokens namespace with exact values</li>
        </ul>
      </div>
    </div>
  );
}
