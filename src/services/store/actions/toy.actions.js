import { toyService } from "../../toy.service"
import { REMOVE_TOY, SET_IS_LOADING, SET_TOYS } from "../reducers/toy.reducer"
import { store } from "../store"

export function loadToys() {
    const { filterBy, sortBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.query(filterBy, sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            setTimeout(() => {
                store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            }, 350)
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}