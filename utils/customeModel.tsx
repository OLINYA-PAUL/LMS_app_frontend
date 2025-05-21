import React, { SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

interface ModelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: number;
  route: string;
  setRoute: React.Dispatch<SetStateAction<string>>;
  Component: any;
  refetch?: any;
}

const CustomModal = ({
  isOpen,
  setIsOpen,
  activeItem,
  route,
  setRoute,
  Component,
  refetch,
}: ModelProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        outline: "none",
        border: "none",
      }}
    >
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        dark:bg-gray-900 bg-white text-gray-900 dark:text-white 
        w-[400px] max-sm:w-[300px] rounded border-none outline-none p-2"
        sx={{
          outline: "none",
          border: "none",
          boxShadow: "none", // Remove box shadow
        }}
      >
        <Component
          setIsOpen={setIsOpen}
          setRoute={setRoute}
          refetch={refetch}
        />
      </Box>
    </Modal>
  );
};

export default CustomModal;
