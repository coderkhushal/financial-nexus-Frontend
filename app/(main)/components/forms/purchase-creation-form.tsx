"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"
const SERVER = "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { getHeaders } from "@/helpers/getHeaders"
import { userfirebase } from "@/context/firebase"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useDashboard } from "@/context/dashboard"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaMoneyBill } from "react-icons/fa"
import axios from "axios"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    price: z.string().min(1, {
        message: "Price is required"
    }),
    amount: z.string().min(1, {
        message: "Amount is required"
    }),
    from_account_id: z.string(),

    from_credit_card_id: z.string(),
    from_loan: z.object({
        name: z.string(),
        bank_name: z.string(),
        amount: z.string().min(1, {
            message: "Amount is required"
        }),
        to_account_id: z.string(),
        remarks: z.string(),
    }),
    from_emi: z.object({
        amount: z.string(),
        name: z.string(),
        bank_name: z.string(),
        monthly: z.string(),
        total_time: z.string(),
        remarks: z.string(),
        to_account_id: z.string(),
    }),

    remarks: z.string(),
})
const PurchaseCreationForm = () => {
    const { auth } = userfirebase()
    const [paymentmode, setpaymentmode] = useState<"ACCOUNT" | "CARD" | "LOAN" | "EMI">("ACCOUNT")

    const { bankdetails, carddetails, refresh } = useDashboard()
    const [error, seterror] = useState<string | undefined>(undefined)
    const [success, setsuccess] = useState<string | undefined>(undefined)
    const [Pending, setPending] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: "0",
            amount: "0",
            remarks: "",
            "from_account_id": "",
            "from_credit_card_id": "",
            "from_loan": {
                "name": "",
                "bank_name": "",
                "amount": "0",
                "to_account_id": "",
                "remarks": "",

            },
            "from_emi": {
                "amount": "0",
                "name": "",
                "bank_name": "",
                "monthly": "0",
                "total_time": "0",
                "remarks": "",
                "to_account_id": "",
            }
        }
    })

    // 2. Define a submit handler.
    async function purchasesubmit(values: z.infer<typeof formSchema>) {

        seterror("")
        setsuccess("")
        setPending(true)


        const idtoken = await auth.currentUser?.getIdToken()
        if (idtoken) {
            const data : any=  {
                "name": values.name,
                "price": parseInt(values.price),
                "amount": parseInt(values.amount),

            
        
                
                "remarks": values.remarks,
            }
            switch (paymentmode) {
                case "ACCOUNT":
                    data["from_account_id"] = values.from_account_id
                    break;
                case "CARD":
                    data["from_credit_card_id"] = values.from_credit_card_id
                    break;
                case "LOAN":
                    data["from_loan"] =  {
                        "name": values.from_loan.name,
                        "bank_name": values.from_loan.bank_name,
                        "amount": parseInt(values.from_loan.amount),
                        "to_account_id": values.from_loan.to_account_id,
                        "remarks": values.from_loan.remarks,
                    }
                    break;
                case "EMI":
                    data["from_emi"] =  {
                        "amount": parseInt(values.from_emi.amount),
                        "name": values.from_emi.name,
                        "bank_name": values.from_emi.bank_name,
                        "monthly": parseInt(values.from_emi.monthly),
                        "total_time": parseInt(values.from_emi.total_time),
                        "remarks": values.from_emi.remarks,
                        "to_account_id": values.from_emi.to_account_id,
                    }
                    break;
            }
            let response = await axios.post(SERVER + "/data-add/add-assets/",data, {
                headers:
                {
                    "Authorization": "Bearer " + idtoken,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status == 200) {
                setsuccess("Added Successfully")
                setPending(false)
                refresh({variant:"PURCHASE"})
            }
            else {
                seterror("Internal Server Error")
                setPending(false)
            }

        }


    }
    return (
        <ScrollArea className="h-60 relative overflow-y-scroll">


            <Form {...form}>
                <form onSubmit={form.handleSubmit(purchasesubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="Ram's Credit card" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField

                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="State bank Of India" type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="100" type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />,                
                    <FormField control={form.control}
                        name="remarks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Remarks</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="100" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <RadioGroup defaultValue="account" className="grid grid-cols-4 gap-4">
                        <div>
                            <RadioGroupItem value="account" id="account" className="peer sr-only" />
                            <Label
                                htmlFor="account"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                onClick={() => setpaymentmode("ACCOUNT")}
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
                                Account
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="cardpayment"
                                id="cardpayment"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="cardpayment"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                onClick={() => setpaymentmode("CARD")}
                            >
                                <FaMoneyBill className="mb-3 h-6 w-6" />
                                Card
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="loanpayment"
                                id="loanpayment"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="loanpayment"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                onClick={() => setpaymentmode("LOAN")}
                            >
                                <FaMoneyBill className="mb-3 h-6 w-6" />
                                Loan
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="emipayment"
                                id="emipayment"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="emipayment"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                onClick={() => setpaymentmode("EMI")}
                            >
                                <FaMoneyBill className="mb-3 h-6 w-6" />
                                Emi
                            </Label>
                        </div>

                    </RadioGroup>

                    <FormField

                        control={form.control}
                        name="from_account_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <Select onValueChange={field.onChange} disabled={paymentmode != "ACCOUNT"} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Your account" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent className="text-black">
                                        {bankdetails && bankdetails.length > 0 && bankdetails.map((item, index) => (
                                            <SelectItem key={index} value={item.id} >{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField

                        control={form.control}
                        name="from_credit_card_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Credt Card</FormLabel>
                                <Select onValueChange={field.onChange} disabled={paymentmode != "CARD"} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Your account" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent className="text-black">
                                        {carddetails && carddetails.length > 0 && carddetails.map((item, index) => (
                                            <SelectItem key={index} value={item.id} >{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Loan  */}
                    <div className="h-2"></div>
                    <Label className="text-xl font-semibold">Loan</Label>
                    <FormField
                        control={form.control}
                        name="from_loan.amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "LOAN"} placeholder="100" type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_loan.bank_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode!="LOAN"} placeholder="100" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_loan.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Name</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "LOAN"} placeholder="100" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_loan.remarks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Remarks</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "LOAN"} placeholder="100"  {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_loan.to_account_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <Select onValueChange={field.onChange} disabled={paymentmode != "LOAN"} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Your account" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent className="text-black">
                                        {bankdetails && bankdetails.length > 0 && bankdetails.map((item, index) => (
                                            <SelectItem key={index} value={item.id} >{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    {/* EMi  */}

                    <div className="h-2"></div>
                    <Label className="text-xl font-semibold">Emi</Label>
                    <FormField
                        control={form.control}
                        name="from_emi.amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "EMI"} placeholder="100" type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_emi.bank_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode!="EMI"} placeholder="100" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_emi.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Name</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "EMI"} placeholder="100" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_emi.remarks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Remarks</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "EMI"} placeholder="100"  {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_emi.total_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Total Time</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "EMI"} placeholder="100"  {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_emi.monthly"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Monthly</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending || paymentmode != "EMI"} placeholder="100"  {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_emi.to_account_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <Select onValueChange={field.onChange} disabled={paymentmode != "EMI"} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Your account" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent className="text-black">
                                        {bankdetails && bankdetails.length > 0 && bankdetails.map((item, index) => (
                                            <SelectItem key={index} value={item.id} >{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </ScrollArea>
    )
}

export default PurchaseCreationForm