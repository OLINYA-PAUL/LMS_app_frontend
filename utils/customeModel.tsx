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
  refetch?: any;
}

const CustomeModel = ({
  isOpen,
  setIsOpen,
  activeItem,
  route,
  setRoute,
  Component,
  refetch,
}: modelProps) => {
  return (
    <div className="w-full flex item-center flex-col  h-auto bg-dark z-10 ">
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex flex-1 flex-col dark:bg-gradient-to-b  dark:from-blue-900 dark:to-black duration-300 w-full md:max-w-[50%]  sm:max-w-[auto]  sm:right-[25%] p-6 bg-white shadow-md rounded-lg absolute top-0 left-[25%] border dark:border-[#ffffff1c]  transition  ">
          <Component
            setIsOpen={setIsOpen}
            setRoute={setRoute}
            refetch={refetch}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomeModel;
