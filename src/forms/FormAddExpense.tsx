import { FormEvent, useCallback, useEffect, useState } from "react"
import { ExpenseRequest } from "../pojo/Expense"
import { addExpense } from "../services/ExpenseService"
import { PersonResponse } from "../pojo/Person"
import { getPersons } from "../services/PersonService"

export function FormAddExpense() {

    const [persons, setPersons] = useState<PersonResponse[]>([])

    const fetchPersons = useCallback(async () => {
        try {
            const fetchedPersons = await getPersons()
            setPersons(fetchedPersons)
        } catch (error) {
            console.error('Error fetching persons:', error)
        }
    }, []);

    useEffect(() => {
        fetchPersons()
    }, [fetchPersons])

    const handleSubmitAddExpense = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const payerId = formData.get('payerId')
        const deodorsIds = formData.getAll('deodorsIds')
        const description = formData.get('description')
        const amount = formData.get('amount')
        const expense: ExpenseRequest = {
            payerId,
            deodorsIds,
            description,
            amount,
            date: new Date()
        };
        addExpense(expense)
        form.reset()
    }

    return (
        <div className="mt-5 mb-5 block max-w-sm rounded-lg bg-white p-6 shadow-[0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <form onSubmit={handleSubmitAddExpense}>
                <div className="relative mb-12" data-te-input-wrapper-init>
                    <label htmlFor="payerId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Pagador
                    </label>
                    <select id="payerId" name="payerId" required className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:border-gray-200 peer">
                        {persons.map((person) => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="relative mb-12" data-te-input-wrapper-init>
                    <label htmlFor="deodorsIds" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Elige los deudores
                    </label>
                    <select
                        multiple
                        id="deodorsIds"
                        name="deodorsIds"
                        required
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:border-gray-200 peer">
                        {persons.map((person) => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="relative mb-12" data-te-input-wrapper-init>
                    <label
                        htmlFor="description"
                        className="absolute left-3 -top-3 px-1 bg-white text-gray-500 text-xs font-medium dark:bg-gray-700 dark:text-neutral-200"
                    >
                        Descripción
                    </label>
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-b-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="description"
                        name="description"
                        aria-describedby="description"
                        placeholder="Introduce la descripcion"
                        required
                    />
                </div>
                <div className="relative mb-12" data-te-input-wrapper-init>
                    <label
                        htmlFor="amount"
                        className="absolute left-3 -top-3 px-1 bg-white text-gray-500 text-xs font-medium dark:bg-gray-700 dark:text-neutral-200"
                    >
                        Deuda
                    </label>
                    <input
                        type="number"
                        min={0}
                        className="peer block min-h-[auto] w-full rounded border-b-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="amount"
                        name="amount"
                        aria-describedby="amount"
                        required
                        placeholder="Introduce la cantidad pagada" />
                </div>

                <button
                    type="submit"
                    className="inline-block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary dark:hover:bg-primary-600 dark:focus:ring-primary-500"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    Añadir Deuda
                </button>
            </form>
        </div>
    )
}