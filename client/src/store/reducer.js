
const initialState = {
    reps: []
    
}

const reducer = (state = initialState, action) => {
    
    if(action.type === 'FETCH_REPS') {
        return {
            ...state,
            reps: action.payload
        }
    }
    
    return state
}

export default reducer;

