import React from 'react'

import CreationCard from '../components/creationcard'
import Detailscard from '../components/Detailscard'
const DashBoardPage = () => {
    return (
        <div className='w-full gap-10 flex flex-col'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <CreationCard heading='Add Bank/Card' details='you have currently 3 bank accounts' />
                <CreationCard heading='Add Investment/Purchases' details='you have currently 3 bank accounts' />
                <CreationCard heading='Add Loan/Emi' details='you have currently 3 bank accounts' />
                <CreationCard heading='Add Income' details='you have currently 3 bank accounts' />
            </div>

            <div >
                <Detailscard/>
            </div>


        </div>
    )
}

export default DashBoardPage