import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DialogType = "Confirm" | "Delete" | "Update";

const BtnMessage = {
  Confirm: "Confirm",
  Cancel: "Cancel",
};

interface IConfirmDialog {
  open: boolean;
  type: DialogType;
  BMessage?: typeof BtnMessage;
  onClose: () => void;
  onConfirm: () => void;
}

const TypeDialog = {
  Confirm: { message: "Are you sure you want to delete this device?", title: "Confirm" },
  Delete: { message: "Are you sure you want to delete this device?", title: "Delete" },
  Update: { message: "Are you sure you want to update this device?", title: "Update" },
};

const ConFirmDialog = ({ open, type, BMessage = BtnMessage, onClose, onConfirm }: IConfirmDialog) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{TypeDialog[type].title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{TypeDialog[type].message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{BMessage.Cancel}</Button>
        <Button onClick={onConfirm} color="primary">
          {BMessage.Confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConFirmDialog;
