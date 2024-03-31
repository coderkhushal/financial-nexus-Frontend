"use client"
import React, { useEffect, useState } from 'react'
const SERVER = "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/"
import CreationCard from '../components/creationcard'
import Detailscard from '../components/Detailscard'
import BanksDetailsComponent from '../components/details-components/bankCard/bank-details-component'
import CardDetailsComponent from '../components/details-components/bankCard/card-details-component'
import LoanDetailsComponent from '../components/details-components/loan/loan-details-component'
import PurchaseDetailsComponent from '../components/details-components/purchaseInvestment/purchase-details-component'
import InvestmentDetailsComponent from '../components/details-components/purchaseInvestment/investment-details-component'
import { carddetailsarr, loandetailsarr, purchasedetailsarr, investmentdetailsarr } from '@/data/sampledata'
import BankCreationModal from '../components/creationmodals/bank-creation-moda'
import PurchaseStocksModal from '../components/creationmodals/purchases-stocks-modal'

import { userfirebase } from '@/context/firebase'
import { useRouter } from 'next/navigation'
import DashBoardState, { useDashboard } from '@/context/dashboard'
import LoanEmiCreationModal from '../components/creationmodals/loan-emi-creation-modal'
type fetchdetailstype = { url: string, variant: "BANK" | "LOAN" | "CARD" | "EMI" | "PURCHASE" | "INVESTMENT" }
const DashBoardPage = () => {
    const { auth } = userfirebase()
    const router = useRouter()
    useEffect(() => {
        if (!auth.currentUser) {
            router.push("/auth/login")
        }
    }, [router, auth])
    const {bankdetails, carddetails, loandetails, emidetails, purchasedetails , investmentdetails, fetchdetails} = useDashboard()
    useEffect(()=>{
        fetchdetails({ url: "get-banks", variant: "BANK" }),
        fetchdetails({ url: "get-cards", variant: "CARD" }),
        fetchdetails({ url: "get-loans", variant: "LOAN" }),
        fetchdetails({ url: "get-emis", variant: "EMI" }),
        fetchdetails({ url: "get-stocks", variant: "INVESTMENT" })
        fetchdetails({ url: "get-assets", variant: "PURCHASE" })
    }, [auth.currentUser])
    console.log(bankdetails)
    return (

        <div className='w-full gap-10 h-full flex flex-col'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full'>

                <BankCreationModal>

                    <CreationCard heading='Add Bank/Card' details='you have currently 3 bank accounts'  />
                </BankCreationModal>
                <PurchaseStocksModal>

                    <CreationCard heading='Add Investment/Purchases' details='you have currently 3 bank accounts' />
                </PurchaseStocksModal>
                <LoanEmiCreationModal>

                <CreationCard heading='Add Loan/Emi' details='you have currently 3 bank accounts' />
                </LoanEmiCreationModal>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full'>
                <Detailscard heading="Bank/Card Details">
                    <BanksDetailsComponent heading='Bank Details' bankdetailsarr={bankdetails} />
                    <CardDetailsComponent heading='Card Details' carddetailsarr={carddetails} />
                </Detailscard>

                <Detailscard heading="Purchases/Investments">

                    <PurchaseDetailsComponent heading='Purchases' purchasedetailsarr={purchasedetails} />
                    <InvestmentDetailsComponent heading='Investments' investmentdetailsarr={investmentdetails} />
                </Detailscard>
                <Detailscard heading="Loan/Emi Details">
                    <LoanDetailsComponent heading='Loans' loandetailsarr={loandetails} />
                    <LoanDetailsComponent heading='Emi' loandetailsarr={emidetails} />
                </Detailscard>

            </div>


        </div>
  
    )
}

export default DashBoardPage