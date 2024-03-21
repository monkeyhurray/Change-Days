"use client";

import React, { PropsWithChildren } from "react";
import { FaCamera } from "react-icons/fa6";
import CustomModal from "./CustomModal";
type UploadModalProps = {
  handleYes: () => void;
};
const UploadModal = ({ handleYes }: PropsWithChildren<UploadModalProps>) => {
  return (
    <CustomModal isOpen={true} handleYes={handleYes}>
      <div className="flex flex-col items-center h-60 justify-center bg-gray-100 m-5 cursor-pointer">
        <FaCamera size={30} className="text-gray-400" />
        <p className="text-gray-400">사진 올리기</p>
      </div>
    </CustomModal>
  );
};

export default UploadModal;
