import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DialogBox from "@/app/main/profile/components/DialogBox";
import EditBox from "./EditBox";
interface emiloantabledata{
  Assets: any;
  Fds: any
}
const EmiLoanTable = ( {data} : {data:emiloantabledata}) => {
  const Assets = data?.Assets;
  const Fds = data?.Fds;

  console.log(Assets);
  console.log(Fds);
  return (
    <Table>
      <TableCaption>A list of your recent Assets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Initial Amount</TableHead>
          <TableHead className="">Sell Amount </TableHead>
          <TableHead className="text-center">-</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Assets ? (
          Assets.map((Asset: any) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">{Asset.name}</TableCell>
                  <TableCell>{Asset.initial_amount}</TableCell>
                  <TableCell>{Asset.sell_price}</TableCell>
                  <TableCell className="text-right">
                    <EditBox
                      endpoint={`/data-edit/${Asset.id}/sell-asset/`}
                      value={{ Asset }}
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })
        ) : (
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Available</TableCell>
          </TableRow>
        )}
        {Fds ? (
          Fds.map((Fd :any) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">{Fd.bank_name}</TableCell>
                  <TableCell>{Fd.initial_amount}</TableCell>
                  <TableCell>{Fd.sell_amount}</TableCell>
                  <TableCell className="text-right">
                    <EditBox
                      endpoint={`/data-edit/${Fd.id}/sell-fd/`}
                      value={{ Fd }}
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })
        ) : (
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EmiLoanTable;
