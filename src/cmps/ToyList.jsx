import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy, user }) {
    // Safety check to ensure toys is an array
    if (!toys || !Array.isArray(toys)) {
        return <div>No toys available</div>
    }

    const elLis = toys.map(toy => (
        <li key={toy._id}>
            <ToyPreview toy={toy} />
            <div className="flex justify-center">
                {user && user.isAdmin && (
                    <button>
                        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                    </button>
                )}
                <button>
                    <Link to={`/toy/${toy._id}`}>Details</Link>
                </button>
                {user && user.isAdmin && (
                    <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                )}
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