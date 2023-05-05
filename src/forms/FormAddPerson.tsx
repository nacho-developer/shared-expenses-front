import { FormEvent } from "react"
import { PersonRequest } from "../pojo/Person"
import { addPerson } from "../services/PersonService"

export function FormAddPerson() {

  const handleSubmitAddPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('personName')
    const person: PersonRequest = {
      name
    };
    addPerson(person)
    form.reset()
  }

  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-700">
      <form onSubmit={handleSubmitAddPerson}>
        <div className="relative mb-4" data-te-input-wrapper-init>
          <label
            htmlFor="personName"
            className="absolute left-3 -top-3 px-1 bg-white text-gray-500 text-xs font-medium dark:bg-gray-700 dark:text-neutral-200"
          >
            Nombre
          </label>
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-b-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="personName"
            name="personName"
            aria-describedby="personName"
            placeholder="Introduce el nombre"
            required
          />
        </div>

        <button
          type="submit"
          className="inline-block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary dark:hover:bg-primary-600 dark:focus:ring-primary-500"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Añadir Amigo
        </button>
      </form>
    </div>

  )
}