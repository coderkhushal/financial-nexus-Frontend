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
import axios from "axios"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDashboard } from "@/context/dashboard"

const formSchema = z.object({
    bank_name:z.string(), 
    name: z.string(),
    to_account_id: z.string(),
    monthly: z.string().min(1,{
        message:"Monthly is required"
    }),
    total_time: z.string().min(1,{
        message:"Total Time is required"
    }),
    remarks: z.string(),
    amount: z.string(),
})
const EmiCreationForm = () => {
    const { auth } = userfirebase()
    const { bankdetails , refresh} = useDashboard()
    const [error, seterror] = useState<string | undefined>(undefined)
    const [success, setsuccess] = useState<string | undefined>(undefined)
    const [Pending, setPending] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bank_name:"",
            name: "",
            total_time: "0",

            monthly: "0",
            to_account_id: "",
        },
    })

    // 2. Define a submit handler.
    async function emisubmit(values: z.infer<typeof formSchema>) {
        seterror("")
        setsuccess("")
        setPending(true)
        const idtoken = await auth.currentUser?.getIdToken()
        if (idtoken) {
            const data = {
                "name":values.name,
                "bank_name":values.bank_name,
                "monthly":parseInt(values.monthly),
                "total_time":parseInt(values.total_time),
                "to_account_id":values.to_account_id,
                "remarks": values.remarks,
                "amount": parseInt(values.amount),
            }
            console.log(data)
            let response = await axios.post(SERVER + "/data-add/add-emis/", data, {
                headers:
                {
                    "Authorization": "Bearer " + idtoken,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status == 200) {
                setsuccess("Added Successfully")
                setPending(false)
                refresh({variant:"EMI"})
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
                <form onSubmit={form.handleSubmit(emisubmit)} className="space-y-8">
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
                        name="bank_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending}  placeholder="State bank Of India" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField

                        control={form.control}
                        name="to_account_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <Select onValueChange={field.onChange} disabled={Pending} defaultValue={field.value}>
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
                        name="monthly"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monthly</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} type="number" placeholder="card for business transactions" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="total_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Time ( months)</FormLabel>
                                <FormControl>
                                    <Input disabled={Pending} type="number" placeholder="card for business transactions" {...field} />
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
                                    <Input disabled={Pending} type="number" placeholder="card for business transactions" {...field} />
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

export default EmiCreationForm