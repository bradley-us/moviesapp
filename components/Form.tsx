import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const Form = ({ formData, forNewMovie }: any) => {

  const router = useRouter()

  const [form, setForm] = useState({
    title: formData.title,
    plot: formData.plot
  })

  const [message, setMessage] = useState<any>([])

  const handleChange = (e: any) => {
    const {value, name} = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (forNewMovie) {
      postData(form)
    } else {
      // Editar data
      putData(form)
      console.log('You clicked me on edit button')
    }
  }

  const putData = async (form: any) => {
    setMessage([])
    const { id } = router.query

    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      console.log(data)

      if (!data.success) {
        for (const key in data.error.errors) {
            let error = data.error.errors[key]
            setMessage((oldMessage: any) => [
              ...oldMessage,
              { message: error.message }
            ])
        }
      } else {
        setMessage([])
        router.push('/')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const postData = async (form: any) => {
    try {
      console.log(form)
      const res = await fetch('/api/movie', {
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      console.log(data)

      if (!data.success) {
        for (const key in data.error.errors) {
            let error = data.error.errors[key]
            setMessage((oldMessage: any) => [
              ...oldMessage,
              { message: error.message }
            ])
        }
      } else {
        setMessage([])
        router.push('/')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" className="my-2 form-control" placeholder="Title" autoComplete="off" value={form.title} onChange={handleChange} name='title' />
        <input type="text" className="my-2 form-control" placeholder="Plot" autoComplete="off" value={form.plot} onChange={handleChange} name='plot' />
        <button className="btn btn-primary w-100" type="submit">
          { forNewMovie ? 'Agregar' : 'Editar'}
        </button>
        <Link href={'/'}>
          <a className="my-2 btn btn-warning w-100">Volver ...</a>
        </Link>
        {
          message.map(({ message }: any) => (
            <p key={ message }>{ message }</p>
          ))
        }
      </form>
  )
}

export default Form