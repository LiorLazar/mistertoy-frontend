import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
    const elLis = toys.map(toy => (
        <li key={toy._id}>
            <ToyPreview toy={toy} />
            <div className="flex justify-center">
                <button>
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                </button>
                <button>
                    <Link to={`/toy/${toy._id}`}>Details</Link>
                </button>
                <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
            </div>
        </li>
    ))
    return (
        <section className="toyList container">
            <ul className="toy-list flex justify-center">
                {elLis}
            </ul>
        </section>
    )
}