import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  description: z.string().min(10, "설명은 최소 10자 이상이어야 합니다"),
  genre: z.string().min(1, "장르를 선택해주세요"),
  thumbnail: z.any(),
  episodes: z.array(z.any()),
})

export function WebtoonUploadForm() {
  const [uploading, setUploading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      episodes: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setUploading(true)
      // TODO: Implement actual upload logic
      console.log(values)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="웹툰 제목" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="웹툰에 대한 설명을 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>장르</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="장르 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="romance">로맨스</SelectItem>
                  <SelectItem value="action">액션</SelectItem>
                  <SelectItem value="fantasy">판타지</SelectItem>
                  <SelectItem value="comedy">코미디</SelectItem>
                  <SelectItem value="drama">드라마</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>썸네일</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                JPG, PNG 형식의 이미지 파일 (최대 2MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="episodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>에피소드</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                에피소드 이미지 파일들을 선택해주세요 (최대 100MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={uploading}>
          {uploading ? "업로드 중..." : "업로드"}
        </Button>
      </form>
    </Form>
  )
} 