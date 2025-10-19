import { toyService } from '../../toy.service.js'
import {
    ADD_TOY,
    REMOVE_TOY,
    SET_FILTER_BY,
    SET_IS_LOADING,
    SET_SORT_BY,
    SET_TOY_LABELS,
    SET_TOYS,
    TOY_UNDO,
    UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export async function loadToys() {
    const { filterBy } = store.getState().toyModule

    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const toysData = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toysData })
    } catch (error) {
        console.log('toy action -> Cannot load toys')
        throw error
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        }, 350)
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (error) {
        console.log('toy action -> Cannot remove toy', error)
        throw error
    }
}

export async function removeToyOptimistic(toyId) {
    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        await toyService.remove(toyId)
    } catch (error) {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', error)
        throw error
    }
}

export async function saveToy(toy) {
    try {
        const type = toy._id ? UPDATE_TOY : ADD_TOY
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (error) {
        console.log('toy action -> Cannot save toy', error)
        throw error
    }
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}

export async function loadToyLabels() {
    try {
        const labels = await toyService.getToyLabels()
        store.dispatch({ type: SET_TOY_LABELS, labels })
        return labels
    } catch (error) {
        console.log('toy action -> Cannot load toy labels', error)
        throw error
    }
}
