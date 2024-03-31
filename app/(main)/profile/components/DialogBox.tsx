import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { deleteData } from "../Fetch/apis";
import { userfirebase } from "@/context/firebase";

function DialogBox({ endpoint }: { endpoint: string }) {
  const { User } = userfirebase();
  const firebase_user_id = User?._tokenResponse.idToken;
  const deletedata = async () => {
    console.log(endpoint);
    const res = await deleteData(firebase_user_id, endpoint);
    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge variant="delete" className="cursor-pointer">
          Delete
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="flex justify-center">
            <h1 className="font-medium">Are you sure you want to delete?</h1>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="delete" onClick={deletedata}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
