import React from "react";
import bonobo from "../../../public/bonobo.jpeg";
export type UserDataProps = {
  name: string;
  bonobo: File;
  nickname: string;
  email: string;
  url: string;
};

const UserData: React.FC<UserDataProps> = () => {
  return (
    <div>
      <figure className="flex flex-col items-center gap-8 mt-8">
        <img src={bonobo} alt="유저이미지" width={150} height={150} />
        <p>{name || "유저이름"}</p>
      </figure>
    </div>
  );
};

export default UserData;
