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

const TableContainer = ({ data }) => {
  const formatBalance = (number) => {
    const numString = number?.toString();
    const numDigits = numString.length;

    if (numDigits > 7) {
      return "High Balance";
    } else {
      // Add commas for better readability
      const formattedBalance = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `₹${formattedBalance}`; // Add the rupee sign
    }
  };

  const Cards = data?.Cards;
  const Banks = data?.Banks;
  return (
    <Table>
      <TableCaption>
        A list of your recent Cards. <br /> *Note account with balance greater
        than 1 million is considered High Balance Account
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"> Name</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Cards ? (
          Cards.map((Card) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">
                    {Card.card_name}
                  </TableCell>
                  <TableCell>
                    {Card.balance && formatBalance(Card.balance)}
                  </TableCell>
                  <TableCell>
                    {Card.disabled ? <p>Disabled</p> : <p>Active</p>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DialogBox endpoint={`data-edit/${Card.id}/delete-card/`} />
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
        {Banks ? (
          Banks.map((Bank) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">
                    {Bank.bank_name}
                  </TableCell>
                  <TableCell>
                    {Bank.balance && formatBalance(Bank.balance)}
                  </TableCell>
                  <TableCell>
                    {Bank.disabled ? <p>Disabled</p> : <p>Active</p>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DialogBox
                      endpoint={`/data-edit/${Bank.id}/delete-bank/`}
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

export default TableContainer;
