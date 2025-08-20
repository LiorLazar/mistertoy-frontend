import { useEffect } from "react";
import { useSelector } from "react-redux"
import { loadToys, setFilterBy } from "../services/store/actions/toy.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { ToyFilter } from "../cmps/ToyFilter.jsx";

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading ? <div>List</div> : <div>Loading...</div>}
            </main>
        </div>
    )
}