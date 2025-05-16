import { Metadata } from "next"
import { WebtoonUploadForm } from "@/components/dashboard/webtoon-upload-form"

export const metadata: Metadata = {
  title: "웹툰 업로드",
  description: "새로운 웹툰 또는 에피소드를 업로드합니다.",
}

export default function WebtoonUploadPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">웹툰 업로드</h1>
        <WebtoonUploadForm />
      </div>
    </div>
  )
} 