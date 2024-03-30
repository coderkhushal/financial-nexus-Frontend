"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"
const SERVER = "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/"

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

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required"
    }),
    prices: z.number().min(1,{
        message: "Price is required"
    }),
    amount: z.number().min(1,{
        message: "Amount is required"
    }),
    from_account_id: z.string(),

    from_credit_card_id: z.string(),
    from_loan: z.object({
        name: z.string(),
        bank_name: z.string().min(1, {
            message: "Bank name is required"
        }),
        amount: z.number().min(1, {
            message: "Amount is required"
        }),
        to_account_id: z.string(),
        remarks: z.string(),
    }) ,
    from_emi: z.object({
        amount: z.number().min(1,{
            message: "Amount is required"
        }),
        name: z.string().min(1,{
            message: "Name is required"
        }),
        bank_name: z.string().min(1, {
            message: "Bank name is required"
        }),
        monthly: z.number().min(1,{
            message: "Monthly is required"
        }),
        total_time: z.number().min(1,{
            message: "Total time is required"
        }),
        remarks: z.string(),
        to_account_id: z.string(),
    }),
    
    remarks:z.string(),
})
const PurchaseCreationForm = () => {
    const { User } = userfirebase()
    const [error, seterror] = useState<string | undefined>(undefined)
    const [success, setsuccess] = useState<string | undefined>(undefined)
    const [Pending, setPending] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            prices: 0,
            amount: 0,
            from_account_id: "",
            from_credit_card_id: "",
            from_loan: {
                name: "",
                bank_name: "",
                amount: 0,
                to_account_id: "",
                remarks: "",

            },
            from_emi: {
                amount: 0,
                name: "",
                bank_name: "",
                monthly: 0,
                total_time: 0,
                remarks: "",
                to_account_id: "",
            },
            remarks: "",
        },
    })

    // 2. Define a submit handler.
    async function banksubmit(values: z.infer<typeof formSchema>) {
        seterror("")
        setsuccess("")
        setPending(true)

        console.log(User)
        const idtoken = await User?._tokenResponse.idToken
        if (idtoken) {

            const response = await fetch(`${SERVER}/data-add/add-expense`, {
                method: "POST",
                headers: getHeaders(idtoken),
                body: JSON.stringify({
                    name: values.name,
                    prices: values.prices,
                    amount: values.amount,
                    from_account_id: values.from_account_id,
                    from_credit_card_id: values.from_credit_card_id,
                    from_loan: values.from_loan,
                    from_emi: values.from_emi,
                    remarks: values.remarks,

                })
            })
            if (response.status == 200) {
                setsuccess("Added Successfully")
                setPending(false)

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
                <form onSubmit={form.handleSubmit(banksubmit)} className="space-y-8">
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
                        name="prices"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="State bank Of India" {...field} />
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
                                <FormLabel>Card Limit</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="100" type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="remarks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Remarks</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="card for business transactions" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_account_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>From account</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="card for business transactions" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="from_credit_card_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>From Credit Card</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} placeholder="card for business transactions" {...field} />
                                </FormControl>

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