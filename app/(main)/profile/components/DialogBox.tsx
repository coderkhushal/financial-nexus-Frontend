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
const SERVER =
  "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/";
import { getHeaders } from "@/helpers/getHeaders";

function DialogBox({ endpoint }: { endpoint: string }) {
  const deletedata = async () => {
    console.log(endpoint);
    try {
      const res = await fetch(`${SERVER}${endpoint}`, {
        method: "GET",
        headers: await getHeaders(),
      });
      if (!res.ok) {
        throw new Error("Failed to delete data");
      }
      if (res.status === 204) {
        console.log("Data deleted successfully");
      } else {
        const data = "what";
        console.log(data);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
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
          <DialogClose asChild>
            <Button type="button" variant="delete" onClick={deletedata}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
