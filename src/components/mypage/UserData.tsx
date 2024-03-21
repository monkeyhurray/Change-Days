import React from "react";

export type UserDataProps = {
  id: string;
  name: string;
  url: string;
};

const UserData: React.FC<UserDataProps> = ({ id, name, url }) => {
  return (
    <div>
      <div>
        <figure className="flex flex-col items-center gap-8 mt-8">
          <img src={`${url}`} alt="유저이미지" width={150} height={150} />
          <p>{name || "유저이름"}</p>
        </figure>
      </div>
    </div>
  );
};

export default UserData;
