"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Label } from "@/components/ui/label"
import { useState } from "react"
import PurchaseCreationForm from "../forms/purchase-creation-form"
import InvestmentCreationForm from "../forms/investment-creation-form"
import { FaMoneyBill } from "react-icons/fa"

const PurchaseStocksModal = ({ children }: { children: React.ReactNode }) => {
    const [variant, setvariant] = useState<"INVESTMENT" | "PURCHASE">("PURCHASE")
    return (
        <Dialog>
        <DialogTrigger asChild>
            <div>

            {children}
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add Purchase/stocks Details</DialogTitle>

            </DialogHeader>
            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        onClick={() => setvariant("PURCHASE")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="mb-3 h-6 w-6"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                        Purchase
                    </Label>
                </div>
                <div>
                    <RadioGroupItem
                        value="paypal"
                        id="paypal"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="paypal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        onClick={() => setvariant("INVESTMENT")}
                    >
                        <FaMoneyBill className="mb-3 h-6 w-6" />
                        Stocks
                    </Label>
                </div>

            </RadioGroup>
            {variant === "PURCHASE" ?
            <PurchaseCreationForm/> :

            <InvestmentCreationForm/>
        }



        </DialogContent>
    </Dialog>
    )
}
export default PurchaseStocksModal