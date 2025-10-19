
export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>🧸</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Stock Status: <span style={{ color: toy.isStock ? 'green' : 'red' }}>{toy.isStock ? 'In Stock' : 'Not In Stock'}</span></p>
        </article>
    )
}