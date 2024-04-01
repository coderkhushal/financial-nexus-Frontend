import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use, useState } from "react";
import { sellassetfd } from "../Fetch/apis";
import { getHeaders } from "@/helpers/getHeaders";
const SERVER =
  "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/";

function EditBox({
  endpoint,
  asset,
  fd,
  Banks,
  Emi,
  Loan,
}: {
  endpoint: any;
  asset?: any;
  fd?: any;
  Banks: any;
  Loan?: any;
  Emi?: any;
}) {
  console.log(asset, endpoint, fd, Banks);
  const [amount, setamount] = useState("");
  const [remarks, setremarks] = useState("");
  const [selectbank, setselectbank] = useState("");
  const [bankid, setbankid] = useState("");
  console.log(selectbank, bankid);
  const dataassetfd = {
    remarks: remarks,
    to_account_id: bankid,
    amount: amount,
  };

  const dataemiloan = {
    remarks: remarks,
    from_account_id: bankid,
    amount: amount,
  };
  console.log(dataemiloan);

  const submit2 = async () => {
    try {
      const res = await fetch(`${SERVER}${endpoint}`, {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify(dataemiloan),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data1 = await res.json();
      console.log(data1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submit = async () => {
    try {
      const res = await fetch(`${SERVER}${endpoint}`, {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify(dataassetfd),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data1 = await res;
      console.log(data1);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge variant="outline" className="cursor-pointer">
          {asset || fd ? "Sell" : Emi || Loan ? "Pay" : ""}
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sell Asset/Fds</DialogTitle>
          <DialogDescription>
            Make changes to your Purchases here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select
            value={selectbank}
            onValueChange={(event: any) => {
              setselectbank(event);
              setbankid(event.id);
            }}
          >
            <SelectTrigger className="w-[full]">
              <SelectValue placeholder="Select bank account" />
            </SelectTrigger>
            <SelectContent>
              {Banks.Banks ? (
                Banks.Banks.map((Bank: any) => {
                  return (
                    <SelectItem key={Bank.id} value={Bank}>
                      {Bank.name}
                    </SelectItem>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </SelectContent>
          </Select>

          {asset && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Amount
                </Label>
                <Input
                  id="name"
                  value={amount}
                  placeholder="0"
                  className="col-span-3"
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Remarks
                </Label>
                <Input
                  id="username"
                  value={remarks}
                  onChange={(e) => setremarks(e.target.value)}
                  placeholder={`selling ${asset.Asset.name} to buy a new house`}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          {Emi && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Amount
                </Label>
                <Input
                  id="name"
                  value={amount}
                  placeholder="0"
                  className="col-span-3"
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Remarks
                </Label>
                <Input
                  id="username"
                  value={remarks}
                  onChange={(e) => setremarks(e.target.value)}
                  placeholder={`selling ${Emi.Emi.name} to buy a new house`}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          {Loan && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Amount
                </Label>
                <Input
                  id="name"
                  value={amount}
                  placeholder="0"
                  className="col-span-3"
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Remarks
                </Label>
                <Input
                  id="username"
                  value={remarks}
                  onChange={(e) => setremarks(e.target.value)}
                  placeholder={`selling ${Loan.Loan.name} to buy a new house`}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          {fd && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Amount
                </Label>
                <Input
                  id="name"
                  value={amount}
                  placeholder="0"
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Remarks
                </Label>
                <Input
                  id="username"
                  value={remarks}
                  onChange={(e) => setremarks(e.target.value)}
                  placeholder={`selling ${fd.Fd.bank_name} to buy a new house`}
                  className="col-span-3"
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              if (asset || fd) {
                submit();
              } else if (Emi || Loan) {
                submit2();
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBox;
