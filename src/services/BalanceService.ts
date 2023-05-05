import { BalanceResponse, Transaction } from "../pojo/Balance"

const URL_BALANCE = 'http://localhost:8085/api/v1/balance'

async function getBalance(): Promise<BalanceResponse[]> {
    const response = await fetch(URL_BALANCE, {
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

async function getBalanceAccurate(): Promise<Transaction[]> {
    const response = await fetch(URL_BALANCE + '/accurate', {
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

export { getBalance, getBalanceAccurate }