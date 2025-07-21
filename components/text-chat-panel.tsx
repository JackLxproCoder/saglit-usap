"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  sender: "You" | "Stranger";
  text: string;
};

const strangerResponses = [
  "Interesting!",
  "Tell me more.",
  "Haha, that's funny.",
  "I see.",
  "What do you think?",
  "Cool!",
  "Really?",
];

export default function TextChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "Stranger", text: "Hey there! What's on your mind?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector("div");
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage: Message = { sender: "You", text: newMessage };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate stranger's reply
    setTimeout(() => {
      const randomResponse = strangerResponses[Math.floor(Math.random() * strangerResponses.length)];
      const strangerMessage: Message = { sender: "Stranger", text: randomResponse };
      setMessages((prev) => [...prev, strangerMessage]);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <Card className="flex h-full w-full flex-col shadow-none border-none">
      <CardHeader className="md:hidden">
        {/* Title is handled by SheetHeader on mobile */}
      </CardHeader>
      <CardHeader className="hidden md:block">
         <CardTitle className="font-headline">Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-2",
                  msg.sender === "You" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-xs rounded-lg p-3 text-sm lg:max-w-sm",
                    msg.sender === "You"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
