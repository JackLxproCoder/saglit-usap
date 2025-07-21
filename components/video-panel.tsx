"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


interface VideoPanelProps {
  onEndChat: () => void;
}

const StrangerVideoPlaceholder = () => (
    <Card className="relative aspect-video w-full overflow-hidden bg-secondary shadow-lg">
      <Image
        src={`https://placehold.co/800x450.png`}
        alt={`Stranger's video feed`}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 hover:scale-105"
        data-ai-hint={"person portrait"}
      />
      <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
        Stranger
      </div>
    </Card>
  );

export default function VideoPanel({ onEndChat }: VideoPanelProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not available in this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    // Cleanup function to stop video tracks when component unmounts
    return () => {
        if (userVideoRef.current && userVideoRef.current.srcObject) {
            const stream = userVideoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  useEffect(() => {
    if (userVideoRef.current && userVideoRef.current.srcObject) {
      const stream = userVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOff;
      });
    }
  }, [isMuted, isVideoOff]);

  return (
    <div className="flex h-full flex-col items-center justify-between gap-4">
      <div className="grid flex-grow grid-cols-1 gap-4 lg:grid-cols-2 w-full">
        <StrangerVideoPlaceholder />
        <Card className="relative aspect-video w-full overflow-hidden bg-secondary shadow-lg">
            <video ref={userVideoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
            <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
                You
            </div>
            {!hasCameraPermission && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <Alert variant="destructive" className="w-4/5">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access in your browser to use this feature. You might need to refresh the page.
                        </AlertDescription>
                    </Alert>
                 </div>
            )}
        </Card>
      </div>
      <Card className="w-full max-w-sm p-2 shadow-xl">
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" onClick={() => setIsVideoOff(!isVideoOff)}>
            {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
          </Button>
          <Button variant="destructive" size="icon" className="rounded-full h-12 w-12" onClick={onEndChat}>
            <PhoneOff className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={onEndChat}>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
