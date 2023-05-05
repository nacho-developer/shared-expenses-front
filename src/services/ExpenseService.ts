import { CancelExpenseRequest, DeodorExpenseRequest, ExpenseRequest, ExpenseResponse } from "../pojo/Expense"

const URL_EXPENSES = 'https://shared-expense-back.netlify.app/api/v1/expenses'

async function getExpenses(): Promise<ExpenseResponse[]> {
    const response = await fetch(URL_EXPENSES, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Acess-Control-Allow-Origin': "*"
        }
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}

async function addExpense(expense: ExpenseRequest): Promise<void> {
    const response = await fetch(URL_EXPENSES, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Acess-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(expense)
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
}

async function addDeodorExpense(deodorExpense: DeodorExpenseRequest): Promise<void> {
    const response = await fetch(URL_EXPENSES, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Acess-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(deodorExpense)
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
}

async function cancelExpense(cancelExpense: CancelExpenseRequest): Promise<void> {
    const response = await fetch(URL_EXPENSES, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Acess-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(cancelExpense)
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
}

export { getExpenses, addExpense, addDeodorExpense, cancelExpense }