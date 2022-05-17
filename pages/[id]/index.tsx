import Link from "next/link"
import { useRouter } from "next/router"
import connectDB from "../../lib/dbConnect"
import Movie from "../../models/Movie"

const MoviePage = ({ success, error, movie }: any) => {

  const router = useRouter()

  console.log(success)
  console.log(error)
  console.log(movie)

  if(!success) {
    return (
      <>
        <div className='container w-full my-5 text-center'>
          <h1>{ error }</h1>
          <Link href={'/'}>
            <a className='btn btn-success'>Inicio</a>
          </Link>
        </div>
      </>
    )
  }

  const deleteData = async (id: any) => {
    try {
      await fetch(`/api/movie/${id}`,
      {
        method: 'DELETE'
      })
      router.push('/')
    } catch (error) {
      
    }
  }

  return (
    <div>
      <h1>Detalle de Movie</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{ movie.title }</h5>
          </div>
          <p className="fw-light">{ movie.plot }</p>
          <Link href={'/'}><a className="m-2 btn btn-success me-2">Come back</a></Link>
          <Link href={ `${ movie._id }/edit` }><a className="m-2 btn btn-warning me-2">Editar</a></Link>
          <button className="btn btn-danger btn-sm" onClick={() => deleteData(movie._id)}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }: any) {
  try {
    await connectDB()

    const movie = await Movie.findById(params.id).lean()

    if (!movie) {
      return { props: { success: false, error: 'Movie not found' } }
    }

    console.log(movie)
    movie._id = `${movie._id}`
    return { props: { success: true, movie } }
  } catch (error) {
    return { props: { success: false, error: 'ID NO Valid' } }
  }
}

export default MoviePage