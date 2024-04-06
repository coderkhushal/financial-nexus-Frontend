
"use client"
import React, { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { userfirebase } from "./firebase";
import { BankDetails, CardDetails } from "@/app/types/bankcard";
import { Loan } from "@/app/types/loan";
import { Investment, Purchase } from "@/app/types/purchase-investment";
import { useRouter } from "next/navigation";
const SERVER = process.env.NEXT_PUBLIC_SERVER
type fetchdetailstype = { url: string, variant: "BANK" | "LOAN" | "CARD" | "EMI" | "PURCHASE" | "INVESTMENT" }

interface dashboardcontexttype {
    fetchdetails: ({ url, variant }: fetchdetailstype) => Promise<void>,
    bankdetails: BankDetails[] | null,
    carddetails: CardDetails[] | null,
    loandetails: Loan[] | null,
    emidetails: Loan[] | null,
    purchasedetails: Purchase[] | null,
    investmentdetails: Investment[] | null,
    refresh: ({ variant }: { variant: "BANK" | "LOAN" | "CARD" | "EMI" | "PURCHASE" | "INVESTMENT" }) => void,
}


const DashboardContext = createContext<dashboardcontexttype>({

    fetchdetails: ({ url, variant }: fetchdetailstype) => Promise.resolve(),
    bankdetails: [],
    carddetails: [],
    loandetails: [],
    emidetails: [],
    purchasedetails: [],
    investmentdetails: [],
    refresh: ({ variant }: { variant: "BANK" | "LOAN" | "CARD" | "EMI" | "PURCHASE" | "INVESTMENT" }) => { },

})

const DashBoardState = ({ children }: { children: React.ReactNode }) => {
    const router= useRouter()
    const { auth } = userfirebase()
    const [bankdetails, setbankdetails] = useState([])
    const [carddetails, setcarddetails] = useState([])
    const [loandetails, setloandetails] = useState([])
    const [emidetails, setemidetails] = useState([])
    const [purchasedetails, setpurchasedetails] = useState([])
    const [investmentdetails, setinvestmentdetails] = useState([])
    const fetchdetails = async ({ url, variant }: fetchdetailstype) => {
        try {
        const idtoken = await auth.currentUser?.getIdToken()

            const res = await fetch(`${SERVER}/data-get/${url}/`, {
                headers: {
                    "Authorization": "Bearer " + idtoken,
                    'Content-Type': 'application/json'
                },

            })
            const data = await res.json()

            switch (variant) {
                case "BANK":
                    setbankdetails((value) => data)
                    break;
                case "LOAN":
                    setloandetails(data)
                    break;
                case "CARD":
                    setcarddetails(data)
                    break;
                case "PURCHASE":
                    setpurchasedetails(data)
                    break;
                case "INVESTMENT":
                    setinvestmentdetails(data)
                    break;
                case "EMI":
                    setemidetails(data)
                    break;
            }
        }
        catch(err){
            console.log("error")
            router.push("/auth/login")
        }
                    
                    

    }
    const refresh = ({ variant }: { variant: "BANK" | "LOAN" | "CARD" | "EMI" | "PURCHASE" | "INVESTMENT" }) => {
        switch (variant) {
            case "BANK":
                fetchdetails({ url: "get-banks", variant: "BANK" });
                break;
            case "LOAN":
                fetchdetails({ url: "get-loans", variant: "LOAN" });
                break;
            case "CARD":
                fetchdetails({ url: "get-cards", variant: "CARD" });
                break;
            case "PURCHASE":
                fetchdetails({ url: "get-stocks", variant: "INVESTMENT" });
                break;
            case "EMI":
                fetchdetails({ url: "get-emis", variant: "EMI" });
                break;
            case "INVESTMENT":
                fetchdetails({ url: "get-stocks", variant: "INVESTMENT" });
                break;

        }
    }







    return (
        <DashboardContext.Provider value={{ bankdetails, fetchdetails, refresh, carddetails, loandetails, emidetails, purchasedetails, investmentdetails }}>
            {children}
        </DashboardContext.Provider>
    )
}
export default DashBoardState


export const useDashboard = () => useContext(DashboardContext)