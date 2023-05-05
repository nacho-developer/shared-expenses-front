export interface ExpenseRequest {
    payerId: number
    deodorsIds: number[]
    description: string
    amount: number
    date: Date
}

export interface ExpenseResponse {
    id: number
    payer: string
    deodors: string[]
    amount: number
    description: string
    date: Date
}

export interface DeodorExpenseRequest {
    expenseId: number
    deodorsIds: number[]
}

export interface CancelExpenseRequest {
    expenseId: number
}
