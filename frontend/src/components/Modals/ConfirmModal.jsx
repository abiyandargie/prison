import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export default function ConfirmModal({ open, setOpen, onDelete , message}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">{ message}</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
