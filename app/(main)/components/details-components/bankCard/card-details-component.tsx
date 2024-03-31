import { CardDetails } from '@/app/types/bankcard'
import React from 'react'
interface BankCardDetailsProps {
  heading: string
  carddetailsarr: CardDetails[] | null
}
const CardDetailsComponent = ({ heading, carddetailsarr }: BankCardDetailsProps) => {
  return (
    <div className='flex flex-col gap-2 mt-2'>
      <h1 className='text-xl font-semibold mb-1'>{heading}</h1>
      {carddetailsarr && carddetailsarr.length>0 ?
        carddetailsarr.map((card, index) => (
          <div
            key={index}
            className="relative grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className={`flex h-2 w-2 translate-y-1 rounded-full bg-${card.disabled ? "red" : "sky"}-500 `} />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {card.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Card Name: {card.card_name}
              </p>
              <p className="text-sm text-muted-foreground">
                LIMIT: {card.card_limit}
              </p>
              {/* <div className='text-sm text-muted-foreground' >valid till: {card.validity}</div> */}
            </div>
          </div>
        )) :
        <div>
          No Cards to show
        </div>
      }
    </div>
  )
}

export default CardDetailsComponent