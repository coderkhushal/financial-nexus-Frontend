"use client";
import React, { useEffect, useState } from "react";
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

import { userfirebase } from "@/context/firebase";
import { getHeaders } from "@/helpers/getHeaders";
import { fetchBanks, fetchCards } from "./Fetch/apis";
const SERVER =
  "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/";

const page = () => {
  const { User } = userfirebase();
  const [Banks, setBanks] = useState(["1"]);
  const [Cards, setCards] = useState(["1"]);
  const firebase_user_id = User?._tokenResponse.idToken;

  useEffect(() => {
    const fetchall = async () => {
      const dataBanks = await fetchBanks(firebase_user_id);
      setBanks(dataBanks);
      const dataCards = await fetchCards(firebase_user_id);
      setCards(dataCards);
    };
    if (firebase_user_id) {
      fetchall();
      console.log(Cards);
    }
  }, [firebase_user_id]);
  console.log(Cards);
  console.log(Banks);

  return (
    <div className="">
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
              <TableContainer data={{ Cards, Banks }} />
            </CardHeader>
          </Card>
        </div>
        <Personal />
      </div>
    </div>
  );
};

export default page;
