"use client"
import { userfirebase } from '@/context/firebase'
import axios from 'axios'
import { headers } from 'next/headers'
import React, { useEffect, useState } from 'react'
const SERVER = "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
interface transactiontype {
    from_id: string
    to_id: string
    transaction_type: string
    remarks: string
    amount: string
    created_at: string
    from_type: string
}
const TransactionPage = () => {
    const { auth } = userfirebase()
    const [transactions, settransactions] = useState<transactiontype[] | null>()
    const [total, settotal] = useState<number | null>()
    const fetchtransactions = async () => {
        const idtoken = await auth.currentUser?.getIdToken()



        let response = await axios.get(SERVER + "/data-get/get-transactions/", {
            headers:
            {
                "Authorization": "Bearer " + idtoken,
                'Content-Type': 'application/json'
            }
        });
        
        settransactions(response.data)
        let sum = response.data.reduce((accumulator: number, current: transactiontype) => {
            return accumulator + current.amount
        }, 0)
        console.log(sum)
        settotal(sum)

    }
    useEffect(() => {
        fetchtransactions()
    }, [])
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <h1 className=' font-semiboldmb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Transactions</h1>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='mb-4 text-center text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white' >Amount</TableHead>
                        <TableHead className='mb-4 text-center text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white'>Transaction From</TableHead>
                        <TableHead className='mb-4 text-center text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white'>Transaction For</TableHead>
                        <TableHead className='mb-4 text-center text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl dark:text-white'>Remarks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions && transactions.map((transaction: transactiontype, index: number) => (
                        <TableRow key={index}>
                            <TableCell className='font-medium text-center'>{transaction.transaction_type}</TableCell>
                            <TableCell className='font-medium text-center'>{transaction.from_type}</TableCell>
                            <TableCell className='font-medium text-center'>{transaction.amount}</TableCell>
                            <TableCell className='font-medium text-center'>{transaction.remarks}</TableCell>
                        </TableRow>
                    )

                    )}

                </TableBody>
                {total ? <TableFooter>
                    <TableRow>
                        <TableCell className='text-center font-extrabold  text-2xl'>Total</TableCell>
                        <TableCell ></TableCell>
                        <TableCell >{total}</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableFooter> : <TableFooter></TableFooter>}
            </Table>
        </div>
    )
}

export default TransactionPage