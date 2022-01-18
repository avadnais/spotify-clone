export const initialState = {
    user: null,
    playlists: [],
    discover_weekly: null,
    // set to null after finished developing
    //token: 'BQARbFSgF5T-dwPUIuD0F6aSWA2S5wNX5LH99RpGdJWk4Y4zh0JvjlFN2moeh-zQKtNqQNTjmGqDMv1xAiIW4nA8sXkDQGOSds9mFIuzFnaTX413w5wi36DC2mdoroJqg0n6apXKWp9a76dxbvYh7x_pDnMuFG4tsg'
    token: null,
    spotify: null
}

// LISTENER
const reducer = (state, action) => {
    console.log(action);

    //Action -> type, [payload]

    switch(action.type) {
        case 'SET_USER': 
            return {
                ...state, 
                user: action.user,
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            }
        case 'SET_SELECTED_PLAYLIST':
            return {
                ...state,
                selected_playlist: action.selected_playlist
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
        case 'SET_ITEM':
            return {
                ...state,
                item: action.item
            }
        case 'SET_ID':
            return {
                ...state,
                id: action.id
            }
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing,
            }
        case 'SET_VOLUME':
            return {
                ...state,
                volume: action.volume
            }
        case 'SET_DEVICE_ID':
            return {
                ...state,
                device_id: action.device_id
            }
        default: 
            return state;
    }

}

export default reducer;