import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, removeToy, setFilter, setSort } from "../services/store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToyList } from "../cmps/ToyList"
import { Link } from "react-router-dom"
import { ToySort } from "../cmps/ToySort"
import { Loader } from "../cmps/Loader"
import { PopUp } from "../cmps/PopUp"

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)
    const toyLabels = useSelector(storeState => storeState.toyModule.toyLabels)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy Removed'))
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    function onSetSort(sortBy) {
        setSort(sortBy)
    }

    return (
        <section className="toy-index">
            <section className="toy-filter-sort container">
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                    toyLabels={toyLabels}
                />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>

            <div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
                <button style={{ marginInline: 0 }}>
                    <Link to="/toy/edit">Add Toy</Link>
                </button>
            </div>

            {isLoading && <Loader />}
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
            <PopUp isOpen={filterBy.txt === 'xxx'}>
                <>
                    <h1>Hello!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita cupiditate facilis quibusdam consectetur eius quis, suscipit veniam quam. Impedit veritatis eius ea sunt excepturi quia eveniet dolorum, culpa placeat natus.</p>
                </>
            </PopUp>
        </section>
    )
}