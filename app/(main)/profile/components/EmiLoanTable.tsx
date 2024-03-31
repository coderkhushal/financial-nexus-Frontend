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
import DialogBox from "@/app/(main)/profile/components/DialogBox";
import EditBox from "./EditBox";

const EmiLoanTable = ({ data }) => {
  const Emis = data?.Emis;
  const Loans = data?.Loans;

  return (
    <Table>
      <TableCaption>A list of your recent Emi's.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Bank</TableHead>
          <TableHead>Commodity</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="text-center">-</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Emis ? (
          Emis.map((Emi) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">{Emi.bank_name}</TableCell>
                  <TableCell>{Emi.name}</TableCell>
                  <TableCell>
                    {Emi.disabled ? <p>Disabled</p> : <p>Active</p>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DialogBox endpoint={`/data-edit/${Emi.id}/close-emi/`} />
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
        {Loans ? (
          Loans.map((Loan) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">
                    {Loan.bank_name}
                  </TableCell>
                  <TableCell>{Loan.name}</TableCell>
                  <TableCell>
                    {Loan.disabled ? <p>Disabled</p> : <p>Active</p>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DialogBox endpoint={`/data-edit/${Loan.id}/close-loan/`} />
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
