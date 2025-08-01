import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  refetch?: any;
  component: any;
  activeItem: any;
  setOpen: (open: boolean) => void;
  setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[450px] max-h-[90vh] bg-white dark:bg-slate-900 rounded-[8px] shadow-lg outline-none overflow-y-auto">
        <div className="p-6">
          <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
