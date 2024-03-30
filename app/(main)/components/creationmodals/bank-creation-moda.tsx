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
import { ScrollArea } from "@radix-ui/react-scroll-area"

const BankCreationModal = ({ children }: { children: React.ReactNode }) => {
    const [variant, setvariant] = useState<"BANK" | "CARD">("BANK")
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Bank/Card Details</DialogTitle>

                </DialogHeader>
                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            onClick={()=>setvariant("CARD")}
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
                            Card
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
                            onClick={()=>setvariant("BANK")}
                        >
                            <AiOutlineBank className="mb-3 h-6 w-6" />
                            Bank
                        </Label>
                    </div>

                </RadioGroup>
         

                <BankCreationForm variant={variant} />
                
          
            </DialogContent>
        </Dialog>
    )
}
export default BankCreationModal