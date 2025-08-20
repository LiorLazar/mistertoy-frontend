import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issue in toy details', err)
                // navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    const createdAtStr = new Date(toy.createdAt).toDateString()
    return (
        <section className="toy-details flex flex-column align-center">
            <h1>Toy Name: {toy.name}</h1>
            <img src={toy.imgUrl} alt='logo' />
            <p>Price: {toy.price}</p>
            <p>labels: {toy.labels.join(', ')}</p>
            <p>Created At: <span>{createdAtStr}</span></p>
            <p>Stock Satus: <span style={{ color: toy.isStock ? 'green' : 'red' }}>{toy.isStock ? 'In Stock' : 'No In Stock'}</span></p>
        </section >
    )
}