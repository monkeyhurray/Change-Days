"use client";

import React from "react";

const UserChallenges = () => {
  const handleOngoingButton = (e: React.MouseEvent<HTMLDivElement>) => {};
  const handleDoneButton = (e: React.MouseEvent<HTMLDivElement>) => {};
  const handleCreateButton = (e: React.MouseEvent<HTMLDivElement>) => {};

  return (
    <div>
      <nav className="flex justify-center gap-8">
        <div onClick={handleOngoingButton}>진행</div>
        <div onClick={handleDoneButton}>완료</div>
        <div onClick={handleCreateButton}>개설</div>
      </nav>
      <section className="flex justify-center gap-8">
        <p>현재 유저의 챌린지</p>
      </section>
    </div>
  );
};

export default UserChallenges;
