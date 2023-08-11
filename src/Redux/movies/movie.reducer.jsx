import { CREATE_MOVIES_ERROR, CREATE_MOVIES_LOADING, CREATE_MOVIES_SUCCESS, DELETE_MOVIES_ERROR, DELETE_MOVIES_LOADING, DELETE_MOVIES_SUCCESS, GET_MOVIES_ERROR, GET_MOVIES_LOADING, GET_MOVIES_SUCCESS, UPDATE_MOVIES_ERROR, UPDATE_MOVIES_LOADING, UPDATE_MOVIES_SUCCESS } from "./movie.types"

let initialState = {
    loading: false,
    error: false,
    data: []
}

export const movieReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {
        case GET_MOVIES_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_MOVIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                data: payload
            }
        }
        case GET_MOVIES_ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case CREATE_MOVIES_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case CREATE_MOVIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                data:payload
            }
        }
        case CREATE_MOVIES_ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case UPDATE_MOVIES_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case UPDATE_MOVIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                data:payload
            }
        }
        case UPDATE_MOVIES_ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case DELETE_MOVIES_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case DELETE_MOVIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                data:payload
            }
        }
        case DELETE_MOVIES_ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        default: {
            return state
        }
    }
}