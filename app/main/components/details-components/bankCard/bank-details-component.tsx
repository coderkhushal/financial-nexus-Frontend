import { BankDetails } from '@/app/types/bankcard'
import React from 'react'
interface BankCardDetailsProps {
  heading: string
  bankdetailsarr: BankDetails[] | null
}
const BanksDetailsComponent = ({ heading, bankdetailsarr }: BankCardDetailsProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-xl font-semibold mb-1'>{heading}</h1>
      {bankdetailsarr && bankdetailsarr.length>0 ?
        bankdetailsarr.map((bank, index) => (
          <div
            key={index}
            className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className={`flex h-2 w-2 translate-y-1 rounded-full bg-${bank.disabled ? "red" : "sky"}-500 `} />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {bank.bank_name}
              </p>
              <p className="text-sm text-muted-foreground">
                Name: {bank.name}
              </p>
              <p className="text-sm text-muted-foreground">
                AMOUNT: {bank.balance}
              </p>
            </div>
          </div>
        ))  :
        <div>
          No Accounts to show
        </div>
    }
    </div>
  )
}

export default BanksDetailsComponent