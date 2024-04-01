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
interface emidata {
  Emis: any;
  Loans: any;
  Banks: any;
}
const EmiLoanTable = ({ data }: { data: emidata }) => {
  const Emis = data?.Emis;
  const Loans = data?.Loans;
  const Banks = data?.Banks;
  console.log(Emis, Loans);

  return (
    <Table>
      <TableCaption>A list of your recent Emi.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Bank</TableHead>
          <TableHead>Commodity</TableHead>
          <TableHead className="">Total/Pending Amount</TableHead>
          <TableHead className="text-center">-</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Emis ? (
          Emis.map((Emi: any) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">{Emi.bank_name}</TableCell>
                  <TableCell>{Emi.name}</TableCell>
                  <TableCell>{Emi.pending}</TableCell>
                  <TableCell className="text-right">
                    <EditBox
                      endpoint={`data-edit/${Emi.id}/pay-emi/`}
                      Banks={{ Banks }}
                      Emi={{ Emi }}
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
        {Loans ? (
          Loans.map((Loan: any) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">
                    {Loan.bank_name}
                  </TableCell>
                  <TableCell>{Loan.name}</TableCell>
                  <TableCell>{Loan.total_amount}</TableCell>
                  <TableCell className="text-right">
                    <EditBox
                      endpoint={`data-edit/${Loan.id}/pay-loan/`}
                      Banks={{ Banks }}
                      Loan={{ Loan }}
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
