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

import TableContainer from "@/app/main/profile/components/TableContainer";

import { userfirebase } from "@/context/firebase";
import { fetchdata } from "./Fetch/apis";
import EmiLoanTable from "./components/EmiLoanTable";
import AssetFdTable from "./components/AssetFdTable";
import { useRouter } from "next/navigation";
const SERVER =
  "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/";

const Page = () => {
  const { auth } = userfirebase();
  const [Banks, setBanks] = useState(null);
  const [Cards, setCards] = useState(null);
  const [Emis, setEmis] = useState(null);
  const [Loans, setLoans] = useState(null);
  const [Fds, setFds] = useState(null);
  const [Assets, setAssets] = useState(null);
const router= useRouter()
  const fetchall = async () => {
    
    if (auth.currentUser) {
      const dataBanks = await fetchdata("/data-get/get-banks/");
      setBanks(dataBanks);
      const dataCards = await fetchdata("/data-get/get-cards/");
      setCards(dataCards);
      const dataEmis = await fetchdata("/data-get/get-emis/");
      setEmis(dataEmis);
      const dataLoans = await fetchdata("/data-get/get-loans/");
      setLoans(dataLoans);
      const dataFds = await fetchdata("/data-get/get-fds/");
      setFds(dataFds);
      const dataAssets = await fetchdata("/data-get/get-assets/");
      setAssets(dataAssets);
    }
  };


  useEffect(() => {
    
    if(auth.currentUser?.getIdToken()){
      fetchall()
    }
}, [router, auth])

  return (
    <div className="">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Purchases/Investments</CardTitle>
              <AssetFdTable data={{ Assets, Fds }} />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loans/EMI</CardTitle>
              <EmiLoanTable data={{ Emis, Loans }} />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card/Bank</CardTitle>
              <TableContainer data={{ Cards, Banks }} />
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
