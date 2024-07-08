// pages/index.js
"use client"
import FileUploader from "@/components/file-uploader";
import TikTokLoginButton from "@/components/TikTokLoginButton";
import { useRouter, useSearchParams } from "next/navigation";

export default function Upload() {
  try {
    const searchParams = useSearchParams();
    const code=searchParams.get('code')
    console.log(code)
  } catch (error) {
    console.log(error)
  }
  return (
    <div className="flex flex-col items-center py-6 md:py-8 lg:py-12">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          SequenceSnap
        </h1>
        <p className="text-sm capitalize text-gray-600">
          Smart Sequencing Made Easy.
        </p>
      </div>
      <FileUploader />
    </div>
  );
}
