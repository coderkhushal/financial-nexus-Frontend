import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
interface CreationCardProps {
    heading: string
    details?: string
}
const CreationCard = ({ heading, details }: CreationCardProps) => {
    return (
        <Card className='w-full'>
            <CardHeader >
                <CardTitle className="">
                    {heading}
                </CardTitle>

            </CardHeader>
            <CardContent>
                {details && <CardDescription>
                    {details}

                </CardDescription>
                }
            </CardContent>
        </Card>
    )
}

export default CreationCard