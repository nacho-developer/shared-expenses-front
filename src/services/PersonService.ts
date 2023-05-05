import { PersonRequest, PersonResponse } from "../pojo/Person"

const URL_PERSONS = 'https://shared-expense-back.netlify.app/api/v1/persons'

async function getPersons(): Promise<PersonResponse[]> {
    const response = await fetch(URL_PERSONS, {
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

async function addPerson(person: PersonRequest): Promise<void> {
    const response = await fetch(URL_PERSONS, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Acess-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(person)
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
}

export { getPersons, addPerson }