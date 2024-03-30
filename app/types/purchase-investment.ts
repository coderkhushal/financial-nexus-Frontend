export interface Investment{
    quantity: number
    code?: string
    name: string
    
    stockprice:number
    remarks: string    
}
export interface Purchase{
    name:string
    paymentoption: string
    amount: number
    remarks: string

    
}