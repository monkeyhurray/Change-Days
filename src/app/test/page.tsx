// app/page.jsx
// "use client" 지시어를 사용하여 클라이언트 측에서만 실행되도록 설정
"use client";

// app/page.tsx

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabase";

// Supabase 클라이언트 초기화 (이 부분은 실제 환경에 맞게 조정해야 함)

function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImageToChallengeFolder = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`; // 고유한 파일명 생성

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(`challenge/${fileName}`, file);

    if (uploadError) {
      throw new Error("이미지 업로드 실패: " + uploadError.message);
    }

    return `${process.env
      .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/challenge/${fileName}`;
  };

  const insertThumbnailUrl = async (thumbnailUrl: string) => {
    const { data, error } = await supabase
      .from("challenges")
      .insert([{ thumbnail: thumbnailUrl }]);

    if (error) {
      throw new Error("데이터베이스 삽입 실패: " + error.message);
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const uploadedImageUrl = await uploadImageToChallengeFolder(file);
      await insertThumbnailUrl(uploadedImageUrl);
      alert("이미지가 성공적으로 업로드되었습니다.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default function Page() {
  return (
    <div>
      <h1>Image Upload to Supabase</h1>
      <ImageUploader />
    </div>
  );
}
