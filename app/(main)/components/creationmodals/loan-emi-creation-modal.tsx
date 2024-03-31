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
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Label } from "@/components/ui/label"
import { BanknoteIcon } from "lucide-react"
import { useState } from "react"
import { AiOutlineBank } from "react-icons/ai";
import BankCreationForm from "../forms/bank-creation-form"
import CardCreationForm from "../forms/card-creation-form"
import LoanCreationForm from "../forms/loan-creation-form"
import EmiCreationForm from "../forms/emi-creation-form"
import { FaMoneyBillWave, FaMoneyCheck } from "react-icons/fa"

const LoanEmiCreationModal = ({ children }: { children: React.ReactNode }) => {
    const [variant, setvariant] = useState<"LOAN" | "EMI">("LOAN")
    return (
        <Dialog>
        <DialogTrigger asChild>
            <div>

            {children}
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add Loan/Emi Details</DialogTitle>

            </DialogHeader>
            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        onClick={() => setvariant("LOAN")}
                    >
                    <FaMoneyCheck className="mb-3 h-6 w-6" />
 
                        Loan
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
                        onClick={() => setvariant("EMI")}
                    >
                        <FaMoneyBillWave className="mb-3 h-6 w-6" />
                        Emi
                    </Label>
                </div>

            </RadioGroup>
            {variant === "LOAN" ?
            <LoanCreationForm /> :

            <EmiCreationForm />
        }



        </DialogContent>
    </Dialog>
    )
}
export default LoanEmiCreationModal