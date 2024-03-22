"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/supabase/supabase";
const ProfilePage = () => {
  const [user, setUser] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
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
    handleUpdateUser(name, url);
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
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  <img src={user.url} />
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
              이름:{user ? user.name : ""}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user?.name || ""}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white font-bold py-2 px-4 rounded-md"
          >
            저장
          </button>
        </form>
      </div>
    );
};
export default ProfilePage;
