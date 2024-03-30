"use client"
import React, { useState } from 'react'

import CreationCard from '../components/creationcard'
import Detailscard from '../components/Detailscard'
import BanksDetailsComponent from '../components/details-components/bankCard/bank-details-component'
import CardDetailsComponent from '../components/details-components/bankCard/card-details-component'
import LoanDetailsComponent from '../components/details-components/loan/loan-details-component'
import PurchaseDetailsComponent from '../components/details-components/purchaseInvestment/purchase-details-component'
import InvestmentDetailsComponent from '../components/details-components/purchaseInvestment/investment-details-component'
import { bankdetailsarr, carddetailsarr, loandetailsarr, purchasedetailsarr, investmentdetailsarr } from '@/data/sampledata'
import BankCreationModal from '../components/creationmodals/bank-creation-moda'

const DashBoardPage = () => {
    return (
        <div className='w-full gap-10 h-full flex flex-col'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full'>

                <BankCreationModal>

                    <CreationCard heading='Add Bank/Card' details='you have currently 3 bank accounts' />
                </BankCreationModal>

                <CreationCard heading='Add Investment/Purchases' details='you have currently 3 bank accounts' />
                <CreationCard heading='Add Loan/Emi' details='you have currently 3 bank accounts' />
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full'>
                <Detailscard heading="Bank/Card Details">
                    <BanksDetailsComponent heading='Bank Details' bankdetailsarr={bankdetailsarr} />
                    <CardDetailsComponent heading='Card Details' carddetailsarr={carddetailsarr} />
                </Detailscard>
                <Detailscard heading="Loan/Emi Details">
                    <LoanDetailsComponent heading='Loans' loandetailsarr={loandetailsarr} />
                    <LoanDetailsComponent heading='Emi' loandetailsarr={loandetailsarr} />
                </Detailscard>
                <Detailscard heading="Purchases/Investments">

                    <PurchaseDetailsComponent heading='Purchases' purchasedetailsarr={purchasedetailsarr} />
                    <InvestmentDetailsComponent heading='Investments' investmentdetailsarr={investmentdetailsarr} />
                </Detailscard>

            </div>


        </div>
    )
}

export default DashBoardPage