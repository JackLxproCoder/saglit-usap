"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquareDashed } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [interests, setInterests] = useState("");

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    
    router.push("/chat");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MessageSquareDashed className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">SaglitUsap</CardTitle>
          <CardDescription>Connect with someone new. Share a story.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStartChat}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="interests">Your Interests (optional)</Label>
                <Input 
                  id="interests" 
                  placeholder="e.g. music, travel, coding" 
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Separate interests with commas.</p>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Start Chatting
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">Made with ❤️ by Jack 2025</p>
        </CardFooter>
      </Card>
    </div>
  );
}
