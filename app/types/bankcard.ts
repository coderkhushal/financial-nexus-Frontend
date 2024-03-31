export interface BankDetails{
    name: string
    bank_name: string
    balance: number
    disabled : boolean
    remarks : string
}
export interface CardDetails{
    limit: number
    remarks: string
    bankname : string
    validity  : string
    disable: boolean
}