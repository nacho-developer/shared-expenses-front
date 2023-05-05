import { FormEvent, useCallback, useState } from "react"
import { CancelExpenseRequest, DeodorExpenseRequest, ExpenseResponse } from "../pojo/Expense"
import { addDeodorExpense, cancelExpense } from "../services/ExpenseService"
import { PersonResponse } from "../pojo/Person"
import { getPersons } from "../services/PersonService"

function getTimeElapsed(date: Date): string {
    const differenceMs = new Date().getTime() - date.getTime()
    const seconds = Math.floor(differenceMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    return `${days} días ${hours % 24} horas ${minutes % 60} minutos ${seconds % 60} segundos`
}

export function ExpenseCard(expense: { expense: ExpenseResponse }) {

    const [isVisible, setIsVisible] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        fetchPersons()
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const [persons, setPersons] = useState<PersonResponse[]>([])

    const fetchPersons = useCallback(async () => {
        try {
            const fetchedPersons = await getPersons()
            setPersons(fetchedPersons)
        } catch (error) {
            console.error('Error fetching persons:', error)
        }
    }, []);

    const handlerSubmitAddDeodor = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        const deodorsIds = formData.getAll('deodorsIds')

        const deodorExpense: DeodorExpenseRequest = {
            expenseId: expense.expense.id,
            deodorsIds
        }
        addDeodorExpense(deodorExpense)
        form.reset()
    }

    const handlerClickCancelDebt = () => {
        const expenseRequest: CancelExpenseRequest = {
            expenseId: expense.expense.id
        }
        cancelExpense(expenseRequest)
        setIsVisible(false)
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className="mb-5 flex-auto block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                <p>ID: {expense.expense.id}</p>
                <p>Descripcion: {expense.expense.description}</p>
            </div>
            <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Pagador: {expense.expense.payer}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Deudores: {expense.expense.deodors.join(", ")}
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Añadir Deudor
                    </button>
                    <button onClick={handlerClickCancelDebt} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Cancelar Deuda
                    </button>
                </div>
            </div>
            <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                <p>Deuda: {expense.expense.amount}€</p>
                <p>Hace {getTimeElapsed(expense.expense.date)}</p>
            </div>
            {isModalOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <h2 className="text-lg font-medium mb-4">Añadir Deudores</h2>
                            <form onSubmit={handlerSubmitAddDeodor}>
                                <label htmlFor="deudorsIds" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Elige los deudores
                                </label>
                                <select
                                    multiple
                                    id="deudorsIds"
                                    name="deudorsIds"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {persons
                                        .filter(person => person.name !== expense.expense.payer &&
                                            !expense.expense.deodors.includes(person.name))
                                        .map(person => {
                                            return (
                                                <option key={person.id} value={person.id}>
                                                    {person.name}
                                                </option>
                                            )
                                        })}
                                </select>
                            </form>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Añadir Deuda
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}