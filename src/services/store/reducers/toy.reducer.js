import { toyService } from "../../toy.service.js"

export const SET_TOYS = 'SET_TOYS'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}