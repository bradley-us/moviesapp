import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Form from "../components/Form"

const New = () => {

  const formData = {
    title: '',
    plot: ''
  }

  return (
    <div className='container'>
      <h1 className="my-3">Agregar movie</h1>
      <Form formData={formData} forNewMovie />
    </div>
  )
}

export default New