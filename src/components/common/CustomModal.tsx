"use client";
import React, { PropsWithChildren, ReactNode, useState } from "react";
import { IoClose } from "react-icons/io5";
type CustomModalProps = {
  isOpen: boolean;
  children: ReactNode;
  handleYes?: () => void;
};
const CustomModal = ({
  isOpen,
  children,
  handleYes,
}: PropsWithChildren<CustomModalProps>) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  // 모달이 닫힐 때 상태 변경
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      )}
      {isModalOpen && (
        <div className="text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 w-96">
          <button
            onClick={handleCloseModal}
            className="mt-2 px-1 py-1 text-black mx-auto absolute right-2 top-0"
          >
            <IoClose size={30} />
          </button>
          <div>{children}</div>
          {handleYes && (
            <button className="mt-4 mr-2 px-4 py-2 bg-black text-white rounded hover:bg-blue-600 mx-auto">
              확인
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CustomModal;
