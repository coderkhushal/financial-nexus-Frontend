
import { Investment} from '@/app/types/purchase-investment'

import React from 'react'
interface PurchaseDetailsComponentProps {
  heading: string
  investmentdetailsarr: Investment[] | null
}
const InvestmentDetailsComponent= ({ heading, investmentdetailsarr }: PurchaseDetailsComponentProps) => {
  return (
    <div className='flex flex-col gap-2 my-2'>
      <h1 className='text-xl font-semibold mb-1'>{heading}</h1>
      {investmentdetailsarr && investmentdetailsarr.length>0 ?
        investmentdetailsarr.map((investment, index) => (
          <div
            key={index}
            className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className={`flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 `} />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {investment.symbol}
              </p>
              <p className="text-sm text-muted-foreground">
                Quantity : {investment.quantity_left}
              </p>

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

export default InvestmentDetailsComponent