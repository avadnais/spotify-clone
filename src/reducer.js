export const initialState = {
    user: null,
    playlists: [],
    discover_weekly: null,
    token: null,
    spotify: null,
    loading: true,
    index: null,
    volume: null,
    menu_open: true
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
        case 'SET_SELECTED_TRACK':
            return {
                ...state,
                track: action.track
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
        case 'SET_PLAY_CONTEXT':
            return {
                ...state,
                play_context: action.play_context
            }
        case 'SET_INDEX':
            return {
                ...state,
                index: action.index
            }
        case 'SET_SHUFFLE_STATE':
            return {
                ...state,
                shuffle: action.shuffle
            }
        case 'SET_REPEAT_STATE':
            return {
                ...state,
                repeat: action.repeat
            }
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                search_results: action.search_results
            }
        case 'TOGGLE_MENU':
            return {
                ...state,
                menu_open: !state.menu_open
            }
        default: 
            return state;
    }

}

export default reducer;