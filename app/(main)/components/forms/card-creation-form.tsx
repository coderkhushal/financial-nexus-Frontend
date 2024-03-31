"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"
const SERVER= "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/"

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
import { Input  } from "@/components/ui/input"
import { useState } from "react"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { getHeaders } from "@/helpers/getHeaders"
import { userfirebase } from "@/context/firebase"
import { ScrollArea } from "@radix-ui/react-scroll-area"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "name cannot be empyt",
    }),
    card_name: z.string().min(1, {
        message: "Bank name is required.",
    }),
    card_limit: z.number(),
    remarks: z.string()
})
const CardCreationForm = ({ variant }: { variant: "BANK" | "CARD" }) => {
    const {User} = userfirebase()
    const {auth} = userfirebase()
    const [error, seterror] = useState<string | undefined>(undefined)
    const [success, setsuccess] = useState<string | undefined>(undefined)
    const [Pending, setPending] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            card_name: "",
            card_limit: 0,
            remarks: "",
        },
    })

    // 2. Define a submit handler.
    async function cardsubmit(values: z.infer<typeof formSchema>) {
        seterror("")
        setsuccess("")
        setPending(true)
 
        console.log("this is card function")
        const idtoken = await auth.currentUser?.getIdToken()
        
        if(idtoken ){
            const response = await fetch(`${SERVER}/data-add/add-card`, {
                method: "POST",
                headers:       {
                    "Authorization": "Bearer " + idtoken,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({   
                    "name":values.name,
                    "card_name": values.card_name,
                    "card_limit": parseFloat(values.card_limit.toString()),
                    "remarks": values.remarks

                })
            })
            if(response.status==200){
                setsuccess("Added Successfully")
                setPending(false)
                
            }
            else{
                seterror("Internal Server Error")
                setPending(false)
            }
            
        }

    }
    return (
        <ScrollArea className="h-60 relative overflow-y-scroll">


        <Form {...form}>
            <form onSubmit={form.handleSubmit(cardsubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled= {Pending} placeholder="Ram's Credit card" {...field} />
                            </FormControl>
               
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
          
                    control={form.control}
                    name="card_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Name</FormLabel>
                            <FormControl>
                                <Input disabled= {Pending} placeholder="State bank Of India" {...field} />
                            </FormControl>
                  
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="card_limit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Limit</FormLabel>
                            <FormControl>
                                <Input disabled= {Pending} placeholder="100" type="number" {...field} />
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
                                <Input disabled= {Pending} placeholder="card for business transactions" {...field} />
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

export default CardCreationForm