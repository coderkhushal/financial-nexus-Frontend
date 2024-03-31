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

const TableContainer = ({ data }) => {
  const Cards = data?.Cards;
  const Banks = data?.Banks;
  console.log(Cards);
  return (
    <Table>
      <TableCaption>A list of your recent Cards.</TableCaption>
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
                  <TableCell>{Card.balance}</TableCell>
                  <TableCell>
                    {Card.disabled ? <p>Disabled</p> : <p>Active</p>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DialogBox
                      endpoint={`/data-edit/${Card.id}/delete-card/`}
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </TableBody>
    </Table>
  );
};

export default TableContainer;
