import React, { Component, SetStateAction } from "react";
import Modal, { ModalProps } from "@mui/material/Modal/Modal";
import { Box } from "@mui/material";

interface modelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: number;
  route: string;
  setRoute: React.Dispatch<SetStateAction<string>>;
  Component: any;
}

const CustomeModel = ({
  isOpen,
  setIsOpen,
  activeItem,
  route,
  setRoute,
  Component,
}: modelProps) => {
  return (
    <div className="w-full flex item-center flex-col  h-auto bg-dark z-10">
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex flex-1 flex-col dark:bg-gradient-to-b  dark:from-blue-900 dark:to-black duration-300 w-full md:max-w-[50%] p-6 bg-white shadow-md rounded-lg absolute top-[6%] left-[25%] border-2 dark:border-[#ffffff1c]  transition ">
          <Component setOpen={setIsOpen} setRoute={setRoute} />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomeModel;
