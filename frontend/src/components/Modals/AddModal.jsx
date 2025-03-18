import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import RegisterVisitor from '../../components/Visitor/RegisterVisitor'

export default function AddModal({ open, setOpen , children}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
        </DialogHeader>
        { children}
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
