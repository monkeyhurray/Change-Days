"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [userNickname, setUsetNickname] = useState("");

  const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("uid", data.user.id)
        .single();
      setUser(userData);
    }
  };

  const updateNickname = async ({
    url,
    nickname,
  }: {
    url: string;
    nickname: string;
  }) => {
    const { data } = await supabase.auth.getUser();
    console.log(nickname);
    const { error } = await supabase
      .from("users")
      .update({ url, nickname })
      .eq("uid", data.user?.id);
    if (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleUpdateUser = async (name: string, url: string) => {
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .update({ name, url })
        .eq("uid", user.uid);

      if (error) {
        console.error(error);
        return;
      }
      fetchUserData();
      router.replace("/mypage");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const url = imageUrl as string;
    if (name === user.name && url === null) {
      alert("변경된 데이터가 없습니다.");
      return;
    }
    if (url) {
      handleUpdateUser(name, url);
    } else {
      handleUpdateUser(name, user.url);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImageUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUploadButtonClick = () => {
    inputFileRef.current?.click();
  };

  const onClickChangeBtn = () => {
    setUsetNickname("");
    updateNickname({ url: imageUrl!, nickname: userNickname });
    router.replace("/mypage");
  };

  if (user)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 relative" onClick={handleUploadButtonClick}>
          <label
            htmlFor="url"
            className="mr-2 font-bold cursor-pointer"
          ></label>
          <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="프로필 이미지"
                className="w-full h-full object-cover cursor-pointer"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm w-full h-full">
                  <img
                    src={user.url}
                    alt="유저프로필"
                    className="w-full h-full cursor-pointer"
                  />
                </span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="url"
            name="url"
            ref={inputFileRef}
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmitEvent}
        >
          <div className="mb-4">
            <label htmlFor="name" className="mr-2 font-bold">
              이름:
            </label>
            <input
              type="text"
              id="name"
              value={userNickname}
              onChange={(e) => setUsetNickname(e.target.value)}
              name="name"
              // defaultValue={user?.name || ''}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <button
            type="button"
            className="bg-black text-white font-bold py-2 px-4 rounded-md"
            onClick={() => onClickChangeBtn()}
          >
            저장
          </button>
        </form>
      </div>
    );
};
export default ProfilePage;
