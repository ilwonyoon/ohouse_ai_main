'use client';

import { css } from '@emotion/react';
import { CodeBlock } from '../CodeBlock';
import { ComponentPreview } from '../ComponentPreview';

export default function CardPage() {
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

  const cardStyle = css`
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    background-color: #ffffff;
    overflow: hidden;
    transition: all 200ms ease-out;

    &:hover {
      border-color: #0aa5ff;
      box-shadow: 0 4px 12px rgba(10, 165, 255, 0.12);
    }
  `;

  const cardHeaderStyle = css`
    padding: 24px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #f7f9fa;
  `;

  const cardTitleStyle = css`
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: #2f3438;
  `;

  const cardSubtitleStyle = css`
    margin: 0;
    font-size: 14px;
    color: #828c94;
  `;

  const cardBodyStyle = css`
    padding: 24px;
  `;

  const cardFooterStyle = css`
    padding: 16px 24px;
    border-top: 1px solid #e6e6e6;
    background-color: #f7f9fa;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  `;

  const buttonStyle = css`
    padding: 8px 16px;
    background-color: #0aa5ff;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      background-color: #0087cc;
    }
  `;

  const importCode = `import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@/components/Card';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardBody>
        Card content goes here
      </CardBody>
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    </Card>
  );
}`;

  const basicUsageCode = `<Card>
  <CardHeader>
    <CardTitle>Design System</CardTitle>
  </CardHeader>
  <CardBody>
    A comprehensive guide to building consistent user interfaces.
  </CardBody>
  <CardFooter>
    <button>Learn More</button>
  </CardFooter>
</Card>`;

  const propsCode = `interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}`;

  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>Card</h1>
      <p css={descriptionStyle}>
        A container component for grouping related content. Cards are versatile containers that
        can hold text, images, forms, and other content with consistent styling and spacing.
      </p>

      <div css={sectionStyle}>
        <h2>Live Preview</h2>
        <ComponentPreview>
          <div css={cardStyle}>
            <div css={cardHeaderStyle}>
              <h3 css={cardTitleStyle}>Card Title</h3>
              <p css={cardSubtitleStyle}>Card subtitle or description</p>
            </div>
            <div css={cardBodyStyle}>
              This is the main content area of the card. It can contain text, images, forms, or
              any other content you need.
            </div>
            <div css={cardFooterStyle}>
              <button css={buttonStyle}>Action</button>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>Installation</h2>
        <p>Copy the card components to your project:</p>
        <CodeBlock
          code={`cp components/card.tsx your-project/src/components/Card.tsx`}
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
          Basic Card
        </h3>
        <ComponentPreview description="A simple card with header, body, and footer">
          <div css={cardStyle}>
            <div css={cardHeaderStyle}>
              <h3 css={cardTitleStyle}>Getting Started</h3>
              <p css={cardSubtitleStyle}>Learn the basics of the design system</p>
            </div>
            <div css={cardBodyStyle}>
              Welcome to the Ohouse AI design system. This comprehensive guide will help you
              understand the principles and components used throughout the application.
            </div>
            <div css={cardFooterStyle}>
              <button css={buttonStyle}>Start Learning</button>
            </div>
          </div>
        </ComponentPreview>

        <h3 css={css`margin: 32px 0 16px 0; font-size: 18px; font-weight: 600; color: #2f3438;`}>
          Card Variations
        </h3>
        <ComponentPreview description="Cards with different layouts and content types">
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 24px;
              width: 100%;
            `}
          >
            <div css={cardStyle}>
              <div css={cardBodyStyle}>
                <h3 css={css`margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
                  Minimal Card
                </h3>
                <p css={css`margin: 0; font-size: 14px; color: #828c94;`}>
                  A card with just body content
                </p>
              </div>
            </div>

            <div css={cardStyle}>
              <div css={cardHeaderStyle}>
                <h3 css={cardTitleStyle}>Feature Card</h3>
              </div>
              <div css={cardBodyStyle}>
                Cards with headers and titles for organized content structure
              </div>
            </div>

            <div css={cardStyle}>
              <div css={cardBodyStyle}>
                <h3 css={css`margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
                  Icon + Text
                </h3>
                <p css={css`margin: 0; font-size: 14px; color: #828c94; line-height: 1.6;`}>
                  Cards can contain various types of content including images and icons
                </p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div css={sectionStyle}>
        <h2>API Reference</h2>
        <h3 css={css`margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; color: #2f3438;`}>
          Component Props
        </h3>
        <table css={propsTableStyle}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Prop</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Card</td>
              <td>children</td>
              <td>
                <code>React.ReactNode</code>
              </td>
              <td>Card content (CardHeader, CardBody, CardFooter)</td>
            </tr>
            <tr>
              <td>CardHeader</td>
              <td>children</td>
              <td>
                <code>React.ReactNode</code>
              </td>
              <td>Header content, typically includes CardTitle</td>
            </tr>
            <tr>
              <td>CardTitle</td>
              <td>children</td>
              <td>
                <code>React.ReactNode</code>
              </td>
              <td>Title text for the card</td>
            </tr>
            <tr>
              <td>CardBody</td>
              <td>children</td>
              <td>
                <code>React.ReactNode</code>
              </td>
              <td>Main content area</td>
            </tr>
            <tr>
              <td>CardFooter</td>
              <td>children</td>
              <td>
                <code>React.ReactNode</code>
              </td>
              <td>Footer content, typically contains buttons</td>
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
          <li>Cards use semantic HTML with proper heading hierarchy</li>
          <li>Focus states are visible for interactive elements within cards</li>
          <li>Sufficient color contrast for all text content</li>
          <li>Cards don't rely on color alone to convey information</li>
          <li>Interactive elements within cards are keyboard accessible</li>
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
            <strong>Structure:</strong> Use CardHeader for titles, CardBody for content, and
            CardFooter for actions
          </li>
          <li>
            <strong>Content:</strong> Keep card content concise and focused on a single topic
          </li>
          <li>
            <strong>Actions:</strong> Place primary actions in CardFooter for easy access
          </li>
          <li>
            <strong>Spacing:</strong> Maintain consistent spacing between cards in lists
          </li>
          <li>
            <strong>Hover states:</strong> Cards include subtle hover effects for interactivity
            feedback
          </li>
        </ul>
      </div>
    </div>
  );
}
