"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ChatLayout from "@/components/chat-layout";

type SessionState = "searching" | "chatting" | "ended";

export default function ChatPage() {
  const [session, setSession] = useState<SessionState>("searching");
  const [sessionKey, setSessionKey] = useState(Date.now());

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (session === "searching") {
      timer = setTimeout(() => {
        setSession("chatting");
      }, 2500);
    } else if (session === "ended") {
      timer = setTimeout(() => {
        setSessionKey(Date.now());
        setSession("searching");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [session]);

  const handleEndChat = () => {
    setSession("ended");
  };

  const renderContent = () => {
    switch (session) {
      case "searching":
        return (
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-headline text-xl text-muted-foreground">Finding a stranger...</p>
          </div>
        );
      case "chatting":
        return <ChatLayout key={sessionKey} onEndChat={handleEndChat} />;
      case "ended":
        return (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-headline text-xl text-muted-foreground">Chat ended. Finding a new stranger...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-background">
      {renderContent()}
    </main>
  );
}
