import Form from "../../components/Form"
import useSWR from "swr"
import { useRouter } from "next/router"

const fetcher = (url: any) => (
  fetch(url)
    .then(res => res.json())
    .then(json => json.data)
)

const edit = () => {

  const router = useRouter()

  const { id } = router.query

  console.log(id)

  const { data: movie, error } = useSWR(id ? `/api/movie/${id}` : null, fetcher)

  if (error) {
    return <div>Error</div>
  }

  if (!movie) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading...</h2>
      </div>
    )
  }

  const formData = {
    title: movie.title,
    plot: movie.plot
  }

  return (
    <div className="container">
      <h1>Edit movie</h1>
      <Form forNewMovie={false} formData={formData} />
    </div>
  )
}

export default edit