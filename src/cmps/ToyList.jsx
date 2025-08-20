
export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list flrx">
            {toys.map(toy =>
                <li className="toy-preview flex flex-column" key={toy._id}>
                    toyPreview
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </li>)}
        </ul>
    )
}