"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Personal from "@/app/(main)/profile/components/Personal";
import TableContainer from "@/app/(main)/profile/components/TableContainer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  return (
    <div className="mt-14 mr-4 md:ml-20 ml-4">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Purchases/Investments</CardTitle>
              <TableContainer />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loans/EMI</CardTitle>
              <TableContainer />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card/Bank</CardTitle>
              <TableContainer />
            </CardHeader>
          </Card>
        </div>
        <Personal />
      </div>
    </div>
  );
};

export default page;
