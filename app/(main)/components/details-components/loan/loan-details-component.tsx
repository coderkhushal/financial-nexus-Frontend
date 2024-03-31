import { BankDetails } from '@/app/types/bankcard'
import { Loan } from '@/app/types/loan'
import React from 'react'
interface BankCardDetailsProps {
  heading: string
  loandetailsarr: Loan[] | null
}
const LoanDetailsComponent = ({ heading, loandetailsarr }: BankCardDetailsProps) => {
  return (
    <div className='flex flex-col gap-2 my-2'>
      <h1 className='text-xl font-semibold mb-1'>{heading}</h1>
      {loandetailsarr && loandetailsarr.length>0 ?
        loandetailsarr.map((loan, index) => (
          <div
            key={index}
            className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className={`flex h-2 w-2 translate-y-1 rounded-full bg-${"sky"}-500 `} />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {loan.bank_name}
              </p>
              {heading=="Emi" && <p className="text-sm text-muted-foreground">
                Monthly: {loan.monthly}
              </p>}
              
            </div>
          </div>
        ))  :
        <div>
          No {heading} to show
        </div>
    }
    </div>
  )
}

export default LoanDetailsComponent