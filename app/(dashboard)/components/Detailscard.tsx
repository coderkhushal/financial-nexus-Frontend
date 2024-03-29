import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from "@/components/ui/scroll-area"
import React from 'react'
interface DetailsCardProps{
    heading : string
}
const Detailscard = ({heading}: DetailsCardProps) => {
  return (
    <Card className='shadow-lg bg-gray-50'>
        <CardHeader>
            <CardTitle className='w-full text-center'>
                Bank/Card Details
            </CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className='h-80'>
              
            </ScrollArea>
        
        </CardContent>
    </Card>

  )
}

export default Detailscard