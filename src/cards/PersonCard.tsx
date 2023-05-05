import { PersonResponse } from "../pojo/Person"

export function PersonCard(person: { person: PersonResponse }) {
    return (
        <div
            className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5
                className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                ID: {person.person.id} -
                Nombre: {person.person.name}
            </h5>
        </div>
    )
}