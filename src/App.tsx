import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { ExpenseResponse } from './pojo/Expense'
import { getExpenses } from './services/ExpenseService'
import { getBalance, getBalanceAccurate } from './services/BalanceService'
import { BalanceResponse, Transaction } from './pojo/Balance'
import { ExpenseCard } from './cards/ExpenseCard'
import { FormAddPerson } from './forms/FormAddPerson'
import { FormAddExpense } from './forms/FormAddExpense'

function parseDate(dateArray: number[]): Date {
  const [year, month, day, hours, minutes, seconds] = dateArray;
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

function App() {
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([])
  const [balance, setBalance] = useState<BalanceResponse[]>([])
  const [balanceAccurate, setBalanceAccurate] = useState<Transaction[]>([])

  const fetchBalance = useCallback(async () => {
    try {
      const fetchedBalance = await getBalance()
      setBalance(fetchedBalance)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }, []);

  useEffect(() => {
    fetchBalance()
  }, [])

  const handlerClickExpenses = async () => {
    try {
      const fetchedExpenses = await getExpenses()
      setExpenses(fetchedExpenses.map((expense: any) => ({
        id: expense.id,
        payer: expense.payer,
        deodors: expense.deodors,
        amount: expense.amount,
        description: expense.description,
        date: parseDate(expense.date),
      })))
    } catch (error) {
      console.error('Error fetching expense:', error)
    }
  }

  const handlerClickBalanceAccurate = async () => {
    try {
      const fetchedBalanceAccurate = await getBalanceAccurate()
      setBalanceAccurate(fetchedBalanceAccurate)
    } catch (error) {
      console.error('Error fetching balance accurate:', error)
    }
  }

  return (
    <>
      <h1 className='mb-2 mt-0 text-5xl font-medium leading-tight text-center'>Shared Expenses</h1>

      <div className="flex justify-center space-x-2 mb-5">
        <FormAddPerson />
        <FormAddExpense />
      </div>

      <div className="flex flex-wrap justify-center mb-5">
        <div className="flex justify-center space-x-2 mb-5">
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
            onClick={handlerClickExpenses}>Ver Deudas</button>
        </div>
        <div className="flex flex-wrap justify-center space-x-2">
          {expenses.map(expense => {
            return (
              <div key={expense.id} className="inline-block">
                <ExpenseCard expense={expense} />
              </div>
            )
          })}
        </div>
      </div>


      <div className="rounded-lg shadow-md p-4 w-80 mx-auto">
        <h2 className="text-xl font-bold mb-4">Balance</h2>
        <ul>
          {Object.keys(balance).map((name: string) => {
            const value = balance[name]
            return (
              <li className="flex justify-between mb-2" key={name}>
                <span>{name}</span>
                <span className={`${value > 0 ? 'text-green-500' : 'text-red-500'}`}>{value}€</span>
              </li>
            )
          })}
        </ul>
      </div>


      <div className="flex justify-center flex-wrap mb-5">
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handlerClickBalanceAccurate}>Ver Balance Mejorado</button>
        {balanceAccurate.map((accurate, index) => {
          return (
            <div key={index} className="inline-block bg-white shadow-md rounded-md p-4 mx-2 my-2">
              <p className="font-bold">{accurate.from} -&gt; {accurate.to}</p>
              <p>{accurate.amount}€</p>
            </div>
          )
        })}
      </div>


    </>
  )
}

export default App
