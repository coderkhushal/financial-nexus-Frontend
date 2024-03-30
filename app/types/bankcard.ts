export interface BankDetails{
    name: string
    bankname: string
    amount : number
    disable : boolean
    remarks : string
}
export interface CardDetails{
    limit: number
    remarks: string
    bankname : string
    validity  : string
    disable: boolean
}