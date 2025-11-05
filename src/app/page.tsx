"use client";

import { css } from "@emotion/react";
import { ConsultationChat } from "@/components/ConsultationChat";

const mainStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const containerStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const chatWrapperStyle = css`
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 800px;
`;

export default function Home() {
  return (
    <main css={mainStyle}>
      <div css={containerStyle}>
        <div css={chatWrapperStyle}>
          <ConsultationChat
            userId="user_default"
            initialMessage="Hi! Welcome! I'm here to help you create a space you'll love.\n\nWhat brings you here today?"
          />
        </div>
      </div>
    </main>
  );
}
