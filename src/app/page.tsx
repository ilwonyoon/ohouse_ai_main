"use client";

import { ConsultationChat } from "@/components/ConsultationChat";

const mainStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
};

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const chatWrapperStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  height: "100%",
  maxHeight: "800px",
};

export default function Home() {
  return (
    <main style={mainStyle}>
      <div style={containerStyle}>
        <div style={chatWrapperStyle}>
          <ConsultationChat
            userId="user_default"
            initialMessage="Hi! Welcome! I'm here to help you create a space you'll love.\n\nWhat brings you here today?"
          />
        </div>
      </div>
    </main>
  );
}
