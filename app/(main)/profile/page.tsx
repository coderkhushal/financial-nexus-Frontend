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
                      <Badge variant="outline">Edit</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="delete">Delete</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loans/EMI</CardTitle>
              <Table>
                <TableCaption>A list of your recent Emi/Loans.</TableCaption>
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
                      <Badge variant="outline">Edit</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="delete">Delete</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card/Bank</CardTitle>
              <Table>
                <TableCaption>A list of your Cards.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Details</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">House</TableCell>
                    <TableCell>
                      <Badge variant="outline">Edit</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="delete">Delete</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Disabled</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardHeader>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Secure and Private</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                defaultValue="Navtesh"
                disabled
              />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                defaultValue="navtesh@gmail.com"
                disabled
              />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
