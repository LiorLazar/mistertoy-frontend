import { Link } from 'react-router-dom'
import { ToyImg } from './ToyImg'

export function ToyPreview({ toy }) {
  return (
    <Link to={`/toy/${toy._id}`}>
      <article className="toy-preview flex flex-column align-center">
        <h1 className="toy-name">{toy.name}</h1>
        <ToyImg toyName={toy.name} />
        <h1>Price: ${toy.price}</h1>
        <h1 className={toy.inStock ? 'green' : 'red'}>
          {toy.inStock ? 'In stock' : 'Not in stock'}
        </h1>
      </article>
    </Link>
  )
}
