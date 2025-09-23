import { userService } from '../../user.service.js'

export const SET_USER = 'SET_USER'

const initialState = {
    loggedInUser: userService.getLoggedInUser(),
}

console.log('🔍 USER REDUCER - Initial state:', initialState)

export function userReducer(state = initialState, action = {}) {
    console.log('🔍 USER REDUCER - Action:', action.type, action)
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user,
            }

        default:
            return state
    }
}
