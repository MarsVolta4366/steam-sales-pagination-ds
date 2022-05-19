import axios from "axios"
import { useReducer, useEffect } from "react"

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error",
    NEXT_PAGE: "next-page"
}

const BASE_URL = "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=5"

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, games: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, games: action.payload.games }
        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                games: []
            }
        case ACTIONS.NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }
        default:
            return state
    }
}

const useFetchGamesAsync = (params, page) => {

    const [state, dispatch] = useReducer(reducer, { games: [], loading: true })

    useEffect(() => {

        const cancelToken1 = axios.CancelToken.source()
        const cancelToken2 = axios.CancelToken.source()

        const fetchData = async () => {
            try {
                dispatch({ type: ACTIONS.MAKE_REQUEST })
                const response = await axios.get(BASE_URL, {
                    cancelToken: cancelToken1.token,
                    params: { pageNumber: page, ...params },
                })
                dispatch({ type: ACTIONS.GET_DATA, payload: { games: response.data } })
            } catch (err) {
                if (axios.isCancel(err)) return
                dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
            }

            try {
                const response = await axios.get(BASE_URL, {
                    cancelToken: cancelToken2.token,
                    params: { pageNumber: page + 1, ...params },
                })
                dispatch({
                    type: ACTIONS.NEXT_PAGE,
                    payload: { hasNextPage: response.data.length !== 0 },
                })
            } catch (err) {
                if (axios.isCancel(err)) return
                dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
            }
        }
        fetchData()

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])

    return state
}

export default useFetchGamesAsync