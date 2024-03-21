'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabase/supabase';
import CustomModal from '@/components/common/CustomModal';
import { useParams, useRouter } from 'next/navigation';
import UploadModal from '@/components/common/UploadModal';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<{ name: string; url: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = async () => {
    if (typeof id === 'string') {
      const { data, error } = await supabase
        .from('users')
        .select('name, url')
        .eq('uid', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setUser(data);
    }
  };

  const handleUpdateUser = async (name: string, url: string) => {
    if (typeof id === 'string') {
      const { error } = await supabase
        .from('users')
        .update({ name, url })
        .eq('uid', id);

      if (error) {
        console.error(error);
        return;
      }

      fetchUserData();
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') as string;
    const url = formData.get('url') as string;
    handleUpdateUser(name, url);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>프로필 수정</button>
      <UploadModal handleYes={() => console.log()}>
        <form onSubmit={handleSubmitEvent}>
          <div>
            <label htmlFor='name'>이름:</label>
            <input
              type='text'
              id='name'
              name='name'
              defaultValue={user?.name || ''}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>프로필 URL:</label>
            <input
              type='file'
              id='url'
              name='url'
              defaultValue={user?.url || ''}
              required
            />
          </div>
        </form>
      </UploadModal>
    </div>
  );
};

export default ProfilePage;
