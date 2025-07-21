import VideoPanel from "@/components/video-panel";
import TextChatPanel from "@/components/text-chat-panel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";

interface ChatLayoutProps {
  onEndChat: () => void;
}

export default function ChatLayout({ onEndChat }: ChatLayoutProps) {
  return (
    <div className="h-screen w-screen p-4">
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-3 md:gap-4">
        <div className="relative col-span-1 flex h-full flex-col md:col-span-2">
          <VideoPanel onEndChat={onEndChat} />
          <div className="absolute bottom-20 right-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                  <MessageSquare className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] flex flex-col">
                <SheetHeader>
                  <SheetTitle>Chat</SheetTitle>
                </SheetHeader>
                <div className="flex-grow min-h-0">
                  <TextChatPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="hidden h-full md:col-span-1 md:flex">
          <TextChatPanel />
        </div>
      </div>
    </div>
  );
}
