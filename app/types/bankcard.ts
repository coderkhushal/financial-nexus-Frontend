export interface BankDetails{
    id: string
    name: string
    bank_name: string
    balance: number
    disabled : boolean
    remarks : string
}
export interface CardDetails{
    id: string
    card_limit: number
    remarks: string
    card_name: string   
    validity  : string
    name: string
    disabled: boolean
}