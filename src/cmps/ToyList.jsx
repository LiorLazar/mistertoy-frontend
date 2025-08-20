import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list flex">
            {toys.map(toy =>
                <li className="toy-preview flex flex-column" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                    </div>
                </li>)}
        </ul>
    )
}