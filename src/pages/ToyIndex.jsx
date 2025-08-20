import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadToys } from "../services/store/actions/toy.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";

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

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                {!isLoading ? <div>filter</div> : <div>Loading...</div>}
            </main>
        </div>
    )
}