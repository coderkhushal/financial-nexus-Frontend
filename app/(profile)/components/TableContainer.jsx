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
import DialogBox from "@/app/(profile)/components/DialogBox";
import EditBox from "./EditBox";

const TableContainer = () => {
  return (
    <Table>
      <TableCaption>A list of your recent purchases.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">House</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>
            <EditBox />
          </TableCell>
          <TableCell className="text-right">
            <DialogBox />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableContainer;
