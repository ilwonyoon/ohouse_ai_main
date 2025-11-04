'use client';

import { css } from '@emotion/react';
import { CodeBlock } from '../CodeBlock';
import { ComponentPreview } from '../ComponentPreview';

export default function InputPage() {
  const pageStyle = css`
    max-width: 900px;
  `;

  const headingStyle = css`
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 700;
    color: #2f3438;
  `;

  const descriptionStyle = css`
    margin: 0 0 32px 0;
    font-size: 16px;
    color: #828c94;
    line-height: 1.6;
  `;

  const sectionStyle = css`
    margin: 48px 0;

    > h2 {
      margin: 0 0 24px 0;
      font-size: 24px;
      font-weight: 700;
      color: #2f3438;
      border-bottom: 2px solid #e6e6e6;
      padding-bottom: 12px;
    }
  `;

  const propsTableStyle = css`
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;

    th {
      text-align: left;
      padding: 12px;
      background-color: #f7f9fa;
      border-bottom: 2px solid #e6e6e6;
      font-weight: 600;
      color: #2f3438;
      font-size: 14px;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #e6e6e6;
      font-size: 14px;
      color: #2f3438;
    }

    code {
      background-color: #f7f9fa;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      color: #0aa5ff;
    }
  `;

  const inputGroupStyle = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  `;

  const labelStyle = css`
    font-size: 14px;
    font-weight: 600;
    color: #2f3438;
  `;

  const inputStyle = css`
    padding: 10px 12px;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    font-size: 14px;
    color: #2f3438;
    font-family: inherit;
    transition: all 200ms ease-out;

    &:focus {
      outline: none;
      border-color: #0aa5ff;
      box-shadow: 0 0 0 3px rgba(10, 165, 255, 0.1);
    }

    &::placeholder {
      color: #c2c8cc;
    }
  `;

  const errorInputStyle = css`
    padding: 10px 12px;
    border: 1px solid #ff4444;
    border-radius: 6px;
    font-size: 14px;
    color: #2f3438;
    font-family: inherit;
    transition: all 200ms ease-out;

    &:focus {
      outline: none;
      border-color: #ff4444;
      box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
    }

    &::placeholder {
      color: #c2c8cc;
    }
  `;

  const successInputStyle = css`
    padding: 10px 12px;
    border: 1px solid #27ae60;
    border-radius: 6px;
    font-size: 14px;
    color: #2f3438;
    font-family: inherit;
    transition: all 200ms ease-out;

    &:focus {
      outline: none;
      border-color: #27ae60;
      box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    }

    &::placeholder {
      color: #c2c8cc;
    }
  `;

  const helperTextStyle = css`
    font-size: 12px;
    color: #828c94;
    margin-top: 4px;
  `;

  const errorTextStyle = css`
    font-size: 12px;
    color: #ff4444;
    margin-top: 4px;
  `;

  const importCode = `import { Input } from '@/components/Input';

export function MyComponent() {
  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder="Enter text..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`;

  const basicUsageCode = `<Input placeholder="Default input" />
<Input placeholder="With value" value="Some text" />
<Input placeholder="Disabled" disabled />
<Input placeholder="With error" hasError={true} />`;

  const propsCode = `interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  hasError?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}`;

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Input</h1>
      <p css={descriptionStyle}>
        A flexible text input component that supports various input types, validation states, and
        helper text. Use inputs for collecting text data from users in forms and dialogs.
      </p>

      <div css={sectionStyle}>
        <h2>Live Preview</h2>
        <ComponentPreview>
          <div css={css`width: 100%; max-width: 300px;`}>
            <div css={inputGroupStyle}>
              <label css={labelStyle}>Default Input</label>
              <input css={inputStyle} type="text" placeholder="Enter text..." />
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>Installation</h2>
        <p>Copy the input component to your project:</p>
        <CodeBlock
          code={`cp components/input.tsx your-project/src/components/Input.tsx`}
          language="bash"
        />
      </div>

      <div css={sectionStyle}>
        <h2>Usage</h2>
        <CodeBlock code={importCode} language="typescript" />
      </div>

      <div css={sectionStyle}>
        <h2>Examples</h2>
        <h3 css={css`margin: 24px 0 16px 0; font-size: 18px; font-weight: 600; color: #2f3438;`}>
          Basic States
        </h3>
        <ComponentPreview description="Different input states">
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 24px;
              width: 100%;
              max-width: 400px;
            `}
          >
            <div css={inputGroupStyle}>
              <label css={labelStyle}>Default</label>
              <input css={inputStyle} type="text" placeholder="Enter text..." />
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>With Helper Text</label>
              <input css={inputStyle} type="text" placeholder="Enter email..." />
              <span css={helperTextStyle}>
                We'll never share your email with anyone else.
              </span>
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>With Error</label>
              <input css={errorInputStyle} type="text" placeholder="Invalid input" />
              <span css={errorTextStyle}>This field is required</span>
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>Success State</label>
              <input css={successInputStyle} type="text" value="Valid input" readOnly />
              <span css={helperTextStyle}>✓ Email verified</span>
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>Disabled</label>
              <input css={inputStyle} type="text" placeholder="Disabled input" disabled />
            </div>
          </div>
        </ComponentPreview>

        <h3 css={css`margin: 32px 0 16px 0; font-size: 18px; font-weight: 600; color: #2f3438;`}>
          Input Types
        </h3>
        <ComponentPreview description="Various input types">
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
              max-width: 400px;
            `}
          >
            <div css={inputGroupStyle}>
              <label css={labelStyle}>Text</label>
              <input css={inputStyle} type="text" placeholder="Text input" />
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>Email</label>
              <input css={inputStyle} type="email" placeholder="your@email.com" />
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>Password</label>
              <input css={inputStyle} type="password" placeholder="••••••••" />
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>Number</label>
              <input css={inputStyle} type="number" placeholder="0" />
            </div>

            <div css={inputGroupStyle}>
              <label css={labelStyle}>URL</label>
              <input css={inputStyle} type="url" placeholder="https://example.com" />
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>API Reference</h2>
        <h3 css={css`margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
          Props
        </h3>
        <table css={propsTableStyle}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>type</td>
              <td>
                <code>string</code>
              </td>
              <td>'text'</td>
              <td>Input type (text, email, password, number, etc.)</td>
            </tr>
            <tr>
              <td>placeholder</td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td>value</td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>Input value</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>
                <code>boolean</code>
              </td>
              <td>false</td>
              <td>Whether input is disabled</td>
            </tr>
            <tr>
              <td>hasError</td>
              <td>
                <code>boolean</code>
              </td>
              <td>false</td>
              <td>Whether input has error state</td>
            </tr>
            <tr>
              <td>error</td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>Error message text</td>
            </tr>
            <tr>
              <td>helperText</td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>Helper text below input</td>
            </tr>
          </tbody>
        </table>

        <h3 css={css`margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
          Type Definitions
        </h3>
        <CodeBlock code={propsCode} language="typescript" />
      </div>

      <div css={sectionStyle}>
        <h2>Accessibility</h2>
        <ul
          css={css`
            margin: 0;
            padding-left: 20px;
            color: #2f3438;
            line-height: 1.8;

            li {
              margin-bottom: 12px;
            }

            code {
              background-color: #f7f9fa;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: monospace;
              color: #0aa5ff;
            }
          `}
        >
          <li>All inputs have associated labels for screen reader users</li>
          <li>Focus indicators are clearly visible (blue outline)</li>
          <li>Error messages are associated with inputs using aria-describedby</li>
          <li>Disabled inputs have proper disabled attribute and reduced opacity</li>
          <li>Input types are properly set (email, password, number, etc.) for browser validation</li>
          <li>Color contrast meets WCAG AA standards for all states</li>
        </ul>
      </div>

      <div css={sectionStyle}>
        <h2>Best Practices</h2>
        <ul
          css={css`
            margin: 0;
            padding-left: 20px;
            color: #2f3438;
            line-height: 1.8;

            li {
              margin-bottom: 12px;
            }
          `}
        >
          <li>
            <strong>Labels:</strong> Always provide labels for inputs, even if visually hidden
          </li>
          <li>
            <strong>Placeholders:</strong> Use placeholders as hints, not primary labels
          </li>
          <li>
            <strong>Validation:</strong> Show validation errors in real-time when possible
          </li>
          <li>
            <strong>Helper text:</strong> Provide clear helper text for complex fields
          </li>
          <li>
            <strong>Input types:</strong> Use semantic input types for better browser support
          </li>
        </ul>
      </div>
    </div>
  );
}
