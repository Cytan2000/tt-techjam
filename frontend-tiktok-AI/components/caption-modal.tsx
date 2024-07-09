"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CaptionModal({
  open,
  setIsOpen,
  onSubmit,
  images,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (caption: string) => void;
  images: string[];
}) {
  const [caption, setCaption] = useState("");
  const generateCaption = async (e:any) => {
    e.preventDefault();

    const formattedFiles = images.map((image: any, index) => ({
      type: "image_url",
      image_url: { url: image.image },
    }));
      
    const additionalDictionary = {
      type: "text",
      text: "I am creating a TikTok slideshow post, I will upload a series of images, using details such as main objects, time of day, and location, generate a summarised caption suitable for the series of images",
    };
    // Prepend the additional dictionary
    const finalFormattedFiles = [additionalDictionary, ...formattedFiles];

    const aiResponse = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({
        input: finalFormattedFiles,
      }),
    });
    const response =  await aiResponse.json();
    setCaption(response);
    return response;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(caption);
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caption</DialogTitle>
          <DialogDescription>
            Fill in the caption for your upload.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Textarea
              name="caption"
              placeholder="Tell us more about your upload"
              rows={6}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button variant="link" className="px-0" onClick={generateCaption}>
              Generate caption with AI
            </Button>
          </div>
          <Button className="w-full font-normal" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
